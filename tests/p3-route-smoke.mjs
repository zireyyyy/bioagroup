// P3 — runtime smoke over every generated route at Desktop 1440 and Mobile 390 (VI/EN).
// Checks: HTTP 200 from the static dist, header + footer + one visible h1, no horizontal overflow,
// no page error that the approved reference does not also raise. Read-only; aborts every non-GET
// request and every external navigation. Usage: node tests/p3-route-smoke.mjs [distDir]
import { chromium } from "playwright";
import { createServer } from "node:http";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { readdirSync, statSync, readFileSync } from "node:fs";
import { resolve, sep, extname, join, relative } from "node:path";

const root = resolve(process.argv[2] || "dist");
const REF = process.env.BIOA_REFERENCE_URL || "https://abdd7602.bioagroup.pages.dev";
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".png": "image/png", ".webp": "image/webp", ".woff2": "font/woff2", ".jpg": "image/jpeg" };
const server = createServer(async (req, res) => {
  const p = decodeURIComponent(new URL(req.url, "http://l").pathname);
  const f = resolve(root, "." + (p.endsWith("/") ? p + "index.html" : p));
  if (!f.startsWith(root + sep)){ res.writeHead(403).end(); return; }
  let b; try { b = await readFile(f); } catch { res.writeHead(404).end(); return; }
  res.writeHead(200, { "content-type": types[extname(f)] || "application/octet-stream" }).end(b);
});
await new Promise(r => server.listen(0, "127.0.0.1", r));
const LOCAL = "http://127.0.0.1:" + server.address().port;

const routes = [];
const only = process.env.SMOKE_ROUTES ? new RegExp(process.env.SMOKE_ROUTES) : null;
(function walk(d){ for (const f of readdirSync(d)){ const p = join(d, f); if (statSync(p).isDirectory()){ if (f !== "assets") walk(p); } else if (f === "index.html" && !/bioa-legacy-redirect/.test(readFileSync(p, "utf8").slice(0, 600))){ const r = relative(root, d).split(sep).join("/"); routes.push(r ? "/" + r + "/" : "/"); } } })(root);

const launch = { headless: true, args: ["--no-sandbox"] };
if (process.env.BIOA_CHROME_PATH) launch.executablePath = process.env.BIOA_CHROME_PATH;
const browser = await chromium.launch(launch);
const NOISE = /challenges\.cloudflare\.com|googletagmanager|google-analytics|mc\.yandex|dashly|bio-a%20group/i;

async function probe(base, route, width){
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  const errors = [];
  // T2 (pre-existing on the approved Preview too, root cause in docs/OWNER_ISSUE_LEDGER.md): CF7 fetches its
  // feedback schema from the invalid host "Bio-A Group.com" and rejects with exactly this object. Its uncaught
  // rejection surfaces as pageerror "Object"; identify it by the rejection reason, never by the message alone.
  const T2 = '{"code":"fetch_error","message":"You are probably offline."}';
  await page.addInitScript(() => { window.__bioaRej = []; addEventListener("unhandledrejection", e => { try { window.__bioaRej.push(JSON.stringify(e.reason)); } catch { window.__bioaRej.push(String(e.reason)); } }); });
  page.on("pageerror", e => errors.push(String(e.message || e).slice(0, 120)));
  await page.route("**/*", r => {
    const q = r.request();
    if (q.method() !== "GET" || (q.isNavigationRequest() && !q.url().startsWith(base)) || NOISE.test(q.url())) return r.abort();
    return r.fallback();
  });
  let status = 0;
  try{ status = (await page.goto(base + route, { waitUntil: "load", timeout: 60000 }))?.status() || 0; }catch(e){ errors.push("goto " + String(e).slice(0, 80)); }
  await page.waitForTimeout(800);
  const d = await page.evaluate(() => {
    const vis = e => { if (!e) return false; const r = e.getBoundingClientRect(), c = getComputedStyle(e); return r.width > 0 && r.height > 0 && c.display !== "none" && c.visibility !== "hidden"; };
    return { header: vis(document.querySelector("header,.header")), footer: !!document.querySelector("footer,#footer,.footer"),
      h1: [...document.querySelectorAll("h1")].filter(vis).length, overflow: document.documentElement.scrollWidth - innerWidth };
  }).catch(() => ({}));
  const rej = await page.evaluate(() => window.__bioaRej || []).catch(() => []);
  await page.close();
  const t2 = rej.filter(r => r === T2).length;
  // Drop one "Object" pageerror per matching T2 rejection; anything else stays an error.
  let drop = t2; const rest = errors.filter(e => !(e === "Object" && drop > 0 && drop--));
  return { status, errors: [...new Set(rest)], knownT2: t2, ...d };
}

const fails = [], rows = [];
for (const route of routes.filter(r => !only || only.test(r))) for (const width of [1440, 390]){
  const a = await probe(LOCAL, route, width);
  const f = [];
  if (a.status !== 200) f.push("status " + a.status);
  if (!a.header) f.push("no visible header");
  if (!a.footer) f.push("no footer");
  if (!a.h1){
    // Blog index/pagination use an h2 title on the approved Preview too (owner decision D12): fail only on regressions.
    const b = await probe(REF, route, width);
    if (b.h1) f.push("no visible h1 (reference has one)"); else a.knownNoH1 = true;
  }
  if (a.overflow > 1) f.push("horizontal overflow " + a.overflow + "px");
  if (a.errors.length){
    const b = await probe(REF, route, width);
    const extra = a.errors.filter(e => !b.errors.includes(e));
    if (extra.length) f.push("new page errors: " + extra.join(" | "));
  }
  rows.push({ route, width, ...a, fail: f });
  if (f.length) fails.push(route + "@" + width + ": " + f.join("; "));
}
const out = process.env.BIOA_REPORTS || "p3-reports";
await mkdir(out, { recursive: true });
await writeFile(join(out, "p3-route-smoke.json"), JSON.stringify(rows, null, 2));
await browser.close(); server.close();
for (const f of fails) console.log("FAIL", f);
console.log(`P3 route smoke: ${rows.length - fails.length}/${rows.length} PASS (${routes.length} routes × 2 widths)`);
console.log(`known pre-existing T2 CF7 schema rejection (invalid host, same on approved Preview): ${rows.filter(r => r.knownT2).length}/${rows.length} loads`);
if (fails.length) process.exit(1);
