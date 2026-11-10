// Home "Quy Trình Hợp Tác" / How It Works (.block-how-works.desctop) browser regression, real Chrome.
// Tablet 769–1200 (HOWWORKS-T1): Merywood 2-card desktop-fluid grid kept; both visible cards equal height;
// photo column = info column height (no blank band); full copy visible (no clamp cut); copy >= 12px.
// Desktop >=1201: source geometry unchanged (photo = info = 26.0417vw-driven row, source clamp 8).
// Also run after a width change (RESIZE=1). Usage: node tests/home-howworks-tablet.mjs [distDir]
import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createDistServer } from "../tools/serve-dist.mjs";

const dist = process.argv[2] || "dist";
const OUT = join(process.env.BIOA_REPORTS || "probe-reports", "howworks"); mkdirSync(OUT, { recursive: true });
const server = createDistServer(dist); await new Promise(r => server.listen(0, "127.0.0.1", r));
const base = "http://127.0.0.1:" + server.address().port;
const browser = await chromium.launch({ headless: true, ...(process.env.BIOA_CHROME_PATH ? { executablePath: process.env.BIOA_CHROME_PATH } : {}) });
// Desktop source geometry measured on the approved baseline (identical on Merywood): card height per width.
const DESKTOP = { 1201: 350, 1440: 420, 1920: 560 };
const rows = [];
for (const resize of [false, true]) for (const route of ["/", "/en/"]) for (const w of [769, 834, 1024, 1200, 1201, 1440, 1920]){
  const page = await browser.newPage({ viewport: { width: resize ? (w > 1000 ? 834 : 1440) : w, height: 1000 } });
  await page.route("**/*", r => r.request().method() !== "GET" || /googletagmanager|yandex|dashly|geojs/.test(r.request().url()) ? r.abort() : r.fallback());
  const fail = [];
  let m = null;
  try {
    await page.goto(base + route, { waitUntil: "load", timeout: 70000 }); await page.waitForTimeout(1500);
    if (resize){ await page.setViewportSize({ width: w, height: 1000 }); await page.waitForTimeout(1500); }
    m = await page.evaluate(() => {
      const s = [...document.querySelectorAll(".block-how-works")].find(x => x.offsetParent); if (!s) return null;
      const sw = s.querySelector(".swiper"), inst = sw.swiper;
      const vis = [...s.querySelectorAll(".swiper-slide")].filter(x => { const r = x.getBoundingClientRect(), p = sw.getBoundingClientRect(); return r.left >= p.left - 2 && r.right <= p.right + 2; });
      return { wrapperH: parseFloat(s.querySelector(".swiper-wrapper").style.height || "0"), perView: inst ? inst.params.slidesPerView : null,
        cards: vis.map(sl => { const st = sl.querySelector(".step"), info = st.querySelector(".step__info"), img = st.querySelector(".step__image"), t = st.querySelector(".step__text"), cs = getComputedStyle(t);
          const R = e => e.getBoundingClientRect();
          return { stepH: R(st).height, infoH: R(info).height, imgH: R(img).height, imgX: R(img).x, infoX: R(info).x, fs: parseFloat(cs.fontSize), cut: t.scrollHeight - t.clientHeight, clamp: cs.webkitLineClamp }; }) };
    });
    if (!m) fail.push("section missing");
    else {
      if (m.cards.length !== 2) fail.push("visible cards " + m.cards.length + " (Merywood desktop-fluid shows 2)");
      for (const c of m.cards){
        if (Math.abs(c.imgH - c.infoH) > 1.5) fail.push(`photo ${c.imgH.toFixed(0)} != info ${c.infoH.toFixed(0)}`);
        if (!(c.infoX < c.imgX)) fail.push("text/image order changed");
        if (c.cut > 1) fail.push("copy cut by " + c.cut + "px");
        if (w <= 1200 && c.fs < 12) fail.push("tablet copy " + c.fs + "px < 12px");
      }
      if (m.cards.length === 2 && Math.abs(m.cards[0].stepH - m.cards[1].stepH) > 1.5) fail.push("card heights differ " + m.cards.map(c => c.stepH.toFixed(0)).join("/"));
      if (m.cards[0] && Math.abs(m.wrapperH - m.cards[0].stepH) > 1.5) fail.push("slider height " + m.wrapperH.toFixed(1) + " != card " + m.cards[0].stepH.toFixed(1));
      if (DESKTOP[w] && m.cards[0] && Math.abs(m.cards[0].stepH - DESKTOP[w]) > 2) fail.push("desktop card height " + m.cards[0].stepH.toFixed(0) + " != source " + DESKTOP[w]);
    }
    if (!resize){
      await page.evaluate(() => { const s = [...document.querySelectorAll(".block-how-works")].find(x => x.offsetParent); const sb = window.Scrollbar?.getAll?.()[0]; if (sb) sb.setPosition(0, s.getBoundingClientRect().top + sb.offset.y - 90); });
      await page.waitForTimeout(900);
      await page.screenshot({ path: join(OUT, `${route === "/" ? "vi" : "en"}-${w}.png`) });
    }
  } catch (e){ fail.push("error " + e.message.split("\n")[0]); }
  rows.push({ resize, route, w, ok: !fail.length, fail, m });
  console.log((fail.length ? "FAIL " : "ok   ") + (resize ? "resized " : "") + route + " @" + w + (m && m.cards[0] ? `  card ${m.cards[0].stepH.toFixed(0)} info ${m.cards[0].infoH.toFixed(0)} photo ${m.cards[0].imgH.toFixed(0)} copy ${m.cards[0].fs}px` : "") + (fail.length ? " :: " + fail.join(" | ") : ""));
  await page.close();
}
await browser.close(); server.close();
writeFileSync(join(OUT, "howworks.json"), JSON.stringify(rows, null, 1));
const bad = rows.filter(r => !r.ok).length;
console.log(`Home How It Works: ${rows.length - bad}/${rows.length} PASS`);
process.exit(bad ? 1 : 0);
