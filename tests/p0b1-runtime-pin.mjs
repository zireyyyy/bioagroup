// P0B1 — pinned runtime main.css/main.js: Swiper init + real next/prev, slide counts,
// no live Merywood main.css/main.js, legacy Manrope TTF never displaces Manrope Variable.
// Read-only; never submits forms. Env: BIOA_CHROME_PATH (optional), BIOA_REPORTS.
import { chromium } from "playwright";
import { createServer } from "node:http";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { resolve, sep, extname, join } from "node:path";

const root = resolve("dist");
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".png": "image/png", ".webp": "image/webp", ".woff2": "font/woff2" };
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

// Expected Swiper sections per route (slide counts as recorded by CI run 38864607899 on 2026-10-16).
const EXPECT = {
  "/": { "block-reviews": 6 },
  "/contract-manufacturing-cosmetics/": { "block-reviews": 6 },
  "/dich-vu-khac/": { "block-reviews": 6, "block-how-works": 5 }
};
const fails = [], rows = [];
for (const path of Object.keys(EXPECT)) for (const lang of ["vi", "en"]) for (const width of [390, 834, 1024, 1440]){
  const route = (lang === "vi" ? "" : "/en") + path;
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  const reqs = [];
  await page.route("**/*", r => {
    const q = r.request();
    if (q.method() !== "GET") return r.abort();
    if (/challenges\.cloudflare|googletagmanager|yandex|dashly|bio-a%20group/i.test(q.url())) return r.abort();
    return r.fallback();
  });
  page.on("requestfinished", async q => { const s = (await q.response())?.status(); reqs.push([q.url(), s]); });
  page.on("requestfailed", q => reqs.push([q.url(), "failed"]));
  await page.goto(base + route, { waitUntil: "load", timeout: 60000 });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1200);
  const d = await page.evaluate(async () => {
    const vis = e => { const r = e.getBoundingClientRect(), c = getComputedStyle(e); return r.width > 1 && r.height > 1 && c.display !== "none" && c.visibility !== "hidden"; };
    const sw = [];
    for (const el of [...document.querySelectorAll(".swiper")].filter(vis)){
      const sec = el.closest("section,.block") || el.parentElement;
      const name = [...sec.classList].find(c => /^block-/.test(c)) || "?";
      const s = el.swiper, row = { name, init: !!(s && s.initialized), slides: el.querySelectorAll(".swiper-slide").length, moved: null };
      const next = [...sec.querySelectorAll(".swiper-button_right,.swiper-button-next")].find(vis);
      if (s && next && !next.classList.contains("swiper-button-disabled")){
        const a = s.realIndex ?? s.activeIndex, t = s.translate; next.click(); await new Promise(r => setTimeout(r, 500));
        row.moved = (s.realIndex ?? s.activeIndex) !== a || s.translate !== t;
        const prev = [...sec.querySelectorAll(".swiper-button_left,.swiper-button-prev")].find(vis);
        if (prev){ prev.click(); await new Promise(r => setTimeout(r, 500)); row.back = (s.realIndex ?? s.activeIndex) === a; }
      }
      sw.push(row);
    }
    const loaded = [...document.fonts].filter(f => f.status === "loaded").map(f => f.family.replace(/"/g, "") + " " + f.weight);
    return { sw, family: getComputedStyle(document.body).fontFamily, loaded };
  });
  const live = reqs.filter(([u]) => /merywood\.com\/wp-content\/themes\/mery-wood\/assets\/(css\/main\.css|js\/main\.js)/.test(u));
  const ttfOk = reqs.filter(([u, s]) => /Manrope-[A-Za-z]+\.ttf/.test(u) && s === 200);
  const f = [];
  if (live.length) f.push("live main.css/main.js requested");
  if (ttfOk.length) f.push("legacy Manrope TTF loaded: " + ttfOk.map(x => x[0].split("/").pop()).join(","));
  if (!/Manrope/.test(d.family)) f.push("body font " + d.family);
  for (const s of d.sw){
    if (!s.init) f.push(s.name + " not initialized");
    if (s.moved === false) f.push(s.name + " next did not move");
    if (s.back === false) f.push(s.name + " prev did not return");
  }
  for (const [name, n] of Object.entries(EXPECT[path])){
    const hit = d.sw.find(s => s.name === name);
    if (!hit) f.push(name + " swiper not visible");
    else if (hit.slides !== n && !(name === "block-how-works" && hit.slides >= n)) f.push(name + " slides " + hit.slides + " != " + n);
  }
  rows.push({ route, width, ...d, fail: f });
  if (f.length) fails.push(route + "@" + width + ": " + f.join("; "));
  console.log((f.length ? "FAIL " : "PASS ") + route + " @" + width + " " + d.sw.map(s => s.name.replace("block-", "") + ":" + (s.init ? "I" : "-") + s.slides + (s.moved ? "→" : "") + (s.back ? "←" : "")).join(" ") + (f.length ? " :: " + f.join("; ") : ""));
  await page.close();
}
const out = process.env.BIOA_REPORTS || "p0b1-reports";
await mkdir(out, { recursive: true });
await writeFile(join(out, "p0b1-runtime-pin.json"), JSON.stringify(rows, null, 2));
await browser.close(); server.close();
console.log(`P0B1 runtime: ${rows.length - fails.length}/${rows.length} cases PASS`);
if (fails.length) process.exit(1);
