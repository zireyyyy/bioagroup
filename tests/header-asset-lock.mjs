// OI-1 lock (owner FAIL 2026-11-08): with the owner's serving method (tools/serve-dist.mjs) the
// Header must render as approved and every Header/shell asset must load, even after missing files.
// Desktop 1440 and Mobile 390, VI/EN. Read-only; non-GET and external navigations aborted.
// Env: BIOA_CHROME_PATH.
import { chromium } from "playwright";
import { createDistServer } from "../tools/serve-dist.mjs";

const server = createDistServer("dist");
await new Promise(r => server.listen(0, "127.0.0.1", r));
const base = "http://127.0.0.1:" + server.address().port;
const launch = { headless: true };
if (process.env.BIOA_CHROME_PATH) launch.executablePath = process.env.BIOA_CHROME_PATH;
const browser = await chromium.launch(launch);
const fails = [];
const check = (ok, msg) => { if (!ok) fails.push(msg); };

// 1. Missing files answer 404 and the server keeps serving.
for (const p of ["/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js", "/assets/does-not-exist.png", "/khong-co/", "/en/khong-co/"]){
  const r = await fetch(base + p);
  check(r.status === 404, "missing " + p + " -> " + r.status);
}
const css = await fetch(base + "/assets/runtime/merywood-main.css");
check(css.status === 200 && css.headers.get("content-type") === "text/css", "server stopped serving main.css after 404s");

// 2. Real Chrome: Header + shell assets at 1440/390 VI/EN.
const MUST = [/\/assets\/runtime\/merywood-main\.css/, /\/assets\/runtime\/merywood-main\.js/, /\/assets\/bioa-full\.svg/, /\/assets\/bioa-sales-avatar\.webp/, /\/assets\/zalo-bioa-owner\.png/, /\/assets\/bioa-monogram[^/]*\.svg/];
for (const route of ["/", "/en/"]) for (const width of [1440, 390]){
  const id = route + "@" + width;
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  const local = [];
  page.on("response", r => { if (r.url().startsWith(base)) local.push([r.status(), r.url().replace(base, "")]); });
  page.on("requestfailed", q => { if (q.url().startsWith(base) && !/\/cdn-cgi\//.test(q.url())) local.push(["FAILED " + q.failure()?.errorText, q.url().replace(base, "")]); });
  await page.route("**/*", r => { const q = r.request(); return q.method() !== "GET" || (q.isNavigationRequest() && !q.url().startsWith(base)) ? r.abort() : r.fallback(); });
  await page.goto(base + route, { waitUntil: "load", timeout: 60000 });
  await page.waitForTimeout(1500);
  for (const [s, u] of local) check(s === 200 || (s === 404 && /^\/cdn-cgi\//.test(u)), id + " same-origin " + s + " " + u);
  for (const re of MUST) check(local.some(([s, u]) => s === 200 && re.test(u)), id + " asset not loaded with 200: " + re);
  const d = await page.evaluate(() => {
    const vis = e => { if (!e) return false; let x = e; while (x){ const c = getComputedStyle(x); if (c.display === "none" || c.visibility === "hidden" || +c.opacity === 0) return false; x = x.parentElement; } const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0; };
    const header = document.querySelector("header, .header");
    const main = document.querySelector('link[rel="stylesheet"][href*="merywood-main.css"]');
    const imgs = header ? [...header.querySelectorAll("img")].filter(vis) : [];
    const blogLinks = header ? [...header.querySelectorAll("a")].filter(a => vis(a) && a.textContent.trim() === "Blog").length : -1;
    const avatar = [...document.images].find(i => /bioa-sales-avatar/.test(i.currentSrc || i.src) && vis(i));
    return {
      mainRules: main?.sheet ? main.sheet.cssRules.length : 0,
      bullets: header ? [...header.querySelectorAll("li")].filter(li => vis(li) && getComputedStyle(li).display === "list-item" && getComputedStyle(li).listStyleType !== "none").length : -1,
      headerImgsBroken: imgs.filter(i => i.complete && i.naturalWidth === 0).length, headerImgs: imgs.length,
      blogLinks, headerH: header ? header.getBoundingClientRect().height : 0,
      avatarOk: !!avatar && avatar.complete && avatar.naturalWidth > 0,
      brokenAny: [...document.images].filter(i => vis(i) && i.complete && i.naturalWidth === 0).map(i => i.currentSrc || i.src)
    };
  });
  check(d.mainRules > 100, id + " main.css not applied (" + d.mainRules + " rules)");
  check(d.bullets === 0, id + " header bullet items: " + d.bullets);
  check(d.headerImgs > 0 && d.headerImgsBroken === 0, id + " header images broken " + d.headerImgsBroken + "/" + d.headerImgs);
  // Desktop: exactly one visible "Blog" nav link (no duplicated nav). Mobile: nav collapsed behind the burger.
  check(width === 1440 ? d.blogLinks === 1 : d.blogLinks === 0, id + " visible header Blog links = " + d.blogLinks);
  check(d.headerH > 0 && d.headerH < 200, id + " header height " + d.headerH);
  check(d.avatarOk, id + " chat avatar not loaded");
  check(!d.brokenAny.length, id + " broken images: " + d.brokenAny.join(", "));
  console.log(id, JSON.stringify({ ...d, brokenAny: d.brokenAny.length, requests: local.length }));
  await page.close();
}
// 3. Server still alive after all of the above.
check((await fetch(base + "/")).status === 200, "server not alive at end");
await browser.close(); server.close();
for (const f of fails) console.log("FAIL", f);
console.log(fails.length ? `Header/asset lock: ${fails.length} FAIL` : "Header/asset lock: PASS (1440/390 VI/EN, 404s do not stop the server)");
if (fails.length) process.exit(1);
