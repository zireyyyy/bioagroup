// P0A — OWNER PASS guard: local dist vs the owner-reviewed Preview (same live runtime CSS/JS).
// Compares DOM class inventory, visible text, computed typography/colour, geometry,
// viewport screenshots and interaction outcomes. Read-only: never submits forms.
// Env: BIOA_REFERENCE_URL (default abdd7602 Preview), BIOA_CHROME_PATH (optional), BIOA_REPORTS.
import { chromium } from "playwright";
import { createServer } from "node:http";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { resolve, sep, extname, join } from "node:path";
import { inflateSync } from "node:zlib";

const REF = process.env.BIOA_REFERENCE_URL || "https://abdd7602.bioagroup.pages.dev";
const OUT = process.env.BIOA_REPORTS || "p0a-reports";
const PATHS = (process.env.GUARD_PATHS || "/,/about/,/contract-manufacturing-cosmetics/,/dich-vu-khac/,/blog/,/blog/page/6/,/blog/gia-cong-kem-tri-tham-nhu-hoa-giai-phap-lam-hong-vung-nhay-cam-chuyen-sau/,/contacts/").split(",");
const WIDTHS = (process.env.GUARD_WIDTHS || "1440,1024,834,390").split(",").map(Number);
const LANGS = ["vi", "en"];
const PX_TOL = 1.01;          // geometry tolerance in CSS px
const SHOT_TOL = 0.002;       // max share of differing pixels per screenshot

const root = resolve("dist");
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".png": "image/png", ".webp": "image/webp", ".avif": "image/avif", ".woff2": "font/woff2", ".jpg": "image/jpeg" };
const server = createServer(async (req, res) => {
  const p = decodeURIComponent(new URL(req.url, "http://local").pathname);
  const f = resolve(root, "." + (p.endsWith("/") ? p + "index.html" : p));
  if (!f.startsWith(root + sep)){ res.writeHead(403).end(); return; }
  let body; try { body = await readFile(f); } catch { res.writeHead(404).end(); return; }
  res.writeHead(200, { "content-type": types[extname(f)] || "application/octet-stream" }).end(body);
});
await new Promise(r => server.listen(0, "127.0.0.1", r));
const LOCAL = "http://127.0.0.1:" + server.address().port;

// --- minimal PNG decoder (8-bit RGB/RGBA, non-interlaced: Chromium screenshots) ---
function decodePng(buf){
  let p = 8, w = 0, h = 0, ct = 0; const idat = [];
  while (p < buf.length){
    const len = buf.readUInt32BE(p), type = buf.toString("ascii", p + 4, p + 8), d = buf.subarray(p + 8, p + 8 + len);
    if (type === "IHDR"){ w = d.readUInt32BE(0); h = d.readUInt32BE(4); ct = d[9]; if (d[8] !== 8 || d[12]) throw new Error("png format"); }
    if (type === "IDAT") idat.push(d);
    p += 12 + len;
  }
  const bpp = ct === 6 ? 4 : 3, stride = w * bpp, raw = inflateSync(Buffer.concat(idat)), px = Buffer.alloc(h * stride);
  for (let y = 0; y < h; y++){
    const f = raw[y * (stride + 1)], src = raw.subarray(y * (stride + 1) + 1, (y + 1) * (stride + 1)), o = y * stride;
    for (let x = 0; x < stride; x++){
      const a = x >= bpp ? px[o + x - bpp] : 0, b = y ? px[o - stride + x] : 0, c = y && x >= bpp ? px[o - stride + x - bpp] : 0;
      let v = src[x];
      if (f === 1) v += a; else if (f === 2) v += b; else if (f === 3) v += (a + b) >> 1;
      else if (f === 4){ const q = a + b - c, pa = Math.abs(q - a), pb = Math.abs(q - b), pc = Math.abs(q - c); v += pa <= pb && pa <= pc ? a : pb <= pc ? b : c; }
      px[o + x] = v & 255;
    }
  }
  return { w, h, bpp, px };
}
function pixelDiff(a, b){
  const A = decodePng(a), B = decodePng(b);
  if (A.w !== B.w || A.h !== B.h) return 1;
  let n = 0;
  for (let i = 0; i < A.w * A.h; i++){
    const x = i * A.bpp, y = i * B.bpp;
    if (Math.abs(A.px[x] - B.px[y]) + Math.abs(A.px[x + 1] - B.px[y + 1]) + Math.abs(A.px[x + 2] - B.px[y + 2]) > 48) n++;
  }
  return n / (A.w * A.h);
}

const launch = { headless: true, args: ["--no-sandbox", "--font-render-hinting=none"] };
if (process.env.BIOA_CHROME_PATH) launch.executablePath = process.env.BIOA_CHROME_PATH;
const browser = await chromium.launch(launch);
const NOISE = /challenges\.cloudflare\.com|googletagmanager|google-analytics|mc\.yandex|dashly|bio-a%20group|Bio-A%20Group/i;
const FREEZE = "*,*::before,*::after{animation-duration:0s!important;animation-delay:0s!important;transition:none!important;caret-color:transparent!important}" +
  ".cf-turnstile,iframe,[class*=proactive],[class*=chat-bubble]{visibility:hidden!important}" +
  ".bioa-chat__teaser{display:none!important}";

// BIOA_REF_PIN_DIR: serve pinned runtime main.css/main.js to the REFERENCE page, so a pinned
// local build is compared with the owner-reviewed HTML under the identical runtime (P0B1).
const PIN = process.env.BIOA_REF_PIN_DIR;
const pinned = PIN ? [
  [/merywood\.com\/wp-content\/themes\/mery-wood\/assets\/css\/main\.css/, await readFile(join(PIN, "runtime", "main.txt")), "text/css"],
  [/merywood\.com\/wp-content\/themes\/mery-wood\/assets\/js\/main\.js/, await readFile(join(PIN, "runtime", "main.js")), "text/javascript"]
] : [];

async function open(base, route, width){
  const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
  const posts = [];
  if (base === REF) for (const [re, body, type] of pinned) await page.route(re, r => r.fulfill({ status: 200, contentType: type, body }));
  await page.route("**/*", r => {
    const q = r.request();
    if (q.method() !== "GET"){ const act = ((q.postData() || "").match(/(?:^|&)action=([\w-]+)|name="action"\s+([\w-]+)/) || []).slice(1).find(Boolean) || ""; posts.push(q.url() + (act ? " action=" + act : "") + (process.env.GUARD_TRACE ? " @" + (page.__step || "load") : "")); return r.abort(); }   // never submit anything
    // never follow an external link (WhatsApp, Zalo, Maps, social): abort the navigation before network
    if (q.isNavigationRequest() && !q.url().startsWith(base)){ posts.push("NAV " + q.url()); return r.abort(); }
    return NOISE.test(q.url()) ? r.abort() : r.fallback();
  });
  await page.goto(base + route, { waitUntil: "load", timeout: 60000 });
  await page.evaluate(() => document.fonts.ready);
  await page.addStyleTag({ content: FREEZE });
  await page.waitForTimeout(1200);
  await settleText(page);
  return { page, posts };
}

// Count-up counters and timed widgets animate after load/scroll: wait until the page is still.
async function settleText(page){
  let prev = null;
  for (let i = 0; i < 15; i++){
    const t = await page.evaluate(() => document.body.innerText);
    if (t === prev) return;
    prev = t; await page.waitForTimeout(700);
  }
}
async function stableShot(page){
  let prev = await page.screenshot();
  for (let i = 0; i < 12; i++){
    await page.waitForTimeout(600);
    const cur = await page.screenshot();
    if (cur.equals(prev)) return cur;
    prev = cur;
  }
  return prev;
}

const snapshot = page => page.evaluate(() => {
  const R = n => Math.round(n * 100) / 100;
  const vis = e => { const c = getComputedStyle(e), r = e.getBoundingClientRect(); return c.display !== "none" && c.visibility !== "hidden" && r.width > 0 && r.height > 0; };
  const classes = {};
  for (const e of document.body.querySelectorAll("*")) for (const c of e.classList) if (!/^__cf_email__$|^is-teaser$|^cf-turnstile-br-cf7-\d+$|swiper-slide-(active|next|prev|duplicate)|is-in|aos/.test(c)) classes[c] = (classes[c] || 0) + 1;
  const text = [...document.querySelectorAll("header,main,.page-main,footer,#mw-consent")].map(e => e.innerText.replace(/\s+/g, " ").trim()).join(" | ");
  const styles = [], boxes = [];
  const sel = "header *,footer *,main *,.page-main *,#mw-consent *,[class*=bioa] *,[class*=bioa]";
  for (const e of document.querySelectorAll(sel)){
    if (!vis(e)) continue;
    const own = [...e.childNodes].some(n => n.nodeType === 3 && n.data.trim().length > 1);
    const c = getComputedStyle(e), r = e.getBoundingClientRect();
    if (own || e.tagName === "IMG" || e.tagName === "svg")
      styles.push([e.tagName, (e.className.baseVal ?? e.className).slice(0, 40), c.fontFamily.slice(0, 24), c.fontSize, c.fontWeight, c.lineHeight, c.color, c.backgroundColor].join("|"));
    if (e.tagName === "IMG" || e.matches("header,footer,section,.block,[class*=bioa]"))
      boxes.push({ k: e.tagName + "." + [...e.classList].filter(c => c !== "is-teaser").join(" ").slice(0, 40), x: R(r.left), y: R(r.top + (window.scrollY || 0)), w: R(r.width), h: R(r.height) });
  }
  const swipers = [...document.querySelectorAll(".swiper")].filter(vis).map(e => [e.closest("section,.block")?.className.slice(0, 40), !!e.swiper?.initialized, e.querySelectorAll(".swiper-slide").length]);
  return { classes, text, styles: styles.sort(), boxes, swipers };
});

async function scrollTo(page, y){
  await page.evaluate(y => { const sb = window.Scrollbar?.getAll?.()[0]; if (sb) sb.setPosition(0, y); else window.scrollTo(0, y); }, y);
  await page.waitForTimeout(500);
}

// Real pointer clicks (Cookie and mobile menu handlers ignore synthetic el.click()).
async function realClicks(page, width){
  const out = {};
  page.__step = "cookie";
  const state = sel => page.evaluate(s => { const e = document.querySelector(s); if (!e) return "none"; const c = getComputedStyle(e); return [c.display, c.visibility, (+c.opacity).toFixed(2)].join("|"); }, sel);
  const deny = page.locator("#mw-consent .mw-deny:visible").first();
  if (await deny.count()){ out.cookieBefore = await state("#mw-consent"); await deny.click(); await page.waitForTimeout(900); out.cookieAfter = await state("#mw-consent"); out.cookieDecided = await page.evaluate(() => document.documentElement.classList.contains("bioa-cookie-decided")); }
  if (width <= 768){
    page.__step = "menu";
    const burger = page.locator(".bioa-mobile-menu-button-clean:visible").first();
    if (await burger.count()){
      await burger.click(); await page.waitForTimeout(900);
      out.menuOpen = await page.evaluate(() => [document.documentElement.className.slice(0, 80), document.body.className.slice(0, 80),
        [...document.querySelectorAll("a[href]")].filter(a => { const r = a.getBoundingClientRect(); return r.width > 0 && r.height > 0 && r.top >= 0 && r.top < innerHeight && getComputedStyle(a).visibility !== "hidden"; }).length].join("|"));
      // Close with the same (now "close") toggle, never a forced click that could land on a contact link.
      await burger.click({ timeout: 3000 }).catch(() => page.keyboard.press("Escape")); await page.waitForTimeout(900);
      out.menuClosed = await page.evaluate(() => document.documentElement.className.slice(0, 80) + "|" + document.body.className.slice(0, 80));
    }
  }
  return out;
}

async function interact(page, width){
  const pre = await realClicks(page, width);
  page.__step = "in-page";
  const rest = await page.evaluate(async w => {
    const wait = ms => new Promise(r => setTimeout(r, ms));
    const vis = e => e && e.getBoundingClientRect().width > 0 && getComputedStyle(e).visibility !== "hidden" && getComputedStyle(e).display !== "none";
    const out = {};
    const state = e => e ? [getComputedStyle(e).display, getComputedStyle(e).visibility, (+getComputedStyle(e).opacity).toFixed(2), e.className.slice(0, 60)].join("|") : "none";
    out.swiper = [];
    for (const el of [...document.querySelectorAll(".swiper")].filter(vis)){
      const s = el.swiper, sec = el.closest("section,.block") || el.parentElement;
      const next = [...sec.querySelectorAll(".swiper-button_right,.swiper-button-next")].find(vis);
      if (!s || !next || next.classList.contains("swiper-button-disabled")){ out.swiper.push(s ? "no-next" : "not-init"); continue; }
      const a = s.realIndex ?? s.activeIndex, t = s.translate; next.click(); await wait(500);
      out.swiper.push((s.realIndex ?? s.activeIndex) !== a || s.translate !== t ? "moved" : "stuck");
    }
    const lang = [...document.querySelectorAll("a[href]")].filter(a => /^\/en\/|^\/$|^\/en$/.test(a.getAttribute("href")) && /\b(EN|VI)\b/.test(a.textContent)).map(a => a.getAttribute("href"));
    out.langLinks = [...new Set(lang)].sort();
    const modal = document.getElementById("get-a-quote");
    const trigger = [...document.querySelectorAll('[modal="get-a-quote"]')].find(vis);
    if (modal && trigger){
      trigger.click(); await wait(900); out.modalOpen = state(modal);
      out.modalFields = [...modal.querySelectorAll("input:not([type=hidden]),select,textarea,button")].filter(vis).length;
      const close = modal.querySelector(".modal__close"); if (close){ close.click(); await wait(900); out.modalClosed = state(modal); }
    }
    const toc = document.querySelector(".js-toc a[href^='#'],[class*=toc] a[href^='#']");
    if (toc){ toc.click(); await wait(900); out.toc = location.hash || "clicked"; }
    const faq = [...document.querySelectorAll(".contacts-faq-q")].find(vis);
    if (faq){ faq.click(); await wait(600); out.faqActive = document.querySelectorAll(".contacts-faq-item.active").length; }
    return out;
  }, width);
  return { ...pre, ...rest };
}

const diffList = (a, b) => { const m = new Map(); a.forEach(x => m.set(x, (m.get(x) || 0) + 1)); b.forEach(x => m.set(x, (m.get(x) || 0) - 1)); return [...m].filter(([, n]) => n).map(([k, n]) => (n > 0 ? "+local " : "-local ") + k); };

await mkdir(OUT, { recursive: true });
const results = []; let failures = 0;
for (const path of PATHS) for (const lang of LANGS) for (const width of WIDTHS){
  const route = (lang === "vi" ? "" : "/en") + path;
  const res = { route, width, fail: [] };
  try{
    const L = await open(LOCAL, route, width), P = await open(REF, route, width);
    const a = await snapshot(L.page), b = await snapshot(P.page);
    const cls = Object.keys({ ...a.classes, ...b.classes }).filter(k => a.classes[k] !== b.classes[k]);
    if (cls.length) res.fail.push("dom-classes: " + cls.slice(0, 8).map(k => k + " " + (a.classes[k] || 0) + "/" + (b.classes[k] || 0)).join(", "));
    if (a.text !== b.text) res.fail.push("text differs");
    const st = diffList(a.styles, b.styles); if (st.length) res.fail.push("computed: " + st.slice(0, 6).join(" ; "));
    const bx = a.boxes.length !== b.boxes.length ? ["count " + a.boxes.length + "/" + b.boxes.length] :
      a.boxes.map((x, i) => { const y = b.boxes[i]; return x.k !== y.k || ["x", "y", "w", "h"].some(k => Math.abs(x[k] - y[k]) > PX_TOL) ? x.k + " " + [x.x, x.y, x.w, x.h] + " vs " + [y.x, y.y, y.w, y.h] : null; }).filter(Boolean);
    if (bx.length) res.fail.push("geometry: " + bx.slice(0, 4).join(" ; "));
    if (JSON.stringify(a.swipers) !== JSON.stringify(b.swipers)) res.fail.push("swiper-state: " + JSON.stringify(a.swipers) + " vs " + JSON.stringify(b.swipers));
    const shots = [];
    for (const y of [0, 900, 1800, 2700, 3600]){
      L.page.__step = P.page.__step = "scroll" + y;
      await scrollTo(L.page, y); await scrollTo(P.page, y);
      const sa = await stableShot(L.page), sb = await stableShot(P.page);
      const d = pixelDiff(sa, sb); shots.push(+d.toFixed(5));
      if (d > SHOT_TOL){
        res.fail.push("screenshot y=" + y + " diff " + (d * 100).toFixed(2) + "%");
        const base = join(OUT, (route.replace(/\W+/g, "_") || "_") + "-" + width + "-y" + y);
        await writeFile(base + "-local.png", sa); await writeFile(base + "-ref.png", sb);
      }
    }
    res.shots = shots;
    await scrollTo(L.page, 0); await scrollTo(P.page, 0);
    const ia = await interact(L.page, width), ib = await interact(P.page, width);
    res.interaction = ia;
    if (JSON.stringify(ia) !== JSON.stringify(ib)) res.fail.push("interaction: " + JSON.stringify(ia) + " vs " + JSON.stringify(ib));
    // Every non-GET request is aborted on both sides; the attempts themselves must match the reference.
    // Compare the distinct KINDS of blocked requests: time-based beacons (e.g. Blog hs_reader_ping every 15 s)
    // fire a variable number of times depending on how long the guard stays on the page.
    const pk = a => [...new Set(a.map(u => u.replace(/^https?:\/\/[^/]+/, "").replace(/ @.*$/, "")))].sort().join(",");
    res.blockedPosts = L.posts.length;
    if (pk(L.posts) !== pk(P.posts)) res.fail.push("non-GET attempts differ: " + L.posts.slice(0, 2).join(", ") + " vs " + P.posts.slice(0, 2).join(", "));
    await L.page.close(); await P.page.close();
  }catch(e){ res.fail.push("error: " + String(e).slice(0, 200)); }
  if (res.fail.length) failures++;
  results.push(res);
  console.log((res.fail.length ? "FAIL " : "PASS ") + route + " @" + width + (res.fail.length ? " :: " + res.fail.join(" | ").slice(0, 600) : ""));
}
await writeFile(join(OUT, "p0a-custom-pass-guard.json"), JSON.stringify({ reference: REF, results }, null, 2));
await browser.close(); server.close();
console.log(`P0A custom PASS guard: ${results.length - failures}/${results.length} cases identical to reference`);
if (failures) process.exit(1);
