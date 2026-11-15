// R26 Final Integration Gate — browser E2E against a REAL deployed Preview (read-only, GET only).
//   node tests/r26-preview-e2e.mjs <baseUrl> <outDir> [--quick]
// Routes: every <loc> of the build's sitemap + noindex policy pages + legacy redirect stubs + 404 (VI/EN).
// Widths: 375 390 768 834 1024 1440 1920, plus "zoom 125%" profiles (1152 and 312 CSS px at DPR 1.25).
// Per load: HTTP status, page errors, console errors, failed requests, broken images, horizontal overflow.
// Expected and not counted as failures: Preview /api/* answers 503 (locked by design), third-party telemetry aborts,
// and on *.pages.dev hosts the Turnstile widget error 110200 (site key allowed for bioagroup.vn only; Preview forms
// are locked anyway). Each expected item is still counted in the summary.
// Flows (representative pages): mobile menu, quote modal open/close + ESC, cookie banner choice, slider next,
// language switch VI->EN counterpart, keyboard Tab focus reaches a visible link.
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const [base, out] = [process.argv[2]?.replace(/\/$/, ""), process.argv[3]];
const quick = process.argv.includes("--quick");
if (!base || !out){ console.error("usage: node tests/r26-preview-e2e.mjs <baseUrl> <outDir> [--quick]"); process.exit(2); }
fs.mkdirSync(out, { recursive: true });
const WIDTHS = quick ? [390, 834, 1440] : [375, 390, 768, 834, 1024, 1440, 1920];
const ZOOM = [{ w: 1152, h: 720, dpr: 1.25, label: "1440@125%" }, { w: 312, h: 640, dpr: 1.25, label: "390@125%" }];

async function getText(u){ const r = await fetch(u); return { status: r.status, text: await r.text() }; }
const sm = (await getText(base + "/sitemap.xml"));
let routes = [...sm.text.matchAll(/<loc>https:\/\/bioagroup\.vn([^<]+)<\/loc>/g)].map(m => m[1]);
if (!routes.length){
  // Preview sitemap is served by the static build; middleware does not lock it on preview hosts.
  console.error("no routes from sitemap", sm.status); process.exit(1);
}
routes.push("/privacy-policy/", "/en/privacy-policy/", "/cookie-policy/", "/en/cookie-policy/");
const STUBS = ["/lien-he/", "/nang-luc/", "/tuyen-dung-rd/", "/tuyen-dung-nv-sales/", "/chai-lo-my-pham/", "/en/lien-he/"];
const NOTFOUND = ["/bioa-r26-no-such-page/", "/en/bioa-r26-no-such-page/"];
routes = [...new Set(routes)];

const exe = process.env.BIOA_CHROME_PATH;
const browser = await chromium.launch(exe ? { executablePath: exe } : {});
const results = [];
const PREVIEW_HOST = /\.pages\.dev$/.test(new URL(base).hostname);
const expected = { turnstile: 0, sources: {} };
const allowedFail = u => /\/api\//.test(u) || /maps\.googleapis\.com\/maps_api_js_slo|google-analytics|doubleclick|\/cdn-cgi\//.test(u);

async function load(route, vp){
  const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h }, deviceScaleFactor: vp.dpr || 1, isMobile: vp.w < 768, hasTouch: vp.w < 768 });
  const page = await ctx.newPage();
  const errors = [], consoleErr = [], failed = [];
  page.on("pageerror", e => { const t = String(e.message).slice(0, 200); if (PREVIEW_HOST && /Turnstile\] Error: 110200/.test(t)) expected.turnstile++; else errors.push(t); });
  page.on("console", m => { if (m.type() !== "error") return; const t = m.text().slice(0, 200); if (PREVIEW_HOST && /Turnstile/.test(t)) { expected.turnstile++; return; } consoleErr.push(t); });
  page.on("requestfailed", r => { if (!allowedFail(r.url()) && !/ERR_ABORTED/.test(r.failure()?.errorText || "")) failed.push(r.url().slice(0, 160) + " " + r.failure()?.errorText); });
  const expectedResp = [];
  page.on("response", r => { if (r.status() < 400) return; if (allowedFail(r.url())) expectedResp.push(r.status() + " " + new URL(r.url()).host + new URL(r.url()).pathname.slice(0, 60)); else if (!r.url().endsWith(route)) failed.push(r.status() + " " + r.url().slice(0, 160)); });
  let status = 0, info = null;
  try{
    const resp = await page.goto(base + route, { waitUntil: "load", timeout: 60000 });
    status = resp?.status() || 0;
    await page.waitForTimeout(700);
    info = await page.evaluate(() => {
      const broken = [...document.images].filter(i => i.complete && i.naturalWidth === 0 && i.getBoundingClientRect().width > 1 && !i.closest("[hidden]")).map(i => i.currentSrc || i.src);
      // overflow = horizontal scroll the visitor can actually do (html has overflow-x:hidden); clipped = content cut at the right edge
      const docW = document.documentElement.scrollWidth;
      const clipped = [...document.querySelectorAll("footer a, main h1, main h2, main p, main a, header a")].filter(e => { const r = e.getBoundingClientRect(); return r.width > 0 && r.right > innerWidth + 2 && r.left < innerWidth && getComputedStyle(e).visibility !== "hidden" && !e.closest(".swiper"); }).map(e => (e.textContent || "").trim().slice(0, 24) + " +" + Math.round(e.getBoundingClientRect().right - innerWidth) + "px").slice(0, 3);
      return { title: document.title, lang: document.documentElement.lang, broken: broken.slice(0, 5), overflow: docW - innerWidth, clipped, final: location.pathname };
    });
  } catch (e){ errors.push("load: " + e.message.slice(0, 160)); }
  await ctx.close();
  // A generic "Failed to load resource: <code>" console line is explained only when a response with that code from an
  // expected source (locked /api on Preview, Turnstile challenge on *.pages.dev) was seen on the same page.
  const codes = new Set(expectedResp.map(x => x.split(" ")[0]));
  if (NOTFOUND.includes(route)) codes.add("404"); // the 404 page's own document status
  const consoleReal = consoleErr.filter(t => { const m = /Failed to load resource: the server responded with a status of (\d+)/.exec(t); if (m && codes.has(m[1])) { expected.explainedConsole = (expected.explainedConsole || 0) + 1; return false; } return !/\/api\//.test(t); });
  for (const e of expectedResp) expected.sources[e.replace(/^\d+ /, "").split("/").slice(0, 3).join("/")] = (expected.sources[e.replace(/^\d+ /, "").split("/").slice(0, 3).join("/")] || 0) + 1;
  return { route, vp: vp.label || String(vp.w), status, final: info?.final, errors, console: consoleReal, failed: failed.filter(f => !/ 503 .*\/api\//.test(f)), broken: info?.broken || [], overflow: info?.overflow ?? null, clipped: info?.clipped || [] };
}

async function pool(items, n, fn){ const outArr = []; let i = 0; await Promise.all(Array.from({ length: n }, async () => { while (i < items.length){ const k = i++; outArr[k] = await fn(items[k]); } })); return outArr; }
const jobs = [];
for (const r of routes) for (const w of WIDTHS) jobs.push([r, { w, h: w < 768 ? 812 : 900 }]);
const reps = ["/", "/en/", "/about/", "/contract-manufacturing-cosmetics/", "/dich-vu-khac/", "/contacts/", "/blog/", "/tuyen-dung/", "/en/careers/"];
for (const r of reps) for (const z of ZOOM) jobs.push([r, z]);
for (const r of STUBS) jobs.push([r, { w: 1440, h: 900 }]);
for (const r of NOTFOUND) jobs.push([r, { w: 390, h: 812 }], [r, { w: 1440, h: 900 }]);
const t0 = Date.now();
const loads = await pool(jobs, Number(process.env.E2E_CONCURRENCY || 3), ([r, vp]) => load(r, vp));
results.push(...loads);

// ---- flows ----
const flows = [];
async function flow(name, w, route, fn){
  const ctx = await browser.newContext({ viewport: { width: w, height: w < 768 ? 812 : 900 }, isMobile: w < 768, hasTouch: w < 768 });
  const page = await ctx.newPage();
  const errs = []; page.on("pageerror", e => { if (!(PREVIEW_HOST && /Turnstile\] Error: 110200/.test(e.message))) errs.push(e.message.slice(0, 160)); });
  let ok = false, note = "";
  try { await page.goto(base + route, { waitUntil: "load", timeout: 60000 }); await page.waitForTimeout(900); [ok, note] = await fn(page); }
  catch (e){ note = "error: " + e.message.slice(0, 200); }
  if (errs.length){ ok = false; note += " | pageerror: " + errs.join("; "); }
  flows.push({ name, w, route, ok, note });
  if (!ok) await page.screenshot({ path: path.join(out, `flow-fail-${name.replace(/\W+/g, "-")}-${w}.png`) }).catch(() => {});
  await ctx.close();
}
const vis = async (page, sel) => page.evaluate(s => { const e = [...document.querySelectorAll(s)].find(x => { const r = x.getBoundingClientRect(); const c = getComputedStyle(x); return r.width > 2 && r.height > 2 && c.visibility !== "hidden" && c.display !== "none" && Number(c.opacity) > 0.05; }); return !!e; }, sel);
for (const [route, lang] of [["/", "vi"], ["/en/", "en"]]){
  await flow(`cookie-banner-${lang}`, 390, route, async page => {
    if (!await vis(page, ".bioa-consent")) return [false, "consent banner not visible on first visit"];
    const btn = page.locator(".bioa-consent button").filter({ hasText: lang === "en" ? /reject|decline|refuse/i : /từ chối/i }).first();
    await btn.click(); await page.waitForTimeout(500);
    const hidden = !await vis(page, ".bioa-consent");
    await page.reload({ waitUntil: "load" }); await page.waitForTimeout(700);
    return [hidden && !await vis(page, ".bioa-consent"), hidden ? "choice stored, banner stays hidden after reload" : "banner still visible"];
  });
}
for (const w of [390, 834]) await flow("mobile-menu", w, "/", async page => {
  const toggle = page.locator("button.menu-burger, button.bioa-mobile-menu-button-clean, button.bioa-mobile-menu-button").filter({ visible: true }).first();
  if (!await toggle.count()) return [w >= 769, "no visible menu toggle at " + w];
  await page.evaluate(() => document.querySelectorAll(".bioa-consent").forEach(e => e.remove()));
  await toggle.click(); await page.waitForTimeout(800);
  const opened = await page.evaluate(() => [...document.querySelectorAll("nav a, .bioa-mobile-nav-drop a, .mobile-menu a")].filter(a => { const r = a.getBoundingClientRect(); return r.width > 1 && r.height > 1 && r.top < innerHeight; }).length);
  return [opened >= 3, `visible menu links after toggle: ${opened}`];
});
for (const w of [390, 1440]) await flow("quote-modal", w, "/", async page => {
  await page.evaluate(() => document.querySelectorAll(".bioa-consent").forEach(e => e.remove()));
  const cta = page.locator("[modal='get-a-quote']").filter({ visible: true }).first();
  if (!await cta.count()) return [false, "no visible quote CTA"];
  await cta.click(); await page.waitForTimeout(900);
  const open = await vis(page, "#get-a-quote form, #get-a-quote .cf-modal__button");
  await page.keyboard.press("Escape"); await page.waitForTimeout(700);
  const escClosed = !await vis(page, "#get-a-quote .cf-modal__button");
  if (!escClosed){ await page.locator("#get-a-quote .modal__close").filter({ visible: true }).first().click(); await page.waitForTimeout(800); }
  const closed = !await vis(page, "#get-a-quote .cf-modal__button");
  return [open && closed, `modal opened: ${open}; ESC closes: ${escClosed} (Merywood source behaviour); close button closes: ${closed}`];
});
for (const w of [390, 1440]) await flow("slider-next", w, "/", async page => {
  await page.evaluate(() => document.querySelectorAll(".bioa-consent").forEach(e => e.remove()));
  const r = await page.evaluate(async () => {
    const sw = [...document.querySelectorAll(".swiper")].map(e => e.swiper).filter(s => s && s.slides?.length > 1 && s.el.getBoundingClientRect().width > 50);
    if (!sw.length) return { n: 0 };
    const s = sw[0], before = s.activeIndex; s.slideNext(0); await new Promise(r => setTimeout(r, 200));
    return { n: sw.length, before, after: s.activeIndex };
  });
  return [r.n > 0 && r.after !== r.before, JSON.stringify(r)];
});
for (const [w, route, expect] of [[1440, "/about/", "/en/about/"], [390, "/tuyen-dung/nhan-vien-rd-my-pham/", "/en/careers/cosmetic-rd-specialist/"]]) await flow("language-switch", w, route, async page => {
  const hrefs = await page.evaluate(() => [...document.querySelectorAll("a[href]")].map(a => a.getAttribute("href")).filter(h => /^\/en\//.test(h) || /^https:\/\/bioagroup\.vn\/en\//.test(h)));
  return [hrefs.some(h => h.replace("https://bioagroup.vn", "") === expect), `EN switch target ${expect} present: ${hrefs.includes(expect)}`];
});
await flow("keyboard-tab", 1440, "/", async page => {
  await page.evaluate(() => document.querySelectorAll(".bioa-consent").forEach(e => e.remove()));
  let seen = [];
  for (let i = 0; i < 6; i++){ await page.keyboard.press("Tab"); seen.push(await page.evaluate(() => { const a = document.activeElement; const r = a?.getBoundingClientRect(); return a && a !== document.body && r && r.width > 0 ? a.tagName + ":" + (a.getAttribute("href") || a.textContent.trim().slice(0, 20)) : null; })); }
  const ok = seen.filter(Boolean).length >= 3;
  return [ok, "focused: " + seen.filter(Boolean).join(" | ")];
});
await browser.close();

// ---- summary ----
const bad = results.filter(r => {
  const notFound = NOTFOUND.includes(r.route), stub = STUBS.includes(r.route);
  const okStatus = notFound ? r.status === 404 : r.status === 200;
  const stubOk = !stub || (r.final && r.final !== r.route);
  return !okStatus || !stubOk || r.errors.length || r.console.length || r.failed.length || r.broken.length || (r.overflow ?? 0) > 1;
});
const summary = { base, expectedPreviewOnly: expected, routes: routes.length, stubs: STUBS.length, notFound: NOTFOUND.length, widths: WIDTHS, zoomProfiles: ZOOM.map(z => z.label), loads: results.length, failedLoads: bad.length, flows: flows.length, failedFlows: flows.filter(f => !f.ok).length, seconds: Math.round((Date.now() - t0) / 1000) };
fs.writeFileSync(path.join(out, "e2e-results.json"), JSON.stringify({ summary, bad, flows, results }, null, 1));
const lines = [JSON.stringify(summary), ...bad.slice(0, 60).map(r => `FAIL ${r.route} @${r.vp} status=${r.status} final=${r.final} overflow=${r.overflow} errors=${r.errors.join(";")} console=${r.console.join(";")} failed=${r.failed.slice(0, 3).join(";")} broken=${r.broken.join(",")}`), ...flows.map(f => `${f.ok ? "PASS" : "FAIL"} flow ${f.name} @${f.w} ${f.route}: ${f.note}`)];
const clippedRows = results.filter(r => r.clipped?.length).map(r => `WARN clipped text ${r.route} @${r.vp}: ${r.clipped.join("; ")}`);
lines.push(...clippedRows.slice(0, 40));
summary.clippedWarnings = clippedRows.length;
fs.writeFileSync(path.join(out, "e2e-summary.txt"), lines.join("\n") + "\n");
console.log(lines.join("\n"));
console.log(bad.length || flows.some(f => !f.ok) ? "R26 PREVIEW E2E: FAIL" : "R26 PREVIEW E2E: PASS");
process.exit(bad.length || flows.some(f => !f.ok) ? 1 : 0);
