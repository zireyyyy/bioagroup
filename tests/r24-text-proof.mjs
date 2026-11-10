// R24 visible-text proof: the deep guard only reports a boolean "text differs" against the reference Preview.
// This proves what R24 changed in visible text by comparing the previous frozen candidate (R21) with the R24
// candidate locally, with the SAME text extraction as the guard (header, main, .page-main, footer, #mw-consent
// innerText), on the guard routes x VI/EN x 1440/1024/834/390. The only allowed differences are the removed Footer
// labels (recruitment x2, Shipping) and the About team CTA label. Usage: node tests/r24-text-proof.mjs <r21Dist> <r24Dist>
import { chromium } from "playwright";
import { createDistServer } from "../tools/serve-dist.mjs";

const [before, after] = process.argv.slice(2);
const PATHS = (process.env.GUARD_PATHS || "/,/about/,/contract-manufacturing-cosmetics/,/dich-vu-khac/,/blog/,/blog/page/6/,/blog/gia-cong-kem-tri-tham-nhu-hoa-giai-phap-lam-hong-vung-nhay-cam-chuyen-sau/,/contacts/").split(",");
const WIDTHS = [1440, 1024, 834, 390];
const REMOVED = ["Tuyển Dụng R&D", "Tuyển Dụng NV Sales", "Chính Sách Vận Chuyển", "R&D Recruitment", "Sales Recruitment", "Shipping Policy"];
const ABOUT = [["Xem Cơ Hội Tuyển Dụng", "Liên Hệ Bio-A Group"], ["See Open Roles", "Contact Bio-A Group"]];
const serve = async d => { const s = createDistServer(d); await new Promise(r => s.listen(0, "127.0.0.1", r)); return s; };
const sa = await serve(before), sb = await serve(after);
const A = "http://127.0.0.1:" + sa.address().port, B = "http://127.0.0.1:" + sb.address().port;
const browser = await chromium.launch({ headless: true, ...(process.env.BIOA_CHROME_PATH ? { executablePath: process.env.BIOA_CHROME_PATH } : {}) });
const text = async (base, route, width) => {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  await page.route("**/*", r => r.request().method() !== "GET" || /googletagmanager|yandex|dashly|geojs|challenges\.cloudflare/.test(r.request().url()) ? r.abort() : r.fallback());
  await page.goto(base + route, { waitUntil: "load", timeout: 70000 }); await page.waitForTimeout(800);
  // Hero stat counters animate after load: read only once two reads 600 ms apart are identical (max ~12 s).
  const read = () => page.evaluate(() => [...document.querySelectorAll("header,main,.page-main,footer,#mw-consent")].map(e => e.innerText.replace(/\s+/g, " ").trim()).join(" | "));
  let t = await read();
  for (let i = 0; i < 20; i++){ await page.waitForTimeout(600); const u = await read(); if (u === t) break; t = u; }
  await page.close(); return t;
};
let bad = 0, n = 0, changed = 0;
for (const p of PATHS) for (const lang of ["vi", "en"]) for (const w of WIDTHS){
  const route = (lang === "vi" ? "" : "/en") + p;
  const x = await text(A, route, w), y = await text(B, route, w);
  n++;
  // normalise "before" by applying exactly the allowed R24 edits, then require equality
  let norm = x;
  for (const r of REMOVED) norm = norm.split(" " + r + " ").join(" ");
  if (/\/about\/$/.test(route)) for (const [o, nn] of ABOUT) norm = norm.split(o).join(nn);
  const ok = norm === y;
  if (x !== y) changed++;
  if (!ok){
    bad++;
    let i = 0; while (i < norm.length && norm[i] === y[i]) i++;
    console.log("FAIL", route, "@" + w, "first difference:", JSON.stringify(norm.slice(Math.max(0, i - 60), i + 80)), "vs", JSON.stringify(y.slice(Math.max(0, i - 60), i + 80)));
  }
}
await browser.close(); sa.close(); sb.close();
console.log(`R24 text proof: ${n - bad}/${n} cases differ from R21 only by the removed Footer labels / About CTA (${changed} cases changed text)`);
process.exit(bad ? 1 : 0);
