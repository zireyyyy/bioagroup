// R28 ICON-LIST-1 + CHAT-TEASER-M1 (owner iPhone report on /dich-vu-khac/).
//   1. In the process list (.block-right-choice) the BIO-A monogram slot has the same badge and artwork footprint as the
//      Merywood icons beside it on every width (it was a 42 px badge among 30 px badges on Mobile). Service cards keep
//      their own (larger) slot, consistent inside the card group.
//   2. On Mobile the chat suggestion bubble hides itself (8 s, or after ~1/3 screen of scrolling) so it no longer covers
//      the text; the avatar button stays. Tablet/Desktop keep the bubble until it is dismissed (unchanged).
// Usage: node tests/r28-mobile-icon-chat.mjs [baseUrl]   (default http://127.0.0.1:4173, a server for dist/)
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const base = (process.argv[2] || "http://127.0.0.1:4173").replace(/\/$/, "");
const ROUTES = ["/dich-vu-khac/", "/en/dich-vu-khac/", "/contract-manufacturing-cosmetics/", "/en/contract-manufacturing-cosmetics/"];
const WIDTHS = [320, 375, 390, 428, 768, 834, 1024, 1440, 1920];
const fails = [];
let checks = 0;
const ok = (cond, msg) => { checks++; if (!cond) fails.push(msg); };
const browser = await chromium.launch({ executablePath: process.env.BIOA_CHROME_PATH || undefined });

for (const route of ROUTES) for (const w of WIDTHS) {
  const page = await browser.newPage({ viewport: { width: w, height: 900 }, deviceScaleFactor: 2 });
  await page.goto(base + route, { waitUntil: "load" });
  await page.waitForTimeout(800);
  const g = await page.evaluate(() => {
    const group = (sel) => [...document.querySelectorAll(sel)].map((box) => {
      const art = box.querySelector("img,svg"); if (!art) return null;
      const b = box.getBoundingClientRect(), a = art.getBoundingClientRect();
      return { bioa: art.classList.contains("bioa-why-icon-bioa"), bw: b.width, bh: b.height, aw: a.width, ah: a.height, visible: b.width > 0 && b.height > 0 };
    }).filter((x) => x && x.visible);
    return { list: group(".block-right-choice .client__icon"), cards: group(".block-how-works .step__icon") };
  });
  const tag = route + " @" + w;
  const close = (a, b) => Math.abs(a - b) <= 1;
  if (g.list.length) {
    const bio = g.list.filter((x) => x.bioa), mw = g.list.filter((x) => !x.bioa);
    ok(bio.length > 0 || !route.includes("dich-vu-khac"), tag + " process list has no BIO-A slot");
    for (const x of bio) {
      ok(mw.every((m) => close(m.bw, x.bw) && close(m.bh, x.bh)), `${tag} list badge ${x.bw.toFixed(1)}x${x.bh.toFixed(1)} differs from siblings ${mw.map((m) => m.bw.toFixed(1)).join("/")}`);
      // Artwork size is the Mobile defect. Desktop/Tablet are owner-PASS and frozen: equal badges there, and the
      // portrait monogram is 27 px tall beside 22.5 px square Merywood glyphs at 1440 (recorded, not changed).
      const maxArt = Math.max(...mw.map((m) => Math.max(m.aw, m.ah)));
      if (w <= 768) ok(Math.max(x.aw, x.ah) <= maxArt + 1, `${tag} list artwork ${x.aw.toFixed(1)}x${x.ah.toFixed(1)} larger than siblings (${maxArt.toFixed(1)})`);
    }
  }
  if (g.cards.length > 1) {
    const b0 = g.cards[0];
    ok(g.cards.every((c) => close(c.bw, b0.bw) && close(c.bh, b0.bh)), `${tag} service-card badges differ: ${g.cards.map((c) => c.bw.toFixed(1)).join("/")}`);
  }
  await page.close();
}

// Chat teaser behaviour.
async function teaser(w, act) {
  const page = await browser.newPage({ viewport: { width: w, height: w <= 768 ? 800 : 900 }, deviceScaleFactor: 2 });
  await page.goto(base + "/dich-vu-khac/", { waitUntil: "load" });
  await page.waitForFunction(() => document.querySelector(".is-teaser"), null, { timeout: 9000 }).catch(() => {});
  const shown = await page.evaluate(() => !!document.querySelector(".is-teaser"));
  if (act === "scroll") { await page.mouse.wheel(0, 420); await page.waitForTimeout(900); }
  else await page.waitForTimeout(8600);
  const after = await page.evaluate(() => ({ teaser: !!document.querySelector(".is-teaser"), fab: !!document.querySelector("#bioa-contact-fab") && getComputedStyle(document.querySelector("#bioa-contact-fab")).display !== "none" }));
  await page.close();
  return { shown, ...after };
}
for (const w of [375, 390]) {
  const s = await teaser(w, "scroll");
  ok(s.shown, `mobile ${w}: teaser never appeared`);
  ok(s.shown && !s.teaser, `mobile ${w}: teaser still covers content after scrolling`);
  ok(s.fab, `mobile ${w}: contact button missing after the teaser hid`);
  const t = await teaser(w, "wait");
  ok(t.shown && !t.teaser, `mobile ${w}: teaser still visible 8 s after it appeared`);
}
for (const w of [834, 1440]) {
  const t = await teaser(w, "wait");
  ok(!t.shown || t.teaser, `${w}: teaser behaviour changed outside Mobile (hid by itself)`);
}
await browser.close();
console.log(JSON.stringify({ checks, fails: fails.length }));
for (const f of fails) console.log("FAIL " + f);
console.log("R28 mobile icon + chat teaser: " + (fails.length ? "FAIL" : "PASS"));
process.exit(fails.length ? 1 : 0);
