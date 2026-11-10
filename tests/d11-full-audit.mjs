// D11 full audit — every one of the 52 link targets that returned 404 on the approved Preview/Production:
// 30 legacy slugs (bioa-legacy-redirects.mjs) must land on their same-meaning page with HTTP 200;
// the other remaining targets (tests/p3-known-dead-links.json) are reported with their real status and where they
// are linked from (visible or hidden). Read-only. Writes BIOA_REPORTS/d11-full-audit.json.
import { chromium } from "playwright";
import { readFileSync, mkdirSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { load } from "cheerio";
import { createDistServer } from "../tools/serve-dist.mjs";
import { legacyRedirectFiles } from "../bioa-legacy-redirects.mjs";

const redirects = legacyRedirectFiles([]);
const remaining = JSON.parse(readFileSync(new URL("./p3-known-dead-links.json", import.meta.url), "utf8")).targets;
const all = [...redirects.map(r => r.route), ...remaining];

// Where each target is linked from in the built pages (static scan; visibility decided in the browser).
const sources = {};
(function walk(d){ for (const f of readdirSync(d)){ const p = join(d, f); if (statSync(p).isDirectory()){ if (f !== "assets") walk(p); } else if (f === "index.html"){
  const route = "/" + relative("dist", d).split(sep).join("/") + (d === "dist" ? "" : "/");
  const $ = load(readFileSync(p, "utf8"));
  if ($('meta[name="bioa-legacy-redirect"]').length) continue;
  $("a[href]").each((_, a) => { const h = ($(a).attr("href") || "").split(/[?#]/)[0]; if (all.includes(h)) (sources[h] ||= new Set()).add(route.replace(/^\/\/$/, "/")); }); } } })("dist");

const server = createDistServer("dist");
await new Promise(r => server.listen(0, "127.0.0.1", r));
const base = "http://127.0.0.1:" + server.address().port;
const launch = { headless: true };
if (process.env.BIOA_CHROME_PATH) launch.executablePath = process.env.BIOA_CHROME_PATH;
const browser = await chromium.launch(launch);
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.route("**/*", r => r.request().method() !== "GET" || !r.request().url().startsWith(base) ? r.abort() : r.fallback());

const rows = [], fails = [];
for (const target of all){
  const red = redirects.find(r => r.route === target);
  const res = await page.goto(base + target + "#x", { waitUntil: "load" }).catch(() => null);
  if (red) await page.waitForURL(u => new URL(u).pathname === red.target, { timeout: 10000 }).catch(() => {});
  const landed = new URL(page.url());
  const finalStatus = (await page.evaluate(() => performance.getEntriesByType("navigation")[0]?.responseStatus || 0).catch(() => 0)) || res?.status() || 0;
  const row = { target, kind: red ? "redirect" : "remaining", firstStatus: res?.status() || 0, landed: landed.pathname, hashKept: landed.hash === "#x", finalStatus, title: await page.title(), linkedFrom: [...(sources[target] || [])].length };
  if (red && (row.landed !== red.target || row.finalStatus !== 200)) fails.push(target + " should land on " + red.target + " 200, got " + row.landed + " " + row.finalStatus);
  rows.push(row);
}
// Visibility of the remaining targets on representative pages (VI/EN, 1440/834/390).
const visible = {};
for (const route of ["/", "/en/", "/careers/", "/en/careers/", "/about/", "/contract-manufacturing-cosmetics/"]) for (const width of [1440, 834, 390]){
  await page.setViewportSize({ width, height: 900 });
  await page.goto(base + route, { waitUntil: "load" });
  await page.waitForTimeout(300);
  const v = await page.evaluate(list => [...document.querySelectorAll("a[href]")].filter(a => {
    let x = a; while (x){ const c = getComputedStyle(x); if (c.display === "none" || c.visibility === "hidden" || +c.opacity === 0) return false; x = x.parentElement; }
    const r = a.getBoundingClientRect(); return r.width > 0 && r.height > 0 && list.includes(new URL(a.href).pathname); }).map(a => new URL(a.href).pathname + " | " + a.textContent.trim().replace(/\s+/g, " ").slice(0, 50)), remaining);
  for (const x of v) (visible[x] ||= new Set()).add(route + "@" + width);
}
await browser.close(); server.close();

const out = process.env.BIOA_REPORTS || "d11-reports";
mkdirSync(out, { recursive: true });
writeFileSync(join(out, "d11-full-audit.json"), JSON.stringify({ rows, visible: Object.fromEntries(Object.entries(visible).map(([k, v]) => [k, [...v]])) }, null, 1));
const red = rows.filter(r => r.kind === "redirect"), rem = rows.filter(r => r.kind === "remaining");
console.log(`Redirect targets: ${red.filter(r => r.finalStatus === 200).length}/${red.length} land on a 200 page (hash kept ${red.filter(r => r.hashKept).length}/${red.length})`);
console.log(`Remaining targets: ${rem.length}; HTTP 404: ${rem.filter(r => r.firstStatus === 404).length}; visible somewhere: ${Object.keys(visible).length} link label(s)`);
for (const [k, v] of Object.entries(visible)) console.log("  VISIBLE", k, "::", [...v].join(" "));
for (const r of rem) console.log("  REMAINING", r.target, r.firstStatus, "linked from", r.linkedFrom, "page(s)");
for (const f of fails) console.log("FAIL", f);
console.log(`D11 full audit: 52 targets -> ${red.length} redirected OK, ${rem.length} still dead`);
if (fails.length || all.length !== 52) process.exit(1);
