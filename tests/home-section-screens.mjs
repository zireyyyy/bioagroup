// Home full-section browser QA (real Chrome, VI/EN): every visible Home section is scrolled into view through
// smooth-scrollbar and captured at 390, 768/769, 834, 1024, 1200/1201, 1440, 1920 and at 125% browser zoom
// (1440 window -> 1152 CSS px, DPR 1.25, reached by a width change like a real zoom step).
// Checks per case: header/footer/one h1 present, every section rendered (height > 0), no horizontal overflow,
// Roadmap + How It Works slider height == card height, no page error except the known T2 CF7 rejection.
// Usage: node tests/home-section-screens.mjs [distDir] [label]
import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createDistServer } from "../tools/serve-dist.mjs";

const dist = process.argv[2] || "dist", label = process.argv[3] || "current";
const OUT = join(process.env.BIOA_REPORTS || "probe-reports", "home-sections-" + label); mkdirSync(OUT, { recursive: true });
const server = createDistServer(dist); await new Promise(r => server.listen(0, "127.0.0.1", r));
const base = "http://127.0.0.1:" + server.address().port;
const browser = await chromium.launch({ headless: true, ...(process.env.BIOA_CHROME_PATH ? { executablePath: process.env.BIOA_CHROME_PATH } : {}) });
const T2 = '{"code":"fetch_error","message":"You are probably offline."}';
const CASES = [390, 768, 769, 834, 1024, 1200, 1201, 1440, 1920].map(w => ({ name: String(w), w, dpr: 1 })).concat([{ name: "zoom125", w: 1152, dpr: 1.25, from: 1440 }]);
const rows = [];
for (const loc of ["vi", "en"]) for (const c of CASES){
  const ctx = await browser.newContext({ viewport: { width: c.from || c.w, height: 900 }, deviceScaleFactor: c.dpr });
  const page = await ctx.newPage();
  await page.addInitScript(() => { window.__rej = []; addEventListener("unhandledrejection", e => { try { window.__rej.push(JSON.stringify(e.reason)); } catch { window.__rej.push(String(e.reason)); } }); });
  const errors = [];
  page.on("pageerror", e => errors.push(String(e.message).slice(0, 160)));
  await page.route("**/*", r => r.request().method() !== "GET" || /googletagmanager|yandex|dashly|geojs|challenges\.cloudflare/.test(r.request().url()) ? r.abort() : r.fallback());
  const fail = [];
  try {
    await page.goto(base + (loc === "en" ? "/en/" : "/"), { waitUntil: "load", timeout: 70000 }); await page.waitForTimeout(1500);
    if (c.from){ await page.setViewportSize({ width: c.w, height: 720 }); await page.waitForTimeout(1500); }
    const deny = page.locator("#mw-consent .mw-deny").first(); if (await deny.isVisible().catch(() => false)) await deny.click();
    const info = await page.evaluate(() => {
      // position:fixed elements (Header) have offsetParent === null: use size + computed style instead
      const vis = e => { if (!e) return false; const r = e.getBoundingClientRect(), c = getComputedStyle(e); return r.width > 0 && r.height > 0 && c.display !== "none" && c.visibility !== "hidden"; };
      const secs = [...document.querySelectorAll(".page-main section, .page-main > .block")].filter(vis);
      const content = document.querySelector(".scroll-content") || document.body;
      const h = (sel, card) => { const s = [...document.querySelectorAll(sel)].find(vis); if (!s) return null; const wr = s.querySelector(".swiper-wrapper"); const st = s.querySelector(".swiper-slide-active .step") || s.querySelector(".step"); return [parseFloat(wr.style.height || "0"), st.getBoundingClientRect().height]; };
      return { header: vis(document.querySelector("header.header")), footer: !!document.querySelector("footer#footer"), h1: [...document.querySelectorAll("h1")].filter(vis).length,
        sections: secs.map(s => s.className.replace(/\s+/g, " ").trim()), empty: secs.filter(s => s.getBoundingClientRect().height < 20).map(s => s.className),
        overflow: Math.max(content.scrollWidth, document.documentElement.scrollWidth) - innerWidth, roadmap: h(".block-roadmap"), how: h(".block-how-works"),
        chat: vis(document.querySelector(".bioa-chat__bubble")) || !!document.querySelector(".bioa-chat__bubble") };
    });
    if (!info.header) fail.push("header hidden"); if (!info.footer) fail.push("footer missing"); if (info.h1 !== 1) fail.push("visible h1 " + info.h1);
    if (info.empty.length) fail.push("empty sections " + info.empty.join(","));
    if (info.overflow > 1) fail.push("horizontal overflow " + info.overflow + "px");
    for (const k of ["roadmap", "how"]) if (info[k] && Math.abs(info[k][0] - info[k][1]) > 1.5) fail.push(k + " slider " + info[k][0].toFixed(1) + " != card " + info[k][1].toFixed(1));
    if (!info.chat) fail.push("chat bubble missing");
    // capture each section
    let i = 0;
    for (const cls of info.sections){
      await page.evaluate(cls => { const s = [...document.querySelectorAll(".page-main section, .page-main > .block")].find(x => x.className.replace(/\s+/g, " ").trim() === cls && x.offsetParent !== null); const sb = window.Scrollbar?.getAll?.()[0]; if (s && sb) sb.setPosition(0, Math.max(0, s.getBoundingClientRect().top + sb.offset.y - 70)); }, cls);
      await page.waitForTimeout(700);
      await page.screenshot({ path: join(OUT, `${loc}-${c.name}-${String(++i).padStart(2, "0")}-${cls.replace(/[^a-z0-9]+/gi, "_").slice(0, 40)}.png`) });
    }
    await page.evaluate(() => { const sb = window.Scrollbar?.getAll?.()[0]; if (sb) sb.setPosition(0, sb.limit.y); }); await page.waitForTimeout(700);
    await page.screenshot({ path: join(OUT, `${loc}-${c.name}-${String(++i).padStart(2, "0")}-footer.png`) });
    const rej = await page.evaluate(() => window.__rej || []);
    const other = [...errors.filter(e => e !== "Object" && !e.includes("probably offline")), ...rej.filter(r => r !== T2)];
    if (other.length) fail.push("page errors " + other.join(" | "));
    rows.push({ loc, case: c.name, ok: !fail.length, fail, sections: info.sections.length, t2: rej.filter(r => r === T2).length });
  } catch (e){ fail.push("error " + e.message.split("\n")[0]); rows.push({ loc, case: c.name, ok: false, fail }); }
  console.log((fail.length ? "FAIL " : "ok   ") + loc + " " + c.name + (fail.length ? " :: " + fail.join(" | ") : ""));
  await ctx.close();
}
await browser.close(); server.close();
writeFileSync(join(OUT, "home-sections.json"), JSON.stringify(rows, null, 1));
const bad = rows.filter(r => !r.ok).length;
console.log(`Home sections (${label}): ${rows.length - bad}/${rows.length} PASS`);
process.exit(bad ? 1 : 0);
