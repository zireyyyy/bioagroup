// R26 visual/geometry parity: a deployed site (Preview) vs a frozen baseline build served locally.
//   node tests/r26-visual-parity.mjs <baselineDistDir> <candidateBaseUrl> <outDir>
// 12 page families x VI/EN x 390/834/1440. For each: geometry of every top-level section of the content root
// (x, y, width, height after scrolling through the page) must match within 1 px; first-screen pixels compared in the
// browser (changed-pixel ratio). Screenshots saved as <family>-<lang>-<w>-{base,cand}.png for contact sheets.
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";
import { createDistServer } from "../tools/serve-dist.mjs";

const [baseDir, cand, out] = process.argv.slice(2);
if (!baseDir || !cand || !out){ console.error("usage: node tests/r26-visual-parity.mjs <baselineDist> <candidateBaseUrl> <outDir>"); process.exit(2); }
fs.mkdirSync(out, { recursive: true });
const FAM = [
  ["home", "/", "/en/"], ["about", "/about/", "/en/about/"], ["cosmetics", "/contract-manufacturing-cosmetics/", "/en/contract-manufacturing-cosmetics/"],
  ["services", "/dich-vu-khac/", "/en/dich-vu-khac/"], ["contacts", "/contacts/", "/en/contacts/"], ["blog", "/blog/", "/en/blog/"],
  ["blog-detail", "/blog/an-gi-de-chong-lao-hoa-da/", "/en/blog/an-gi-de-chong-lao-hoa-da/"], ["careers", "/tuyen-dung/", "/en/careers/"],
  ["career-detail", "/tuyen-dung/nhan-vien-kinh-doanh-b2b/", "/en/careers/b2b-sales-executive/"], ["privacy", "/privacy-policy/", "/en/privacy-policy/"],
  ["cookie", "/cookie-policy/", "/en/cookie-policy/"], ["404", "/bioa-r26-404-check/", "/en/bioa-r26-404-check/"]
];
const WIDTHS = [390, 834, 1440];
const server = createDistServer(baseDir);
await new Promise(r => server.listen(0, "127.0.0.1", r));
const local = "http://127.0.0.1:" + server.address().port;
const browser = await chromium.launch(process.env.BIOA_CHROME_PATH ? { executablePath: process.env.BIOA_CHROME_PATH } : {});

async function capture(url, w, file){
  const ctx = await browser.newContext({ viewport: { width: w, height: w < 768 ? 812 : 900 } });
  await ctx.addInitScript(() => { try { localStorage.setItem("bioa_cookie_decided_v1", "1"); localStorage.setItem("mw_consent_v2", JSON.stringify({ functional: true })); } catch {} });
  const page = await ctx.newPage();
  const resp = await page.goto(url, { waitUntil: "load", timeout: 60000 });
  await page.waitForTimeout(2500);
  await page.evaluate(() => document.querySelectorAll(".bioa-consent, .bioa-chat__teaser").forEach(e => e.style.visibility = "hidden"));
  await page.screenshot({ path: file });
  const geo = await page.evaluate(async () => {
    let root = document.querySelector("main");
    if (!root) return { sections: [], docH: document.documentElement.scrollHeight };
    while (root.children.length === 1 && root.children[0].tagName === "DIV") root = root.children[0];
    const sb = window.Scrollbar?.getAll?.()[0];
    const offY = () => sb ? sb.offset.y : scrollY;
    const out = [];
    for (const el of root.children){
      if (/^(STYLE|SCRIPT)$/.test(el.tagName)) continue;
      const r = el.getBoundingClientRect(), cs = getComputedStyle(el);
      if (cs.display === "none") { out.push({ tag: el.tagName, cls: el.className.toString().slice(0, 40), hidden: true }); continue; }
      out.push({ tag: el.tagName, cls: el.className.toString().slice(0, 40), x: Math.round(r.left), y: Math.round(r.top + offY()), w: Math.round(r.width), h: Math.round(r.height) });
    }
    return { sections: out, docH: sb ? Math.round(sb.limit.y + innerHeight) : document.documentElement.scrollHeight };
  });
  await ctx.close();
  return { status: resp?.status(), geo };
}
async function pixelDiff(a, b){
  const page = await browser.newPage();
  const d = await page.evaluate(async ([a, b]) => {
    const load = src => new Promise(r => { const i = new Image(); i.onload = () => r(i); i.src = src; });
    const [x, y] = await Promise.all([load(a), load(b)]);
    if (x.width !== y.width || x.height !== y.height) return { ratio: 1, note: "size differs" };
    const c = document.createElement("canvas"); c.width = x.width; c.height = x.height; const g = c.getContext("2d");
    g.drawImage(x, 0, 0); const A = g.getImageData(0, 0, c.width, c.height).data;
    g.clearRect(0, 0, c.width, c.height); g.drawImage(y, 0, 0); const B = g.getImageData(0, 0, c.width, c.height).data;
    let n = 0; for (let i = 0; i < A.length; i += 4) if (Math.abs(A[i] - B[i]) + Math.abs(A[i + 1] - B[i + 1]) + Math.abs(A[i + 2] - B[i + 2]) > 30) n++;
    return { ratio: n / (A.length / 4) };
  }, ["data:image/png;base64," + fs.readFileSync(a).toString("base64"), "data:image/png;base64," + fs.readFileSync(b).toString("base64")]);
  await page.close();
  return d;
}
const rows = [];
let fail = 0;
for (const [fam, vi, en] of FAM) for (const [lang, route] of [["vi", vi], ["en", en]]) for (const w of WIDTHS){
  const fb = path.join(out, `${fam}-${lang}-${w}-base.png`), fc = path.join(out, `${fam}-${lang}-${w}-cand.png`);
  const b = await capture(local + route, w, fb), c = await capture(cand.replace(/\/$/, "") + route, w, fc);
  const geoDiff = [];
  const n = Math.max(b.geo.sections.length, c.geo.sections.length);
  for (let i = 0; i < n; i++){
    const x = b.geo.sections[i], y = c.geo.sections[i];
    if (!x || !y){ geoDiff.push(`section ${i} missing`); continue; }
    for (const k of ["x", "y", "w", "h"]) if (Math.abs((x[k] ?? 0) - (y[k] ?? 0)) > 1){ geoDiff.push(`#${i} ${x.cls} ${k} ${x[k]}->${y[k]}`); break; }
  }
  const px = await pixelDiff(fb, fc);
  const statusOk = fam === "404" ? (b.status === 404 && c.status === 404) : (b.status === 200 && c.status === 200);
  const ok = statusOk && !geoDiff.length;
  if (!ok) fail++;
  rows.push({ fam, lang, w, status: [b.status, c.status], sections: b.geo.sections.length, docH: [b.geo.docH, c.geo.docH], geoDiff, pixelRatio: Number(px.ratio.toFixed(4)), ok });
}
await browser.close(); server.close();
fs.writeFileSync(path.join(out, "visual-parity.json"), JSON.stringify(rows, null, 1));
const lines = rows.map(r => `${r.ok ? "PASS" : "FAIL"} ${r.fam} ${r.lang} @${r.w}: status ${r.status.join("/")}, sections ${r.sections}, docH ${r.docH.join("/")}, first-screen changed pixels ${(r.pixelRatio * 100).toFixed(2)}%${r.geoDiff.length ? " | GEOMETRY: " + r.geoDiff.slice(0, 3).join("; ") : ""}`);
fs.writeFileSync(path.join(out, "visual-parity.txt"), lines.join("\n") + "\n");
console.log(lines.join("\n"));
console.log(fail ? `VISUAL PARITY: ${fail} FAIL of ${rows.length}` : `VISUAL PARITY: ${rows.length}/${rows.length} PASS`);
process.exit(fail ? 1 : 0);
