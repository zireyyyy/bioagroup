// Evidence capture (not a gate): Roadmap + How It Works side by side for
//   Merywood (live merywood.com, EN source) | BIO-A OWNER PASS checkpoint d59f50d | BIO-A candidate.
// Same frame, same slider states: first slide, then after Next + animation (900 ms), at
// Roadmap 1920/1440/834/390 and How It Works 834/1024, VI/EN for BIO-A. Writes PNGs + contact sheets.
// Usage: node tests/home-compare-shots.mjs <approvedDist> <candidateDist> <outDir>
import { chromium } from "playwright";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createDistServer } from "../tools/serve-dist.mjs";

const [approved, candidate, OUT] = process.argv.slice(2);
mkdirSync(OUT, { recursive: true });
const serve = async d => { const s = createDistServer(d); await new Promise(r => s.listen(0, "127.0.0.1", r)); return s; };
const sa = await serve(approved), sc = await serve(candidate);
const SRC = { merywood: "https://merywood.com", approved: "http://127.0.0.1:" + sa.address().port, candidate: "http://127.0.0.1:" + sc.address().port };
const browser = await chromium.launch({ headless: true, ...(process.env.BIOA_CHROME_PATH ? { executablePath: process.env.BIOA_CHROME_PATH } : {}) });
const JOBS = [...[1920, 1440, 834, 390].map(w => ["roadmap", ".block-roadmap", w]), ...[834, 1024].map(w => ["howworks", ".block-how-works", w])];
const sheet = [];
for (const [name, sel, w] of JOBS) for (const loc of ["vi", "en"]){
  const row = { name, w, loc, cells: [] };
  for (const src of ["merywood", "approved", "candidate"]){
    if (src === "merywood" && loc === "vi"){ row.cells.push(null); continue; }
    const page = await browser.newPage({ viewport: { width: w, height: 1000 } });
    await page.route("**/*", r => r.request().method() !== "GET" || /googletagmanager|yandex|dashly|geojs|mc\.yandex/.test(r.request().url()) ? r.abort() : r.fallback());
    const cell = {};
    try {
      await page.goto(SRC[src] + (loc === "en" && src !== "merywood" ? "/en/" : "/"), { waitUntil: "load", timeout: 90000 });
      await page.waitForTimeout(2000);
      for (const d of ["#mw-consent .mw-deny", ".cky-btn-reject", "#cookie .mw-deny"]){ const b = page.locator(d).first(); if (await b.isVisible().catch(() => false)) await b.click().catch(() => {}); }
      const ok = await page.evaluate(sel => { const s = [...document.querySelectorAll(sel)].find(x => x.offsetParent); if (!s) return false; const sb = window.Scrollbar?.getAll?.()[0]; const top = s.getBoundingClientRect().top; if (sb) sb.setPosition(0, Math.max(0, top + sb.offset.y - 70)); else window.scrollTo(0, top + scrollY - 70); return true; }, sel);
      if (!ok) throw new Error("section not found");
      await page.waitForTimeout(1200);
      for (const st of ["first", "next"]){
        if (st === "next"){ await page.evaluate(sel => { const s = [...document.querySelectorAll(sel)].find(x => x.offsetParent); const b = [...s.querySelectorAll(".swiper-button_right")].find(x => x.offsetParent); b && b.click(); }, sel); await page.waitForTimeout(900); }
        const clip = await page.evaluate(sel => { const s = [...document.querySelectorAll(sel)].find(x => x.offsetParent); const r = s.getBoundingClientRect(); const y = Math.max(0, r.y); return { x: 0, y, width: innerWidth, height: Math.max(60, Math.min(innerHeight, r.bottom + 40) - y) }; }, sel);
        const f = `${name}-${w}-${loc}-${src}-${st}.png`;
        await page.screenshot({ path: join(OUT, f), clip });
        cell[st] = f;
      }
    } catch (e){ cell.error = e.message.split("\n")[0]; }
    row.cells.push(cell);
    await page.close();
  }
  sheet.push(row);
  console.log(name, w, loc, row.cells.map(c => c ? (c.error || "ok") : "-").join(" | "));
}
// contact sheets (one PNG per job/locale): columns Merywood | approved d59f50d | candidate R24, rows first/next
const page = await browser.newPage({ viewport: { width: 2400, height: 800 } });
for (const r of sheet){
  const img = f => f ? `<img src="data:image/png;base64,${readFileSync(join(OUT, f)).toString("base64")}">` : "<div class=na>—</div>";
  const cols = ["Merywood (EN source)", "BIO-A OWNER PASS d59f50d", "BIO-A R24 candidate"];
  const html = `<html><body style="margin:0;font:14px Arial;background:#fff"><h3 style="margin:8px">${r.name} @${r.w} ${r.loc.toUpperCase()}</h3><table style="border-collapse:collapse">` +
    `<tr><th></th>${cols.map(c => `<th style="padding:4px">${c}</th>`).join("")}</tr>` +
    ["first", "next"].map(st => `<tr><td style="padding:4px;writing-mode:vertical-rl">${st === "first" ? "slide 1" : "after Next + 900ms"}</td>${r.cells.map(c => `<td style="vertical-align:top;padding:4px;border:1px solid #ccc">${c && !c.error ? img(c[st]) : `<div style="width:200px">${c ? c.error : "n/a (Merywood has no VI)"}</div>`}</td>`).join("")}</tr>`).join("") +
    `</table><style>img{display:block;max-width:${r.w > 1000 ? 780 : 560}px;height:auto}</style></body></html>`;
  await page.setContent(html); await page.waitForTimeout(200);
  await page.screenshot({ path: join(OUT, `SHEET-${r.name}-${r.w}-${r.loc}.png`), fullPage: true });
}
await browser.close(); sa.close(); sc.close();
writeFileSync(join(OUT, "compare.json"), JSON.stringify(sheet, null, 1));
console.log("contact sheets:", sheet.length);
