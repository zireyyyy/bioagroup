// R28d-D1 LAYOUT QA (owner 2026-11-23): measure the RENDERED text boxes of a served build so a before/after comparison
// can prove that longer EN copy does not overflow, clip, collide, change card rows or break sliders.
// Usage: node tests/r28d-d1-layout-qa.mjs <baseUrl> <outDir> [--engine webkit] [--widths 320,390] [--routes /,/en/] [--shots]
// Writes <outDir>/measure-<engine>.json (+ section screenshots with --shots). Compare with tests/r28d-d1-layout-compare.mjs.
import fs from "node:fs";
import path from "node:path";
import { chromium, webkit } from "playwright";

const args = process.argv.slice(2);
const opt = (n, d) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : d; };
const [base, outDir] = args;
const engineName = opt("--engine", "chromium");
const WIDTHS = opt("--widths", "320,375,390,428,768,769,834,1024,1152,1200,1440,1920").split(",").map(Number);
const ROUTES = opt("--routes", "/,/en/,/about/,/en/about/,/contract-manufacturing-cosmetics/,/en/contract-manufacturing-cosmetics/").split(",");
const SHOTS = args.includes("--shots");
const SHOT_WIDTHS = new Set([320, 390, 834, 1024, 1440]);
// Sections whose copy D1 changes (screenshots); every other text box on the page is measured too.
const SHOT_SECTIONS = [".block-title", ".block-why-choose-us", ".block-we-produce", ".bioa-produce-mobile-clean", ".block-how-works",
  ".block-product-formats", ".block-right-choice", ".block-roadmap", ".mwa-produce", ".bioa-cosmetics-categories", ".block-we-conduct"];
fs.mkdirSync(outDir, { recursive: true });
const browser = await (engineName === "webkit" ? webkit : chromium).launch(engineName === "chromium" && process.env.BIOA_CHROME_PATH ? { executablePath: process.env.BIOA_CHROME_PATH } : {});
const out = { meta: { base, engine: engineName, widths: WIDTHS, routes: ROUTES, at: new Date().toISOString() }, pages: [] };

// Section screenshots. On Desktop/Tablet the page scrolls inside Smooth Scrollbar (transform-based), so element
// screenshots must scroll through that instance; a tall viewport keeps whole sections in one frame.
async function sectionShots(route, width){
  const ctx = await browser.newContext({ viewport: { width, height: 2400 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto(base + route, { waitUntil: "load", timeout: 90000 });
  await page.evaluate(() => document.querySelector(".mw-deny")?.click()).catch(() => {});
  await page.addStyleTag({ content: "[data-bioa-aos]{opacity:1!important;transform:none!important;transition:none!important}" });
  await page.evaluate(() => document.fonts && document.fonts.ready); await page.waitForTimeout(600);
  const files = [];
  fs.mkdirSync(path.join(outDir, "shots"), { recursive: true });
  for (const sel of SHOT_SECTIONS){
    const rect = await page.evaluate(async (sel) => {
      const el = [...document.querySelectorAll(sel)].find(e => { const b = e.getBoundingClientRect(); return b.width > 0 && b.height > 0 && getComputedStyle(e).display !== "none"; });
      if (!el) return null;
      const sb = window.Scrollbar && window.Scrollbar.getAll ? window.Scrollbar.getAll()[0] : null;
      if (sb) sb.scrollIntoView(el, { alignToTop: true, offsetTop: 100, onlyScrollIfNeeded: false }); else { el.scrollIntoView({ block: "start" }); scrollBy(0, -90); }
      await new Promise(r => setTimeout(r, 450));
      const b = el.getBoundingClientRect();
      return { x: Math.max(0, b.x), y: Math.max(0, b.y), width: Math.min(b.width, innerWidth), height: Math.min(b.height, innerHeight - Math.max(0, b.y)) };
    }, sel);
    if (!rect || rect.height < 4) continue;
    const file = `${engineName}-${route.replace(/\//g, "_") || "_"}-${width}-${sel.replace(/[^a-z0-9]+/gi, "")}.png`;
    await page.screenshot({ path: path.join(outDir, "shots", file), clip: rect }).catch(() => {});
    files.push(file);
  }
  await ctx.close();
  return files;
}

if (args.includes("--shots-only")){
  for (const route of ROUTES) for (const width of WIDTHS.filter(w => SHOT_WIDTHS.has(w))){ await sectionShots(route, width); process.stdout.write(`${route}@${width} `); }
  await browser.close(); console.log("\nshots only"); process.exit(0);
}

for (const route of ROUTES) for (const width of WIDTHS){
  const ctx = await browser.newContext({ viewport: { width, height: width < 769 ? 844 : 900 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto(base + route, { waitUntil: "load", timeout: 90000 });
  await page.evaluate(() => document.querySelector(".mw-deny")?.click()).catch(() => {});
  await page.addStyleTag({ content: "[data-bioa-aos]{opacity:1!important;transform:none!important;transition:none!important}" }); // reveal-on-scroll only; no layout change
  await page.evaluate(() => document.fonts && document.fonts.ready);
  await page.waitForTimeout(600);
  // Walk every slider to the end and back (interaction check), recording whether navigation still works.
  const sliders = await page.evaluate(async () => {
    const res = [];
    for (const [si, sw] of [...document.querySelectorAll(".swiper")].entries()){
      const inst = sw.swiper; if (!inst) continue;
      const sec = sw.closest("section")?.className.split(/\s+/).slice(0, 3).join(".") || "?";
      const n = inst.slides.length; let reached = 0;
      for (let k = 0; k < n + 1 && !inst.isEnd; k++){ inst.slideNext(0); reached = Math.max(reached, inst.activeIndex); }
      const endOk = inst.isEnd || n <= 1;
      inst.slideTo(0, 0);
      const heights = inst.slides.map(s => Math.round(s.getBoundingClientRect().height));
      res.push({ si, sec, slides: n, reached, endOk, heights, visible: sw.getBoundingClientRect().width > 0 });
    }
    return res;
  });
  const data = await page.evaluate(() => {
    const r = el => { const b = el.getBoundingClientRect(); return { x: Math.round(b.x), y: Math.round(b.y + scrollY), w: Math.round(b.width * 10) / 10, h: Math.round(b.height * 10) / 10 }; };
    const keyOf = el => { const p = []; let c = el; while (c && c !== document.body){ const par = c.parentElement; const idx = par ? [...par.children].indexOf(c) : 0; p.unshift(c.tagName.toLowerCase() + ":" + idx); c = par; } return p.join("/"); };
    const boxes = [];
    for (const el of document.querySelectorAll("body *")){
      if (el.closest("script,style,noscript,svg,template")) continue;
      const own = [...el.childNodes].filter(n => n.nodeType === 3).map(n => n.data).join(" ").replace(/\s+/g, " ").trim();
      if (!own) continue;
      const cs = getComputedStyle(el), b = el.getBoundingClientRect();
      const lhPx = cs.lineHeight === "normal" ? parseFloat(cs.fontSize) * 1.2 : parseFloat(cs.lineHeight);
      const hidden = b.width === 0 || b.height === 0 || cs.visibility === "hidden" || cs.display === "none";
      let clippedBy = null;
      if (!hidden){
        const self = (cs.overflowY !== "visible" && el.scrollHeight > el.clientHeight + 1) || (cs.overflowX !== "visible" && el.scrollWidth > el.clientWidth + 1) || (cs.webkitLineClamp && cs.webkitLineClamp !== "none" && el.scrollHeight > el.clientHeight + 1);
        if (self) clippedBy = "self";
        else for (let a = el.parentElement; a && a !== document.body; a = a.parentElement){
          const as = getComputedStyle(a); if (as.overflowX === "visible" && as.overflowY === "visible") continue;
          const ab = a.getBoundingClientRect(); const inSlider = !!el.closest(".swiper, .swiper-wrapper"); // off-screen slides are expected
          if (as.overflowY !== "visible" && (b.bottom > ab.bottom + 1 || b.top < ab.top - 1)){ clippedBy = "ancestor-y:" + a.className.toString().slice(0, 40); break; }
          if (!inSlider && as.overflowX !== "visible" && (b.right > ab.right + 1 || b.left < ab.left - 1)){ clippedBy = "ancestor-x:" + a.className.toString().slice(0, 40); break; }
        }
      }
      let collide = null;
      if (!hidden){
        const card = el.closest(".item, .step, .client, .swiper-slide, article, li, .card, .product") || el.parentElement;
        for (const o of card.querySelectorAll("img, button, .btn")){
          if (o.contains(el) || el.contains(o)) continue;
          const ob = o.getBoundingClientRect(); if (!ob.width || !ob.height) continue;
          const ix = Math.min(b.right, ob.right) - Math.max(b.left, ob.left), iy = Math.min(b.bottom, ob.bottom) - Math.max(b.top, ob.top);
          if (ix > 2 && iy > 2){ collide = o.tagName.toLowerCase() + "." + o.className.toString().slice(0, 30); break; }
        }
      }
      boxes.push({ key: keyOf(el), sec: (el.closest("section,header,footer,.bioa-contact-fab")?.className || "").toString().split(/\s+/).slice(0, 3).join("."), tag: el.tagName.toLowerCase(),
        text: own.slice(0, 70), len: own.length, rect: r(el), hidden, font: { size: cs.fontSize, family: cs.fontFamily.split(",")[0], weight: cs.fontWeight, lh: cs.lineHeight },
        lines: hidden ? 0 : Math.round(b.height / lhPx), sw: el.scrollWidth, cw: el.clientWidth, sh: el.scrollHeight, ch: el.clientHeight, clamp: cs.webkitLineClamp || "none", clippedBy, collide });
    }
    // Equal-height rows: direct children of grids/flex rows that look like cards.
    const rows = [];
    for (const g of document.querySelectorAll(".grid, .clients, .items, .swiper-wrapper, .bioa-produce-mobile-clean__inner, .mwa-produce__grid, .bioa-cosmetics-categories__grid")){
      const kids = [...g.children].filter(k => k.getBoundingClientRect().width > 0);
      if (kids.length < 2) continue;
      rows.push({ key: keyOf(g), sec: (g.closest("section")?.className || "").toString().split(/\s+/).slice(0, 3).join("."), heights: kids.map(k => Math.round(k.getBoundingClientRect().height)), tops: kids.map(k => Math.round(k.getBoundingClientRect().top + scrollY)) });
    }
    const sections = [...document.querySelectorAll("main section, section, header.header, footer")].map(s => ({ key: keyOf(s), cls: s.className.toString().split(/\s+/).slice(0, 3).join("."), rect: r(s) }));
    return { docW: document.documentElement.scrollWidth, vw: innerWidth, docH: document.documentElement.scrollHeight, boxes, rows, sections };
  });
  const shots = SHOTS && SHOT_WIDTHS.has(width) ? await sectionShots(route, width) : [];
  out.pages.push({ route, width, sliders, shots, ...data });
  await ctx.close();
  process.stdout.write(`${route}@${width} `);
}
await browser.close();
fs.writeFileSync(path.join(outDir, `measure-${engineName}.json`), JSON.stringify(out));
console.log(`\nmeasured ${out.pages.length} page/width combinations (${engineName})`);
