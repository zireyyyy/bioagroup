// Tablet readability probe (769–1200 desktop-fluid): visible text smaller than 11px, clipped text
// (overflow hidden/clip with scrollWidth > clientWidth) and page-level horizontal overflow, on the
// local build AND on the owner-reviewed Preview, so pre-existing items are separated from new ones.
// Report only (exit 0) — owner decides; a NEW item (local only) is printed as NEW.
import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createDistServer } from "../tools/serve-dist.mjs";

const OUT = process.env.BIOA_REPORTS || "p0a-reports"; mkdirSync(OUT, { recursive: true });
const REF = process.env.BIOA_REFERENCE_URL || "https://abdd7602.bioagroup.pages.dev";
const PATHS = ["/", "/about/", "/contract-manufacturing-cosmetics/", "/dich-vu-khac/", "/blog/", "/blog/an-gi-de-chong-lao-hoa-da/", "/contacts/", "/careers/"];
const WIDTHS = [769, 834, 1024, 1200];
const server = createDistServer("dist"); await new Promise(r => server.listen(0, "127.0.0.1", r));
const LOCAL = "http://127.0.0.1:" + server.address().port;
const browser = await chromium.launch({ headless: true, ...(process.env.BIOA_CHROME_PATH ? { executablePath: process.env.BIOA_CHROME_PATH } : {}) });
async function probe(base, route, width){
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  await page.route("**/*", r => r.request().method() !== "GET" || /challenges\.cloudflare|googletagmanager|yandex|dashly|geojs/.test(r.request().url()) ? r.abort() : r.fallback());
  try {
    await page.goto(base + route, { waitUntil: "load", timeout: 70000 }); await page.waitForTimeout(700);
    return await page.evaluate(() => {
      const vis = e => { const s = getComputedStyle(e); const r = e.getBoundingClientRect(); return s.visibility !== "hidden" && s.display !== "none" && +s.opacity > 0 && r.width > 0 && r.height > 0; };
      const key = e => e.tagName + "." + (typeof e.className === "string" ? e.className.trim().split(/\s+/).slice(0, 2).join(".") : "") + " «" + e.textContent.trim().replace(/\s+/g, " ").slice(0, 40) + "»";
      const small = new Set(), clipped = new Set();
      for (const e of document.querySelectorAll("body *")){
        if (e.closest("#mw-consent,#get-a-quote,.bioa-contact-fab,script,style,svg,noscript")) continue;
        const own = [...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim().length > 1);
        if (!own || !vis(e)) continue;
        const s = getComputedStyle(e), fs = parseFloat(s.fontSize);
        if (fs < 11) small.add(key(e) + " " + fs.toFixed(1) + "px");
        if (/(hidden|clip)/.test(s.overflowX + s.overflow) && e.scrollWidth > e.clientWidth + 1) clipped.add(key(e) + " " + e.scrollWidth + ">" + e.clientWidth);
      }
      return { small: [...small], clipped: [...clipped], overflow: Math.max(0, document.documentElement.scrollWidth - innerWidth) };
    });
  } catch (e){ return { error: e.message.split("\n")[0], small: [], clipped: [], overflow: 0 }; }
  finally { await page.close(); }
}
const rows = [];
for (const p of PATHS) for (const lang of ["vi", "en"]) for (const w of WIDTHS){
  const route = lang === "en" ? (p === "/" ? "/en/" : "/en" + p) : p;
  const [l, r] = await Promise.all([probe(LOCAL, route, w), probe(REF, route, w)]);
  const nw = k => l[k].filter(x => !r[k].includes(x));
  const row = { route, width: w, local: l, ref: r, newSmall: nw("small"), newClipped: nw("clipped"), newOverflow: l.overflow > 1 && r.overflow <= 1 };
  rows.push(row);
  console.log(`${route} @${w} small ${l.small.length} (ref ${r.small.length}) clipped ${l.clipped.length} (ref ${r.clipped.length}) overflow ${l.overflow}` +
    (row.newSmall.length || row.newClipped.length || row.newOverflow ? "  NEW: " + [...row.newSmall, ...row.newClipped, row.newOverflow ? "overflow" : ""].filter(Boolean).join(" | ") : "") + (l.error ? " ERR " + l.error : ""));
}
await browser.close(); server.close();
writeFileSync(join(OUT, "tablet-readability-probe.json"), JSON.stringify(rows, null, 2));
const nNew = rows.filter(r => r.newSmall.length || r.newClipped.length || r.newOverflow).length;
console.log(`Tablet readability: ${rows.length} cases, ${nNew} with NEW items vs reference`);
