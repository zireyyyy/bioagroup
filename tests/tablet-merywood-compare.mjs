// Tablet source-parity evidence (769-1200): every BIO-A section next to the SAME Merywood section
// (live merywood.com with the pinned owner-supplied main.css/main.js, as the deep guard does) at the same
// width, top-aligned, plus geometry/typography numbers. Merywood | BIO-A VI | BIO-A EN per row.
// Usage: node tests/tablet-merywood-compare.mjs <bioaDist> <outDir>   Env: TMC_WIDTHS, TMC_PAGES (csv of keys)
import { chromium } from "playwright";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createDistServer } from "../tools/serve-dist.mjs";

const [dist, OUT] = process.argv.slice(2); mkdirSync(OUT, { recursive: true });
const PIN = process.env.BIOA_REF_PIN_DIR || "D:/BIOA_WORKSPACE/_source_bundle/p0b1-v1";
const pinned = [[/merywood\.com\/wp-content\/themes\/mery-wood\/assets\/css\/main\.css/, readFileSync(join(PIN, "runtime", "main.txt")), "text/css"],
  [/merywood\.com\/wp-content\/themes\/mery-wood\/assets\/js\/main\.js/, readFileSync(join(PIN, "runtime", "main.js")), "text/javascript"]];
const PAGES = { home: ["/", "/"], about: ["/about/", "/about/"], cosmetics: ["/contract-manufacturing-cosmetics/", "/contract-manufacturing-cosmetics/"],
  services: ["/dich-vu-khac/", "/hotel-spa-cosmetics/"], blog: ["/blog/", "/blog/"], post: ["/blog/gia-cong-kem-tri-tham-nhu-hoa-giai-phap-lam-hong-vung-nhay-cam-chuyen-sau/", "/blog/what-affects-moq-in-supplement-manufacturing/"],
  contacts: ["/contacts/", "/contacts/"] };
const WIDTHS = (process.env.TMC_WIDTHS || "769,834,1024,1200").split(",").map(Number);
const keys = (process.env.TMC_PAGES || Object.keys(PAGES).join(",")).split(",");
const server = createDistServer(dist); await new Promise(r => server.listen(0, "127.0.0.1", r));
const LOCAL = "http://127.0.0.1:" + server.address().port;
const browser = await chromium.launch({ headless: true, ...(process.env.BIOA_CHROME_PATH ? { executablePath: process.env.BIOA_CHROME_PATH } : {}) });
const VH = 1100;

async function open(url, w, ref){
  const page = await browser.newPage({ viewport: { width: w, height: VH } });
  // TMC_PIN=1 pins the owner-supplied runtime; default = live merywood.com as the owner views it (its live HTML changed after the pin)
  if (ref && process.env.TMC_PIN === "1") for (const [re, body, type] of pinned) await page.route(re, r => r.fulfill({ status: 200, contentType: type, body }));
  await page.route("**/*", r => r.request().method() !== "GET" || /googletagmanager|yandex|dashly|geojs|challenges\.cloudflare|mc\.yandex|hotjar|clarity/.test(r.request().url()) ? r.abort() : r.fallback());
  await page.goto(url, { waitUntil: "load", timeout: 90000 }).catch(() => {});
  await page.waitForTimeout(2500);
  for (const d of ["#mw-consent .mw-deny", ".mw-deny"]){ const b = page.locator(d).first(); if (await b.isVisible().catch(() => false)) await b.click().catch(() => {}); }
  await page.waitForTimeout(400);
  return page;
}
// sections: direct visible blocks of the main column; key = Merywood block classes (BIO-A classes ignored)
const listSections = page => page.evaluate(() => {
  const SECTIONS = () => {
    const keyOf = s => { const c = [...s.classList]; const k = c.filter(x => /^(block-|mwa-|contacts-|blog-|post-|btp-|bb-|whatsapp)|^(desctop|mobile)$/.test(x)).sort().join(" "); return k || (c[0] || ""); };
    const vis = e => { const r = e.getBoundingClientRect(), c = getComputedStyle(e); return r.width > 0 && r.height > 20 && c.display !== "none" && c.visibility !== "hidden"; };
    const all = [...document.querySelectorAll("section")].filter(s => !s.closest("header,footer,#get-a-quote,.bioa-contact-fab") && vis(s) && keyOf(s));
    return all.filter(s => !all.some(o => o !== s && o.contains(s))).map(s => ({ el: s, key: keyOf(s) }));
  };
  const vis = e => { const r = e.getBoundingClientRect(), c = getComputedStyle(e); return r.width > 0 && r.height > 20 && c.display !== "none" && c.visibility !== "hidden"; };
  const out = [];
  for (const { el: s, key } of SECTIONS()){
    const r = s.getBoundingClientRect();
    const fs = []; s.querySelectorAll("*").forEach(e => { if (!vis(e)) return; if ([...e.childNodes].some(n => n.nodeType === 3 && n.data.trim().length > 2)){ fs.push(parseFloat(getComputedStyle(e).fontSize)); } });
    fs.sort((a, b) => a - b);
    out.push({ key, h: Math.round(r.height), fsMin: fs[0] || 0, fsMed: fs[Math.floor(fs.length / 2)] || 0, fsMax: fs[fs.length - 1] || 0, overflow: s.scrollWidth > s.clientWidth + 1 });
  }
  return { sections: out, docOverflow: Math.max(document.documentElement.scrollWidth, (document.querySelector(".scroll-content") || document.body).scrollWidth) - innerWidth };
});
async function shot(page, key, idx, file){
  const clip = await page.evaluate(([key, idx]) => {
    const SECTIONS = () => {
      const keyOf = s => { const c = [...s.classList]; const k = c.filter(x => /^(block-|mwa-|contacts-|blog-|post-|btp-|bb-|whatsapp)|^(desctop|mobile)$/.test(x)).sort().join(" "); return k || (c[0] || ""); };
      const vis = e => { const r = e.getBoundingClientRect(), c = getComputedStyle(e); return r.width > 0 && r.height > 20 && c.display !== "none" && c.visibility !== "hidden"; };
      const all = [...document.querySelectorAll("section")].filter(s => !s.closest("header,footer,#get-a-quote,.bioa-contact-fab") && vis(s) && keyOf(s));
      return all.filter(s => !all.some(o => o !== s && o.contains(s))).map(s => ({ el: s, key: keyOf(s) }));
    };
    const all = SECTIONS().filter(x => x.key === key).map(x => x.el);
    const s = all[idx]; if (!s) return null;
    const sb = window.Scrollbar?.getAll?.()[0]; const top = s.getBoundingClientRect().top;
    if (sb){ sb.setPosition(0, Math.max(0, top + sb.offset.y - 60)); } else window.scrollTo(0, top + scrollY - 60);
    return true;
  }, [key, idx]);
  if (!clip) return null;
  await page.waitForTimeout(1300);
  const box = await page.evaluate(([key, idx]) => {
    const SECTIONS = () => {
      const keyOf = s => { const c = [...s.classList]; const k = c.filter(x => /^(block-|mwa-|contacts-|blog-|post-|btp-|bb-|whatsapp)|^(desctop|mobile)$/.test(x)).sort().join(" "); return k || (c[0] || ""); };
      const vis = e => { const r = e.getBoundingClientRect(), c = getComputedStyle(e); return r.width > 0 && r.height > 20 && c.display !== "none" && c.visibility !== "hidden"; };
      const all = [...document.querySelectorAll("section")].filter(s => !s.closest("header,footer,#get-a-quote,.bioa-contact-fab") && vis(s) && keyOf(s));
      return all.filter(s => !all.some(o => o !== s && o.contains(s))).map(s => ({ el: s, key: keyOf(s) }));
    };
    const all = SECTIONS().filter(x => x.key === key).map(x => x.el);
    const r = all[idx].getBoundingClientRect(); const y = Math.max(0, r.y);
    return { x: 0, y, width: innerWidth, height: Math.max(40, Math.min(innerHeight, r.bottom) - y) };
  }, [key, idx]);
  await page.screenshot({ path: file, clip: box });
  return file;
}
const report = [];
const jobs = keys.flatMap(k => WIDTHS.map(w => [k, w]));
const POOL = +(process.env.TMC_POOL || 4);
async function runJob([k, w]){
  const [bioaRoute, mwRoute] = PAGES[k];
  const pm = await open("https://merywood.com" + mwRoute, w, true);
  const pv = await open(LOCAL + bioaRoute, w, false);
  const pe = await open(LOCAL + "/en" + bioaRoute, w, false);
  const [sm, sv, se] = [await listSections(pm), await listSections(pv), await listSections(pe)];
  const rows = [];
  const seen = {};
  for (const s of sv.sections){
    const i = seen[s.key] = (seen[s.key] ?? -1) + 1;
    // live Merywood renders one responsive section where BIO-A keeps the source desctop/mobile pair
    const bare = s.key.replace(/ ?\b(desctop|mobile)\b/g, "").trim();
    let mKey = s.key, mi = sm.sections.filter(x => x.key === s.key)[i];
    if (!mi && /desctop/.test(s.key)){ mi = sm.sections.filter(x => x.key === bare)[0]; mKey = bare; }
    const ei = se.sections.filter(x => x.key === s.key)[i];
    const base = `${k}-${w}-${String(rows.length + 1).padStart(2, "0")}-${s.key.replace(/\W+/g, "_")}`;
    rows.push({ key: s.key, mw: mi || null, vi: s, en: ei || null,
      shots: { mw: mi ? await shot(pm, mKey, mKey === s.key ? i : 0, join(OUT, base + "-mw.png")) : null, vi: await shot(pv, s.key, i, join(OUT, base + "-vi.png")), en: ei ? await shot(pe, s.key, i, join(OUT, base + "-en.png")) : null } });
  }
  const mwOnly = sm.sections.filter(x => !sv.sections.some(y => y.key === x.key || y.key.replace(/ ?\b(desctop|mobile)\b/g, "").trim() === x.key)).map(x => x.key);
  report.push({ page: k, w, docOverflow: { mw: sm.docOverflow, vi: sv.docOverflow, en: se.docOverflow }, mwOnly, rows });
  for (const p of [pm, pv, pe]) await p.close();
  console.log(k, w, "sections", rows.length, "mw-only", mwOnly.join(",") || "-", "overflow vi/en", sv.docOverflow, se.docOverflow);
  for (const r of rows) console.log("   ", k, w, r.key.padEnd(34), "h mw/vi/en", r.mw?.h ?? "-", r.vi.h, r.en?.h ?? "-", "| fs med mw/vi/en", r.mw?.fsMed ?? "-", r.vi.fsMed, r.en?.fsMed ?? "-", "| fs min", r.mw?.fsMin ?? "-", r.vi.fsMin, r.en?.fsMin ?? "-");
}
// each job loads its own fresh pages at a fixed width (no resize), so jobs are independent
let next = 0;
await Promise.all(Array.from({ length: POOL }, async () => { while (next < jobs.length){ const j = jobs[next++]; try { await runJob(j); } catch (e){ console.log("JOB ERROR", j.join(" "), e.message.split("\n")[0]); } } }));
report.sort((a, b) => keys.indexOf(a.page) - keys.indexOf(b.page) || a.w - b.w);
// contact sheets per page x width
const sheetPage = await browser.newPage({ viewport: { width: 1800, height: 800 } });
for (const rep of report){
  const cellW = 560;
  const img = f => f ? `<img src="data:image/png;base64,${readFileSync(f).toString("base64")}" style="width:${cellW}px;display:block">` : `<div style="width:${cellW}px;color:#999">—</div>`;
  const html = `<html><body style="margin:0;font:13px Arial"><h3 style="margin:6px">${rep.page} @${rep.w} — Merywood (${process.env.TMC_PIN === "1" ? "pinned runtime" : "live merywood.com"}) | BIO-A VI | BIO-A EN</h3><table style="border-collapse:collapse">` +
    rep.rows.map(r => `<tr><td colspan=3 style="padding:4px 4px 0;font-weight:bold">${r.key} — height ${r.mw?.h ?? "—"} / ${r.vi.h} / ${r.en?.h ?? "—"} px · median text ${r.mw?.fsMed ?? "—"} / ${r.vi.fsMed} / ${r.en?.fsMed ?? "—"} px</td></tr><tr>${["mw", "vi", "en"].map(c => `<td style="vertical-align:top;padding:3px;border:1px solid #ccc">${img(r.shots[c])}</td>`).join("")}</tr>`).join("") + `</table></body></html>`;
  await sheetPage.setContent(html); await sheetPage.waitForTimeout(300);
  await sheetPage.screenshot({ path: join(OUT, `SHEET-${rep.page}-${rep.w}.png`), fullPage: true });
}
await browser.close(); server.close();
writeFileSync(join(OUT, "tablet-compare.json"), JSON.stringify(report, null, 1));
console.log("sheets:", report.length);
