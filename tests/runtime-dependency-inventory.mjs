// P0B2 runtime dependency inventory (read-only). For every route family × VI/EN × 1440/390:
//  1. records every cross-origin request (host, type, status, duration) of a normal load;
//  2. re-loads with ALL merywood.com requests blocked and records what breaks (page errors,
//     Swiper/jQuery availability, broken visible images, header/main.css state);
//  3. re-loads with merywood.com answering only after 65 s (slow third party) to reproduce the
//     failure signature of the 12 route-smoke loads ("goto timeout" / "Swiper is not defined").
// Non-GET requests and external navigations are aborted. Writes BIOA_REPORTS/runtime-dependency-inventory.json.
import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createDistServer } from "../tools/serve-dist.mjs";

const BLOG = "/blog/gia-cong-kem-tri-tham-nhu-hoa-giai-phap-lam-hong-vung-nhay-cam-chuyen-sau/";
const FAMILIES = ["/", "/about/", "/contract-manufacturing-cosmetics/", "/dich-vu-khac/", "/blog/", BLOG, "/contacts/", "/careers/", "/privacy-policy/", "/cookie-policy/"];
const routes = FAMILIES.flatMap(r => [r, "/en" + r]);
const server = createDistServer("dist");
await new Promise(r => server.listen(0, "127.0.0.1", r));
const base = "http://127.0.0.1:" + server.address().port;
const launch = { headless: true };
if (process.env.BIOA_CHROME_PATH) launch.executablePath = process.env.BIOA_CHROME_PATH;
const browser = await chromium.launch(launch);
const TRACK = /challenges\.cloudflare\.com|googletagmanager|google-analytics|mc\.yandex|dashly/i;

async function load(route, width, mode){
  const ctx = await browser.newContext({ viewport: { width, height: 900 } });
  const page = await ctx.newPage();
  const ext = [], errors = [];
  const started = new Map();
  page.on("pageerror", e => errors.push(String(e.message || e).slice(0, 120)));
  page.on("request", q => started.set(q, Date.now()));
  // Some leftover WP URLs carry an invalid host ("https://bio-a%20group.com/..."): parse by regex, not URL().
  const done = (q, status) => { const raw = q.url(); if (raw.startsWith(base) || /^(data|blob):/.test(raw)) return;
    const m = raw.match(/^[a-z]+:\/\/([^/?#]+)([^?#]*)/i) || [null, raw, ""];
    ext.push({ host: decodeURIComponent(m[1]), path: m[2], type: q.resourceType(), status, ms: Date.now() - (started.get(q) || Date.now()) }); };
  page.on("requestfinished", async q => done(q, (await q.response().catch(() => null))?.status() || 0));
  page.on("requestfailed", q => done(q, "FAILED " + (q.failure()?.errorText || "")));
  await page.route("**/*", async r => {
    const q = r.request(), u = q.url();
    if (q.method() !== "GET" || TRACK.test(u) || (q.isNavigationRequest() && !u.startsWith(base))) return r.abort();
    if (/merywood\.com/.test(u) && mode === "blocked") return r.abort();
    if (/merywood\.com/.test(u) && mode === "slow"){ await new Promise(res => setTimeout(res, 65000)); return r.abort("timedout").catch(() => {}); }
    return r.fallback();
  });
  let gotoError = null;
  try{ await page.goto(base + route, { waitUntil: "load", timeout: 60000 }); }catch(e){ gotoError = String(e.message).split("\n")[0].slice(0, 100); }
  await page.waitForTimeout(1200);
  const state = await page.evaluate(() => {
    const vis = e => { let x = e; while (x){ const c = getComputedStyle(x); if (c.display === "none" || c.visibility === "hidden" || +c.opacity === 0) return false; x = x.parentElement; } const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0; };
    const main = document.querySelector('link[rel="stylesheet"][href*="main.css"]');
    return { jquery: typeof window.jQuery, swiper: typeof window.Swiper, swipersInit: [...document.querySelectorAll(".swiper")].filter(s => s.swiper).length, swipers: document.querySelectorAll(".swiper").length,
      mainRules: main?.sheet ? (() => { try { return main.sheet.cssRules.length; } catch { return -1; } })() : 0,
      brokenImgs: [...document.images].filter(i => vis(i) && i.complete && i.naturalWidth === 0).map(i => (i.currentSrc || i.src).replace(/^https?:\/\//, "").slice(0, 90)) };
  }).catch(e => ({ evalError: String(e).slice(0, 80) }));
  await ctx.close();
  return { gotoError, errors: [...new Set(errors)], ext, ...state };
}

const report = { normal: [], blocked: [], slow: [] };
for (const route of routes) for (const width of [1440, 390]){
  report.normal.push({ route, width, ...(await load(route, width, "normal")) });
  report.blocked.push({ route, width, ...(await load(route, width, "blocked")) });
  console.log("done", route, width);
}
for (const route of [BLOG, "/"]) report.slow.push({ route, width: 1440, ...(await load(route, 1440, "slow")) });
await browser.close(); server.close();

const out = process.env.BIOA_REPORTS || "runtime-reports";
mkdirSync(out, { recursive: true });
writeFileSync(join(out, "runtime-dependency-inventory.json"), JSON.stringify(report, null, 1));

// Summary
const agg = {};
for (const r of report.normal) for (const e of r.ext){
  const k = e.host + " " + e.type + " " + e.path.replace(/\/[^/]+\.(webp|png|jpe?g|svg|gif|avif)$/i, "/*.$1");
  const a = agg[k] ||= { n: 0, routes: new Set(), statuses: new Set(), maxMs: 0 };
  a.n++; a.routes.add(r.route); a.statuses.add(String(e.status)); a.maxMs = Math.max(a.maxMs, e.ms);
}
console.log("\n== cross-origin requests (normal load), grouped ==");
for (const [k, a] of Object.entries(agg).sort()) console.log(a.n.toString().padStart(4), "req", a.routes.size.toString().padStart(2), "routes", "status", [...a.statuses].join(","), "max", a.maxMs + "ms", "::", k);
console.log("\n== with merywood.com blocked ==");
for (const r of report.blocked){
  const n = report.normal.find(x => x.route === r.route && x.width === r.width);
  const newErr = r.errors.filter(e => !n.errors.includes(e));
  console.log(r.route, r.width, "jQuery", r.jquery, "Swiper", r.swiper, "swipers", r.swipersInit + "/" + r.swipers, "(normal " + n.swipersInit + "/" + n.swipers + ")", "mainRules", r.mainRules, "broken imgs", r.brokenImgs.length, "(normal " + n.brokenImgs.length + ")", newErr.length ? "NEW ERRORS: " + newErr.join(" | ") : "");
}
console.log("\n== merywood.com responding after 65 s ==");
for (const r of report.slow) console.log(r.route, "goto:", r.gotoError || "ok", "| errors:", r.errors.join(" | ") || "-", "| Swiper", r.swiper, "jQuery", r.jquery);
