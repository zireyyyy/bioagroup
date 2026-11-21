// R28b owner fixes (CMS Preview review of R28 `4205597`).
//   SERVICE-CARD-ICON-1 / SERVICE-CARD-SPACE-1 — "Dịch Vụ Bio-A Group" cards on /dich-vu-khac/ (VI/EN), EVERY slide
//     (walked with the slider's own next button):
//       Mobile (<=768): BIO-A slot = number badge (Merywood source 37x37), monogram inside it and no larger than the
//       source 20x20 artwork box; no empty band under the copy (info height = tallest card content); all slides
//       the same height; image keeps the source 295/315 ratio.
//       Tablet/Desktop (>=769): unchanged — with --ref <url of the R28 build> every measured value must equal it.
//   CHAT-RESTORE-1 — consultation popup: the bottom row is ONE shell (owner-approved CHAT-C4B pill with the round
//     green button) linking to the hotline; Zalo appears once (icon row); no text input / no message box; opens by
//     click and by touch tap, closes with the collapse button, outside click and Esc (focus back on the avatar);
//     panel fully inside the viewport. With --chat-ref <url of the owner-approved build 9d044a7> the header, icon
//     row, message area and bottom shell must have the same geometry.
// Usage: node tests/r28b-owner-fix.mjs <baseUrl> [--ref <url>] [--chat-ref <url>] [--engine chromium|webkit]
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const pw = require("playwright");
const args = process.argv.slice(2);
const opt = (k) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : null; };
const base = (args[0] && !args[0].startsWith("--") ? args[0] : "http://127.0.0.1:4173").replace(/\/$/, "");
const ref = opt("--ref")?.replace(/\/$/, "");
const chatRef = opt("--chat-ref")?.replace(/\/$/, "");
const engine = opt("--engine") || "chromium";
// 312 and 1152 are a 390 px phone and a 1440 px laptop at 125% zoom.
const WIDTHS = [312, 320, 375, 390, 428, 768, 834, 1024, 1152, 1440, 1920];
const ROUTES = ["/dich-vu-khac/", "/en/dich-vu-khac/"];
const fails = []; let checks = 0;
const ok = (c, m) => { checks++; if (!c) fails.push(m); };
const close = (a, b, t = 1) => Math.abs(a - b) <= t;
const browser = await pw[engine].launch(engine === "chromium" ? { executablePath: process.env.BIOA_CHROME_PATH || undefined } : {});

async function newPage(w, extra = {}) {
  const ctx = await browser.newContext({ viewport: { width: w, height: w <= 768 ? 800 : 900 }, deviceScaleFactor: 2, ...extra });
  const page = await ctx.newPage();
  // Decline optional cookies through the banner's own button after load (the banner would cover the slider/chat).
  page.on("load", () => page.evaluate(() => document.querySelector(".mw-deny")?.click()).catch(() => {}));
  return { ctx, page };
}

async function measureCards(url, w) {
  const { ctx, page } = await newPage(w);
  await page.goto(url, { waitUntil: "load" });
  await page.waitForTimeout(900);
  const out = await page.evaluate(async () => {
    const sec = [...document.querySelectorAll(".block-how-works")].find((s) => s.querySelector(".step__icon img.bioa-why-icon-bioa") && s.getBoundingClientRect().width > 0 && getComputedStyle(s).display !== "none");
    if (!sec) return null;
    const r = (e) => { const b = e.getBoundingClientRect(); return { x: b.x, y: b.y, w: b.width, h: b.height }; };
    const slides = [...sec.querySelectorAll(".step")];
    const next = sec.querySelector(".swiper-button_right");
    const seen = [];
    for (let i = 0; i < slides.length; i++) {
      // Measure every slide in its rendered state; the slider is walked with its own control between measurements.
      const s = slides[i];
      const icon = s.querySelector(".step__icon"), img = icon.querySelector("img"), num = s.querySelector(".step__number"), info = s.querySelector(".step__info"), image = s.querySelector(".step__image");
      const kids = [...info.children];
      const cs = getComputedStyle(info);
      const content = kids.reduce((a, k) => a + k.getBoundingClientRect().height + parseFloat(getComputedStyle(k).marginBottom || 0), 0) + parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);
      seen.push({ icon: r(icon), img: r(img), num: r(num), info: r(info), image: r(image), step: r(s), content, nat: [img.naturalWidth, img.naturalHeight], fit: getComputedStyle(img).objectFit });
      if (next && !next.disabled) { next.click(); await new Promise((res) => setTimeout(res, 450)); }
    }
    return seen;
  });
  await ctx.close();
  return out;
}

for (const route of ROUTES) for (const w of WIDTHS) {
  const tag = `${route} @${w}`;
  const m = await measureCards(base + route, w);
  ok(m && m.length === 5, `${tag} expected 5 service cards, got ${m?.length}`);
  if (!m) continue;
  if (w <= 768) {
    const maxContent = Math.max(...m.map((x) => x.content));
    m.forEach((x, i) => {
      const t = `${tag} card ${i + 1}`;
      ok(close(x.icon.w, x.num.w) && close(x.icon.h, x.num.h), `${t} icon slot ${x.icon.w}x${x.icon.h} != number badge ${x.num.w}x${x.num.h}`);
      ok(close(x.icon.w, 37) && close(x.icon.h, 37), `${t} icon slot ${x.icon.w}x${x.icon.h} != source 37x37`);
      ok(x.img.w <= 20.5 && x.img.h <= 20.5, `${t} artwork box ${x.img.w}x${x.img.h} larger than source 20x20`);
      ok(x.fit === "contain", `${t} artwork not contained (${x.fit})`);
      ok(x.img.x >= x.icon.x - 0.5 && x.img.x + x.img.w <= x.icon.x + x.icon.w + 0.5 && x.img.y >= x.icon.y - 0.5 && x.img.y + x.img.h <= x.icon.y + x.icon.h + 0.5, `${t} artwork outside its slot`);
      ok(close(x.num.x - (x.icon.x + x.icon.w), 7), `${t} gap icon-number ${(x.num.x - x.icon.x - x.icon.w).toFixed(1)} != source 7px`);
      ok(x.info.h <= maxContent + 2, `${t} empty band: info ${x.info.h.toFixed(0)}px for ${maxContent.toFixed(0)}px of content`);
      ok(close(x.info.h, m[0].info.h) && close(x.step.h, m[0].step.h), `${t} card height differs from card 1`);
      ok(close(x.image.w / x.image.h, 295 / 315, 0.01), `${t} image ratio ${(x.image.w / x.image.h).toFixed(3)} != 295/315`);
    });
  } else if (ref) {
    const r0 = await measureCards(ref + route, w);
    const pick = (x) => [x.icon.w, x.icon.h, x.img.w, x.img.h, x.num.w, x.info.h, x.image.h, x.step.h];
    m.forEach((x, i) => ok(pick(x).every((v, k) => close(v, pick(r0[i])[k], 0.5)), `${tag} card ${i + 1} changed vs R28: ${pick(x).map((v) => v.toFixed(1))} vs ${pick(r0[i]).map((v) => v.toFixed(1))}`));
  }
}

// Consultation popup.
async function chat(url, w, how = "click", measureOnly = false) {
  const touch = how === "tap";
  const { ctx, page } = await newPage(w, touch ? { hasTouch: true, isMobile: engine === "chromium" } : {});
  await page.goto(url, { waitUntil: "load" });
  await page.waitForTimeout(700);
  const toggle = page.locator(".bioa-contact-fab__toggle");
  if (touch) await toggle.tap(); else await toggle.click();
  await page.waitForTimeout(600);
  const g = await page.evaluate(() => {
    const root = document.getElementById("bioa-contact-fab");
    const r = (s) => { const e = root.querySelector(s); if (!e) return null; const b = e.getBoundingClientRect(); return { x: b.x, y: b.y, w: b.width, h: b.height }; };
    const panel = root.querySelector(".bioa-contact-fab__panel");
    const comp = root.querySelector(".bioa-chat__composer");
    return {
      open: root.classList.contains("is-open"), vw: innerWidth, vh: innerHeight,
      panel: r(".bioa-contact-fab__panel"), head: r(".bioa-chat__head"), channels: r(".bioa-chat__channels-wrap"), history: r(".bioa-chat__history"), composer: r(".bioa-chat__composer"), send: r(".bioa-chat__send"),
      composerTag: comp?.tagName, composerHref: comp?.getAttribute("href"), composerText: comp?.textContent.trim(),
      inputs: root.querySelectorAll("input,textarea,form").length,
      zaloLinks: [...root.querySelectorAll(".bioa-contact-fab__panel a[href*='zalo.me']")].length,
      panelScroll: panel ? panel.scrollWidth > panel.clientWidth + 1 : false,
    };
  });
  if (measureOnly) { await ctx.close(); return g; }
  const tag = `chat ${url.replace(/^https?:\/\/[^/]+/, "")} @${w} ${how}`;
  ok(g.open, `${tag} did not open`);
  if (g.open) {
    // R28d CHAT-RESTORE-2 (owner override): the bottom shell is the approved C4B/C7 form again (input + send), not a tel: link.
    ok(g.composerTag === "FORM" && !g.composerHref, `${tag} bottom shell is not the approved form (${g.composerTag} ${g.composerHref})`);
    ok(g.inputs === 2, `${tag} expected one form + one text input, got ${g.inputs}`);
    ok(g.zaloLinks === 1, `${tag} Zalo appears ${g.zaloLinks}x in the panel (expected once, in the icon row)`);
    ok(g.composer && close(g.composer.h, 44), `${tag} bottom shell height ${g.composer?.h} != approved 44px`);
    ok(g.send && g.composer && g.send.x + g.send.w <= g.composer.x + g.composer.w + 0.5 && close(g.send.w, 34), `${tag} round button not inset in the shell`);
    ok(g.panel.x >= -0.5 && g.panel.y >= -0.5 && g.panel.x + g.panel.w <= g.vw + 0.5 && g.panel.y + g.panel.h <= g.vh + 0.5, `${tag} panel outside the viewport ${JSON.stringify(g.panel)}`);
    ok(!g.panelScroll, `${tag} panel scrolls horizontally`);
  }
  // Esc closes and returns focus to the avatar button.
  await page.keyboard.press("Escape");
  await page.waitForTimeout(350);
  const esc = await page.evaluate(() => ({ open: document.getElementById("bioa-contact-fab").classList.contains("is-open"), focus: document.activeElement?.classList.contains("bioa-contact-fab__toggle") }));
  ok(!esc.open && esc.focus, `${tag} Esc: open=${esc.open} focusOnAvatar=${esc.focus}`);
  if (esc.open) { await page.locator(".bioa-chat__collapse").click(); await page.waitForTimeout(400); }
  // Reopen, collapse button closes; reopen, outside click closes.
  await toggle.click(); await page.waitForTimeout(400);
  await page.locator(".bioa-chat__collapse").click(); await page.waitForTimeout(400);
  ok(!(await page.evaluate(() => document.getElementById("bioa-contact-fab").classList.contains("is-open"))), `${tag} collapse button did not close`);
  await toggle.click(); await page.waitForTimeout(400);
  await page.mouse.click(5, 300); await page.waitForTimeout(400);
  ok(!(await page.evaluate(() => document.getElementById("bioa-contact-fab").classList.contains("is-open"))), `${tag} outside click did not close`);
  await ctx.close();
  return g;
}

for (const route of ["/dich-vu-khac/", "/en/dich-vu-khac/", "/", "/en/blog/"]) for (const w of [320, 375, 390, 428, 768, 834, 1024, 1440, 1920]) {
  const g = await chat(base + route, w);
  if (chatRef && (w === 375 || w === 1440 || w === 834) && g.open) {
    const a = await chat(chatRef + route, w, "click", true);
    for (const k of ["panel", "head", "channels", "history"]) ok(a[k] && close(g[k].w, a[k].w) && close(g[k].h, a[k].h) && close(g[k].x, a[k].x) && close(g[k].y, a[k].y), `chat ${route} @${w} ${k} differs from approved: ${JSON.stringify(g[k])} vs ${JSON.stringify(a[k])}`);
    ok(a.composer && close(g.composer.h, a.composer.h, 1) && close(g.composer.w, a.composer.w, 1) && close(g.composer.y, a.composer.y, 1) && g.send && a.send && close(g.send.x, a.send.x, 1) && close(g.send.w, a.send.w, 1), `chat ${route} @${w} bottom shell differs from approved: ${JSON.stringify(g.composer)} vs ${JSON.stringify(a.composer)}`);
  }
}
for (const w of [375, 390]) await chat(base + "/dich-vu-khac/", w, "tap");

await browser.close();
console.log(`r28b-owner-fix (${engine}${ref ? ", ref" : ""}${chatRef ? ", chat-ref" : ""}): ${checks - fails.length}/${checks} PASS`);
if (fails.length) { console.log(fails.slice(0, 60).join("\n")); process.exit(1); }
