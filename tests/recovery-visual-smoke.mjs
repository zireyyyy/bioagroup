// Recovery visual smoke — real Chrome load-integrity check of a local dist against the approved Preview.
// Detects the owner-reported HARD FAIL class: missing main stylesheet, header nav rendered as bullets,
// broken (visible) images, same-origin 4xx/failed requests, new console errors, horizontal overflow.
// Every image is forced to load eagerly so below-the-fold assets are checked too. Read-only: all
// non-GET requests and external navigations are aborted; no form is submitted.
// Env: SMOKE_DIST (default dist), SMOKE_REF (approved Preview base, default abdd7602), SMOKE_ROUTES (csv),
//      SMOKE_WIDTHS (csv; 1152 runs as 1440 @ zoom 125%), BIOA_CHROME_PATH, BIOA_REPORTS, SMOKE_SHOTS=1.
import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { createDistServer } from "../tools/serve-dist.mjs";

const REF = process.env.SMOKE_REF || "https://abdd7602.bioagroup.pages.dev";
const BLOG = "/blog/gia-cong-kem-tri-tham-nhu-hoa-giai-phap-lam-hong-vung-nhay-cam-chuyen-sau/";
const FAMILIES = ["/", "/about/", "/contract-manufacturing-cosmetics/", "/dich-vu-khac/", "/blog/", "/blog/page/2/", BLOG,
  "/contacts/", "/careers/", "/privacy-policy/", "/cookie-policy/", "/khong-co-trang-nay/"];
const routes = (process.env.SMOKE_ROUTES ? process.env.SMOKE_ROUTES.split(",") : FAMILIES).flatMap(r => [r, "/en" + r]);
const widths = (process.env.SMOKE_WIDTHS || "375,390,768,769,834,1024,1152,1200,1201,1440,1920").split(",").map(Number);
const out = process.env.BIOA_REPORTS || "recovery-reports";
await mkdir(join(out, "shots"), { recursive: true });

const server = createDistServer(process.env.SMOKE_DIST || "dist");
await new Promise(r => server.listen(0, "127.0.0.1", r));
const LOCAL = "http://127.0.0.1:" + server.address().port;
const launch = { headless: true };
if (process.env.BIOA_CHROME_PATH) launch.executablePath = process.env.BIOA_CHROME_PATH;
const browser = await chromium.launch(launch);
// Third-party trackers/challenges are blocked on both sides (no external writes, deterministic).
const BLOCK = /challenges\.cloudflare\.com|googletagmanager|google-analytics|mc\.yandex|dashly|hs_reader_ping|wa\.me|zalo\.me/i;

async function probe(base, route, width){
  const zoom = width === 1152;
  const ctx = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: zoom ? 1.25 : 1 });
  const page = await ctx.newPage();
  const failed = [], errors = [];
  const origin = new URL(base).origin;
  page.on("pageerror", e => errors.push(String(e.message || e).slice(0, 140)));
  page.on("requestfailed", q => { const t = q.failure()?.errorText || ""; if (!/ERR_ABORTED|ERR_FAILED/.test(t) || q.url().startsWith(origin)) failed.push((q.url().startsWith(origin) ? "SAME " : "EXT ") + q.url().replace(origin, "").slice(0, 140) + " :: " + t); });
  page.on("response", r => { if (r.status() >= 400 && r.request().resourceType() !== "document") failed.push((r.url().startsWith(origin) ? "SAME " : "EXT ") + r.status() + " " + r.url().replace(origin, "").slice(0, 140)); });
  await page.route("**/*", r => {
    const q = r.request();
    if (q.method() !== "GET" || BLOCK.test(q.url()) || (q.isNavigationRequest() && !q.url().startsWith(origin))) return r.abort();
    return r.fallback();
  });
  let status = 0;
  try{ status = (await page.goto(base + route, { waitUntil: "load", timeout: 60000 }))?.status() || 0; }catch(e){ errors.push("goto " + String(e).slice(0, 100)); }
  await page.evaluate(() => document.querySelectorAll("img[loading=lazy]").forEach(i => { i.loading = "eager"; })).catch(() => {});
  await page.waitForLoadState("networkidle", { timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(600);
  const d = await page.evaluate(() => {
    const vis = e => { const r = e.getBoundingClientRect(), c = getComputedStyle(e); return r.width > 0 && r.height > 0 && c.display !== "none" && c.visibility !== "hidden" && +c.opacity !== 0; };
    // rules: count for same-origin sheets, -1 = loaded cross-origin (unreadable), 0 = link present but not applied.
    const rules = s => { if (!s) return 0; try { return s.cssRules.length; } catch { return -1; } };
    const sheets = [...document.styleSheets];
    const main = [...document.querySelectorAll('link[rel="stylesheet"]')].filter(l => /main\.css/.test(l.href)).map(l => rules(l.sheet));
    const header = document.querySelector("header, .header");
    const bullets = header ? [...header.querySelectorAll("li")].filter(li => vis(li) && getComputedStyle(li).display === "list-item" && getComputedStyle(li).listStyleType !== "none").length : -1;
    const navLinks = header ? [...header.querySelectorAll("a")].filter(vis).map(a => a.textContent.trim().replace(/\s+/g, " ")).filter(Boolean) : [];
    const broken = [...document.images].filter(i => vis(i) && i.complete && i.naturalWidth === 0 && (i.currentSrc || i.src)).map(i => (i.currentSrc || i.src).replace(location.origin, ""));
    return { title: document.title, main, sheets: sheets.length, bullets, navLinks, broken: [...new Set(broken)],
      overflow: document.documentElement.scrollWidth - innerWidth, headerH: header ? Math.round(header.getBoundingClientRect().height) : -1 };
  }).catch(e => ({ evalError: String(e).slice(0, 100) }));
  let shot = null;
  if (process.env.SMOKE_SHOTS === "1" && base === LOCAL){ shot = join(out, "shots", (route.replace(/\//g, "_") || "_") + "-" + width + ".png"); await page.screenshot({ path: shot }).catch(() => {}); }
  await ctx.close();
  return { status, failed: [...new Set(failed)], errors: [...new Set(errors)], shot, ...d };
}

const rows = [], fails = [];
const norm = s => s.replace(/\?.*$/, "").replace(/ :: .*$/, "");
for (const route of routes) for (const width of widths){
  const a = await probe(LOCAL, route, width), b = await probe(REF, route, width);
  const f = [];
  const want404 = /khong-co-trang-nay/.test(route);
  if (a.status !== (want404 ? 404 : 200)) f.push("status " + a.status);
  if (!a.main?.length || a.main.some(n => n === 0)) f.push("main stylesheet missing/empty " + JSON.stringify(a.main));
  if (a.bullets > 0) f.push("header shows " + a.bullets + " bullet list items");
  if (a.bullets < 0) f.push("no header");
  const brokenNew = (a.broken || []).filter(x => !(b.broken || []).some(y => norm(y) === norm(x)));
  if (brokenNew.length) f.push("broken images: " + brokenNew.join(", "));
  // /cdn-cgi/ is served only by the Cloudflare edge (email obfuscation); it cannot exist in a local dist.
  const sameNew = a.failed.filter(x => x.startsWith("SAME ") && !/\/cdn-cgi\//.test(x)).filter(x => !b.failed.some(y => norm(y.replace(/^SAME \d* ?/, "")) === norm(x.replace(/^SAME \d* ?/, ""))));
  if (sameNew.length) f.push("same-origin failures: " + sameNew.join(" | "));
  const extNew = a.failed.filter(x => x.startsWith("EXT ")).filter(x => !b.failed.some(y => norm(y) === norm(x)));
  if (extNew.length) f.push("external failures not on reference: " + extNew.join(" | "));
  if (JSON.stringify(a.navLinks) !== JSON.stringify(b.navLinks)) f.push("header links differ: local " + a.navLinks.length + " vs ref " + (b.navLinks || []).length);
  if (a.overflow > 1 && !(b.overflow > 1)) f.push("horizontal overflow " + a.overflow + "px");
  const errNew = a.errors.filter(e => !b.errors.includes(e));
  if (errNew.length) f.push("new page errors: " + errNew.join(" | "));
  rows.push({ route, width, local: a, ref: { status: b.status, broken: b.broken, failed: b.failed, navLinks: (b.navLinks || []).length, errors: b.errors }, fail: f });
  console.log((f.length ? "FAIL " : "PASS ") + route + " @" + width + (f.length ? " :: " + f.join(" ; ").slice(0, 600) : ""));
  if (f.length) fails.push(route + "@" + width);
}
await writeFile(join(out, "recovery-visual-smoke.json"), JSON.stringify(rows, null, 1));
await browser.close(); server.close();
console.log(`Recovery visual smoke: ${rows.length - fails.length}/${rows.length} PASS vs ${REF}`);
if (fails.length) process.exit(1);
