// P1 + P2 — Home canonical Bio-A icon parity and scoped Tablet readability.
// P1: Home Why Choose 04 == Other Services monogram at every width; Desktop/Mobile 22x27 (Production
//     OWNER PASS), Tablet 769-1200 keeps the PR #10 source footprint (1.5625vw); icons 01/02 keep the
//     cream filter; no artwork overflows its badge.
// P2: 769-1200 only — Home steps not clipped, formats lede / modal consent readable; Desktop/Mobile unchanged.
// Read-only; never submits forms. Env: BIOA_CHROME_PATH (optional).
import { chromium } from "playwright";
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { resolve, sep, extname } from "node:path";

const root = resolve("dist");
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".png": "image/png", ".webp": "image/webp" };
const server = createServer(async (req, res) => {
  const p = decodeURIComponent(new URL(req.url, "http://l").pathname);
  const f = resolve(root, "." + (p.endsWith("/") ? p + "index.html" : p));
  if (!f.startsWith(root + sep)){ res.writeHead(403).end(); return; }
  let b; try { b = await readFile(f); } catch { res.writeHead(404).end(); return; }
  res.writeHead(200, { "content-type": types[extname(f)] || "application/octet-stream" }).end(b);
});
await new Promise(r => server.listen(0, "127.0.0.1", r));
const base = "http://127.0.0.1:" + server.address().port;
const launch = { headless: true, args: ["--no-sandbox"] };
if (process.env.BIOA_CHROME_PATH) launch.executablePath = process.env.BIOA_CHROME_PATH;
const browser = await chromium.launch(launch);

const fails = [];
const near = (a, b) => Math.abs(a - b) <= 0.06;
async function measure(route, width){
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  await page.route("**/*", r => r.request().method() !== "GET" || /challenges\.cloudflare|googletagmanager|yandex|dashly|bio-a%20group/i.test(r.request().url()) ? r.abort() : r.fallback());
  await page.goto(base + route, { waitUntil: "load", timeout: 60000 });
  await page.waitForTimeout(700);
  const d = await page.evaluate(() => {
    const vis = e => e.getBoundingClientRect().width > 0;
    const icons = [...document.querySelectorAll("#why-choose-us img,.block-how-works .step__icon img,.block-right-choice .client__icon img")].filter(vis).map(e => {
      const r = e.getBoundingClientRect(), q = e.parentElement.getBoundingClientRect();
      return { src: e.src.split("/").pop(), w: r.width, h: r.height, overflow: r.width > q.width + .5 || r.height > q.height + .5, filter: getComputedStyle(e).filter };
    });
    const steps = [...document.querySelectorAll(".block-how-works .step__text")].filter(vis);
    const m = document.getElementById("get-a-quote");
    if (m){ m.style.setProperty("display", "block", "important"); m.classList.add("open"); }
    const fs = e => e ? parseFloat(getComputedStyle(e).fontSize) : null;
    return { icons, clipped: steps.filter(e => e.scrollHeight > e.clientHeight + 1).length, stepFs: fs(steps[0]),
      lede: fs(document.querySelector(".formats__lede")), consent: fs(m?.querySelector(".label-check")) };
  });
  await page.close();
  return d;
}

for (const lang of ["", "/en"]) for (const width of [375, 390, 768, 769, 834, 1024, 1152, 1200, 1201, 1440, 1920]){
  const home = await measure(lang + "/", width), svc = await measure(lang + "/dich-vu-khac/", width);
  const tablet = width >= 769 && width <= 1200;
  const exp = tablet ? [width * 0.015625, width * 0.015625] : [22, 27];
  const id = (lang || "vi") + "@" + width;
  const mono = [...home.icons, ...svc.icons].filter(i => /bioa-monogram-cream/.test(i.src));
  if (mono.length < 3) fails.push(id + " expected Home + Services monograms, found " + mono.length);
  for (const i of mono){
    if (!near(i.w, exp[0]) || !near(i.h, exp[1])) fails.push(id + " monogram " + i.w.toFixed(2) + "x" + i.h.toFixed(2) + " != " + exp.map(x => x.toFixed(2)).join("x"));
    if (i.overflow) fails.push(id + " monogram overflows badge");
  }
  for (const i of home.icons.filter(i => /^icon-[12]\.svg$/.test(i.src))) if (i.filter === "none") fails.push(id + " Home " + i.src + " lost cream filter");
  const p2 = process.env.ONLY !== "P1";
  if (p2 && home.clipped) fails.push(id + " Home steps clipped: " + home.clipped);
  if (p2 && tablet){
    // TABLET-TYPE-SOURCE2 (owner Tablet FAIL 2026-11-10 replaced the 12px floor): body copy is exactly the
    // Merywood desktop-fluid size with a 9px minimum; the consultation modal keeps its >=12px (473eeaf, unchanged).
    const want = vw => Math.max(9, vw * width / 100);
    for (const [k, v, vw] of [["step", home.stepFs, .8333], ["lede", home.lede, .9896]]) if (v !== null && Math.abs(v - want(vw)) > .05) fails.push(id + " " + k + " " + v + "px != max(9px," + vw + "vw) " + want(vw).toFixed(2));
    if (home.consent !== null && home.consent < 12) fails.push(id + " consent " + home.consent + "px < 12px");
  } else if (width <= 768){
    if (home.stepFs !== 14) fails.push(id + " Mobile step font changed: " + home.stepFs);
  }
  console.log(id, "mono", mono.map(i => i.w.toFixed(2) + "x" + i.h.toFixed(2)).join(","), "clip", home.clipped, "step", home.stepFs, "lede", home.lede, "consent", home.consent);
}
await browser.close(); server.close();
for (const f of fails) console.log("FAIL", f);
console.log("P1/P2:", fails.length ? fails.length + " failure(s)" : "PASS");
if (fails.length) process.exit(1);
