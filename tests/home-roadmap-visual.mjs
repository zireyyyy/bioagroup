// Home Roadmap ("Từ Ý Tưởng Đến Thành Phẩm" / "From Idea to Launch") browser visual regression.
// Real Chrome, VI/EN, Desktop 1440/1920 + 1201/1200 boundary + Tablet 834/1024 + Mobile 390.
// For each case: settle, scroll the section into view through smooth-scrollbar, measure geometry, screenshot,
// then click next (x2) and prev (x1) and measure again. Fails on any geometry contract violation.
// Usage: node tests/home-roadmap-visual.mjs [distDir] [label]   Env: BIOA_REPORTS, RM_WIDTHS, RM_LOCALES
import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createDistServer } from "../tools/serve-dist.mjs";

const dist = process.argv[2] || "dist", label = (process.argv[3] || "current") + (process.env.RM_RESIZE ? "-resized" : "");
const OUT = join(process.env.BIOA_REPORTS || "probe-reports", "roadmap-" + label); mkdirSync(OUT, { recursive: true });
const WIDTHS = (process.env.RM_WIDTHS || "1920,1440,1201,1200,1024,834,769,768,390").split(",").map(Number);
const LOCALES = (process.env.RM_LOCALES || "vi,en").split(",");
const server = createDistServer(dist); await new Promise(r => server.listen(0, "127.0.0.1", r));
const base = "http://127.0.0.1:" + server.address().port;
const browser = await chromium.launch({ headless: true, ...(process.env.BIOA_CHROME_PATH ? { executablePath: process.env.BIOA_CHROME_PATH } : {}) });

const measure = page => page.evaluate(() => {
  const s = document.querySelector(".block-roadmap"); if (!s) return { missing: true };
  const r = e => { if (!e) return null; const b = e.getBoundingClientRect(); return { x: Math.round(b.x), y: Math.round(b.y), w: Math.round(b.width), h: Math.round(b.height) }; };
  const sw = s.querySelector(".swiper"), wr = s.querySelector(".swiper-wrapper");
  const inst = sw && sw.swiper;
  const slides = [...s.querySelectorAll(".swiper-slide")];
  const active = inst ? slides[inst.activeIndex] : slides[0];
  const step = active && active.querySelector(".step");
  const img = step && step.querySelector(".step__image"), info = step && step.querySelector(".step__info");
  const cs = e => e ? getComputedStyle(e) : null;
  return {
    section: r(s), swiper: r(sw), wrapper: r(wr), wrapperTransform: cs(wr)?.transform,
    swiperInit: !!inst, instWidth: inst ? Math.round(inst.width) : null, padL: sw ? parseFloat(getComputedStyle(sw).paddingLeft) : 0,
    wrapperH: wr ? parseFloat(wr.style.height || "0") : 0, cta: r(s.querySelector(".button-wrapper")),
    activeIndex: inst ? inst.activeIndex : null, slides: slides.length, slidesPerView: inst ? inst.params.slidesPerView : null,
    slideW: slides.map(x => Math.round(x.getBoundingClientRect().width)), slideH: slides.map(x => Math.round(x.getBoundingClientRect().height)),
    step: r(step), stepTransform: cs(step)?.transform, stepOpacity: cs(step)?.opacity, stepDisplay: cs(step)?.display, stepFlexDir: cs(step)?.flexDirection,
    stepAttrs: step ? [...step.attributes].map(a => a.name).filter(n => /motion|reveal|bioa|aos|data-/.test(n)) : [],
    stepsWithTransform: slides.map(x => cs(x.querySelector(".step"))?.transform).filter(t => t && t !== "none").length,
    image: r(img), info: r(info), imgEl: r(step && step.querySelector(".step__image img")),
    title: (step && step.querySelector(".step__title") || {}).textContent?.trim().slice(0, 60),
    number: (step && step.querySelector(".step__number") || {}).textContent?.trim(),
    nav: [...s.querySelectorAll(".swiper-button_left,.swiper-button_right")].map(b => ({ cls: b.className.replace(/\s+/g, " ").slice(0, 80), box: r(b), disabled: b.classList.contains("swiper-button-disabled") })),
    vw: innerWidth
  };
});

const scrollTo = async page => {
  await page.evaluate(() => {
    const s = document.querySelector(".block-roadmap"); const sb = window.Scrollbar?.getAll?.()[0];
    if (sb){ const top = s.getBoundingClientRect().top + sb.offset.y - 80; sb.setPosition(0, Math.max(0, top)); sb.update(); }
    else s.scrollIntoView({ block: "start" });
  });
  await page.waitForTimeout(1600);
};

async function shot(page, path){
  const b = await page.evaluate(() => { const r = document.querySelector(".block-roadmap").getBoundingClientRect(); return { y: Math.max(0, r.y), h: Math.min(innerHeight, r.bottom) - Math.max(0, r.y) }; });
  await page.screenshot({ path, clip: { x: 0, y: b.y, width: page.viewportSize().width, height: Math.max(50, b.h) } }).catch(() => {});
}

function check(m, w){
  const f = [];
  if (m.missing) return ["section missing"];
  if (!m.swiperInit) f.push("swiper not initialised");
  if (m.stepsWithTransform) f.push(m.stepsWithTransform + " .step nodes carry a transform (motion owns slider geometry)");
  if (m.stepOpacity !== "1") f.push("active step opacity " + m.stepOpacity);
  if (m.stepAttrs.some(a => /motion|reveal/.test(a))) f.push("step carries reveal attrs " + m.stepAttrs.join(","));
  // one slide per view at every width (Merywood source: slidesPerView 1)
  // Merywood .swiper has 1.3021vw side padding: each slide = Swiper content width, active step starts after the padding
  if (m.slideW.some(x => Math.abs(x - m.instWidth) > 2)) f.push("slide width != swiper content width " + m.slideW.join("/") + " vs " + m.instWidth);
  if (Math.abs(m.step.x - m.swiper.x - m.padL) > 2) f.push("active step offset x " + (m.step.x - m.swiper.x - m.padL));
  // swiperAutoHeight must equal the real card height (ROADMAP-R5: stale after a width change)
  if (Math.abs(m.wrapperH - m.step.h) > 1.5) f.push("slider height " + m.wrapperH.toFixed(1) + " != card height " + m.step.h);
  if (m.cta && m.cta.y < m.step.y + m.step.h - 1) f.push("CTA overlaps card by " + (m.step.y + m.step.h - m.cta.y) + "px");
  if (m.step.w > m.swiper.w + 2) f.push("step wider than swiper");
  if (w > 768){
    // desktop/tablet source geometry: image and info side by side, same top, inside the step
    if (!(m.image.x < m.info.x)) f.push("image not left of info");
    if (Math.abs(m.image.y - m.info.y) > 40) f.push("image/info vertical misalignment " + (m.image.y - m.info.y));
    if (m.image.x + m.image.w > m.info.x + 2) f.push("image overlaps info");
    if (m.imgEl.h < 150) f.push("image height " + m.imgEl.h);
  }
  if (m.info.x + m.info.w > m.swiper.x + m.swiper.w + 2) f.push("info overflows swiper");
  if (m.section.w > m.vw + 1) f.push("section overflows viewport");
  return f;
}

const rows = [];
for (const loc of LOCALES) for (const w of WIDTHS){
  // RESIZE=1: load at another width first, then resize to w (window resize / maximize / zoom / DevTools)
  const w0 = process.env.RM_RESIZE ? (w > 1000 ? 834 : 1440) : w;
  const page = await browser.newPage({ viewport: { width: w0, height: 1000 } });
  await page.route("**/*", r => r.request().method() !== "GET" ? r.abort() : (/googletagmanager|yandex|dashly|geojs|challenges\.cloudflare/.test(r.request().url()) ? r.abort() : r.fallback()));
  const fail = [], states = {};
  try {
    await page.goto(base + (loc === "en" ? "/en" : "") + (process.env.RM_ROUTE || "/"), { waitUntil: "load", timeout: 70000 });
    await page.waitForTimeout(1200);
    if (w0 !== w){ await page.setViewportSize({ width: w, height: 1000 }); await page.waitForTimeout(1500); }
    const deny = page.locator("#mw-consent .mw-deny").first(); if (await deny.isVisible().catch(() => false)) await deny.click();
    await scrollTo(page);
    states.settled = await measure(page);
    await shot(page, join(OUT, `${loc}-${w}-settled.png`));
    for (const [n, sel] of [["next1", ".swiper-button_right"], ["next2", ".swiper-button_right"], ["prev1", ".swiper-button_left"]]){
      await page.evaluate(sel => { const b = [...document.querySelectorAll(".block-roadmap " + sel)].find(x => x.offsetParent); b && b.click(); }, sel);
      await page.waitForTimeout(900);
      states[n] = await measure(page);
      if (n !== "next1") await shot(page, join(OUT, `${loc}-${w}-${n}.png`));
    }
    for (const [n, m] of Object.entries(states)) for (const x of check(m, w)) fail.push(n + ": " + x);
    if (states.next1.activeIndex !== 1 || states.next2.activeIndex !== 2 || states.prev1.activeIndex !== 1) fail.push("navigation index " + [states.next1.activeIndex, states.next2.activeIndex, states.prev1.activeIndex].join(">"));
    const hs = Object.values(states).map(m => m.step.h); if (Math.max(...hs) - Math.min(...hs) > 400) fail.push("step height jumps " + hs.join("/"));
  } catch (e){ fail.push("error " + e.message.split("\n")[0]); }
  rows.push({ loc, w, ok: !fail.length, fail, states });
  console.log((fail.length ? "FAIL " : "ok   ") + loc + " @" + w + (states.settled ? `  step ${states.settled.step?.w}x${states.settled.step?.h} img ${states.settled.image?.w}x${states.settled.image?.h} info ${states.settled.info?.w}x${states.settled.info?.h} swiper ${states.settled.swiper?.w}` : "") + (fail.length ? "\n     " + fail.join("\n     ") : ""));
  await page.close();
}
await browser.close(); server.close();
writeFileSync(join(OUT, "roadmap-visual.json"), JSON.stringify(rows, null, 1));
const bad = rows.filter(r => !r.ok).length;
console.log(`Home Roadmap visual (${label}): ${rows.length - bad}/${rows.length} PASS`);
process.exit(bad ? 1 : 0);
