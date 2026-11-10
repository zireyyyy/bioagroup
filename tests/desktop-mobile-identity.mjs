// Runtime proof that a Tablet-only patch left Desktop and Mobile untouched: for the main page groups x VI/EN at
// 390 / 768 (Mobile, incl. boundary) and 1201 / 1440 / 1920 (Desktop, incl. boundary), the computed typography and
// the geometry of every visible element must be identical between the previous and the new dist (real Chrome,
// same settle time, counters waited out). Usage: node tests/desktop-mobile-identity.mjs <beforeDist> <afterDist>
import { chromium } from "playwright";
import { createDistServer } from "../tools/serve-dist.mjs";

const [A, B] = process.argv.slice(2);
const ROUTES = ["/", "/about/", "/contract-manufacturing-cosmetics/", "/dich-vu-khac/", "/blog/", "/blog/gia-cong-kem-tri-tham-nhu-hoa-giai-phap-lam-hong-vung-nhay-cam-chuyen-sau/", "/contacts/"];
const WIDTHS = (process.env.DMI_WIDTHS || "390,768,1201,1440,1920").split(",").map(Number);
const serve = async d => { const s = createDistServer(d); await new Promise(r => s.listen(0, "127.0.0.1", r)); return s; };
const sa = await serve(A), sb = await serve(B);
const browser = await chromium.launch({ headless: true, ...(process.env.BIOA_CHROME_PATH ? { executablePath: process.env.BIOA_CHROME_PATH } : {}) });
const snap = async (base, route, w) => {
  const page = await browser.newPage({ viewport: { width: w, height: 1000 } });
  await page.route("**/*", r => r.request().method() !== "GET" || /googletagmanager|yandex|dashly|geojs|challenges\.cloudflare/.test(r.request().url()) ? r.abort() : r.fallback());
  // Every page waits for live merywood.com modal.js/input.js (D2/D4); retry a load that timed out on that host
  // (2026-11-10: single requests took 18 s) - a page that never loads still fails the case.
  for (let i = 1; ; i++){ try { await page.goto(base + route, { waitUntil: "load", timeout: 90000 }); break; } catch (e){ if (i >= 3) throw e; } }
  await page.waitForTimeout(3500);
  const s = await page.evaluate(() => {
    const out = [];
    // The chat launcher teaser opens/closes on its own timer (class is-teaser + slide-in animation), so two loads are
    // never at the same instant: its subtree is excluded here (its CSS is covered by tests/tablet-only-diff-proof.mjs).
    for (const e of document.querySelectorAll("body *")){
      if (e.closest(".bioa-contact-fab")) continue;
      const c = getComputedStyle(e); if (c.display === "none" || c.visibility === "hidden") continue;
      const r = e.getBoundingClientRect(); if (!r.width || !r.height) continue;
      // positions are taken relative to the document (smooth-scrollbar keeps scroll 0 here)
      out.push([e.tagName, (e.className.baseVal ?? e.className).slice(0, 30), Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height), c.fontSize, c.lineHeight, c.fontWeight].join("|"));
    }
    return out;
  });
  await page.close(); return s;
};
let bad = 0, n = 0;
for (const route of ROUTES) for (const lang of ["vi", "en"]) for (const w of WIDTHS){
  const r = (lang === "en" ? "/en" : "") + route; n++;
  let x, y;
  try { [x, y] = [await snap("http://127.0.0.1:" + sa.address().port, r, w), await snap("http://127.0.0.1:" + sb.address().port, r, w)]; }
  catch (e){ bad++; console.log("LOAD-FAIL", r, "@" + w, e.message.split("\n")[0]); continue; }
  const ok = x.length === y.length && x.every((v, i) => v === y[i]);
  if (!ok){ bad++; const i = x.findIndex((v, k) => v !== y[k]); console.log("DIFF", r, "@" + w, "elements", x.length, "/", y.length, "first:", x[i], "vs", y[i]); }
}
await browser.close(); sa.close(); sb.close();
console.log(`Desktop/Mobile identity: ${n - bad}/${n} cases identical (typography + geometry of every visible element)`);
process.exit(bad ? 1 : 0);
