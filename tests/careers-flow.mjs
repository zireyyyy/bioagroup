// R24FD CAREERS-1 — browser check of the restored Careers pages on the built dist (VI /tuyen-dung/, EN /en/careers/):
// list -> filter -> card -> detail -> back, language switch, no Merywood identity/people/application box, owner-gated
// fields marked, no non-GET request, no page error. Widths 1440 / 834 / 390. Read-only; nothing is submitted.
import { chromium } from "playwright";
import { createDistServer } from "../tools/serve-dist.mjs";
import { CAREER_JOBS, careerPath } from "../bioa-careers.mjs";

const dist = process.env.CAREERS_DIST || "dist";
const server = createDistServer(dist);
await new Promise(r => server.listen(0, "127.0.0.1", r));
const base = "http://127.0.0.1:" + server.address().port;
const launch = { headless: true };
if (process.env.BIOA_CHROME_PATH) launch.executablePath = process.env.BIOA_CHROME_PATH;
const browser = await chromium.launch(launch);
const fails = []; let checks = 0;
const ok = (cond, msg) => { checks++; if (!cond) fails.push(msg); };

for (const lang of ["vi", "en"]) for (const width of [1440, 834, 390]){
  const ctx = await browser.newContext({ viewport: { width, height: 900 } });
  const page = await ctx.newPage();
  const errors = [], nonGet = [];
  page.on("pageerror", e => errors.push(e.message));
  // Third-party GETs load as on the real site (intl-tel-input, fonts, images). Every non-GET is blocked; only the
  // Turnstile widget's own challenge calls are not counted as a page request.
  await page.route("**/*", r => { const q = r.request(); if (q.method() !== "GET"){
      if (!/^https:\/\/challenges\.cloudflare\.com\//.test(q.url())) nonGet.push(q.method() + " " + q.url()); return r.abort(); }
    return r.fallback(); });
  const list = careerPath("/careers/", lang), tag = lang + "@" + width;
  await page.goto(base + list, { waitUntil: "load" });
  await page.waitForTimeout(600);
  const cards = await page.$$eval(".mwc-card", c => c.map(a => ({ href: a.getAttribute("href"), cat: a.dataset.cat, title: a.querySelector(".mwc-card__title")?.textContent.trim() })));
  ok(cards.length === 3, tag + " list shows 3 cards (" + cards.length + ")");
  ok(cards.every((c, i) => c.href === careerPath(CAREER_JOBS[i].route, lang)), tag + " card links point to the " + lang + " detail pages");
  const body = await page.evaluate(() => document.body.innerText);
  ok(!/merywood|estonia|linkedin|careers@|olga|alina/i.test(body), tag + " list has no Merywood identity text");
  ok(await page.$$eval('[data-owner-approval="required"]', n => n.length) === 3, tag + " pending fields marked on the 3 cards");
  // filter: R&D shows one card
  await page.evaluate(() => { const b = document.querySelector('.mwc-filter__pill[data-cat="rd"]'); if (b) b.click(); });
  await page.waitForTimeout(150);
  const shown = await page.$$eval(".mwc-card", c => c.filter(a => getComputedStyle(a).display !== "none").length);
  ok(shown === 1, tag + " filter R&D shows 1 card (" + shown + ")");
  await page.evaluate(() => document.querySelector('.mwc-filter__pill[data-cat=""]').click());
  // card -> detail -> back (navigate by the card href, as a click would; the page uses smooth-scrollbar)
  for (const [i, job] of CAREER_JOBS.entries()){
    await page.goto(base + cards[i].href, { waitUntil: "load" });
    await page.waitForTimeout(300);
    const d = await page.evaluate(() => ({ h1: document.querySelector(".mwc-single__title")?.textContent.trim(),
      back: document.querySelector(".mwc-back")?.getAttribute("href"), talk: !!document.querySelector(".mwc-talk"),
      sections: document.querySelectorAll(".mwc-single .mwc-section").length, gated: document.querySelectorAll('[data-owner-approval="required"]').length,
      cta: document.querySelector(".mwc-final .mwc-hrcard__email")?.getAttribute("href"), wts: document.querySelectorAll(".mwc-talk .mwc-wts li").length,
      hr: document.querySelectorAll(".mwc-hrgrid, .mwc-hrcard__photo, .mwc-hrcard__link").length, arrow: !!document.querySelector(".mwc-hero3__actions .btn__icon svg"), langs: [...document.querySelectorAll(".bioa-header-actions .bioa-lang a")].map(a => a.getAttribute("href")),
      canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href"), text: document.body.innerText }));
    ok(d.h1 && d.h1.toLowerCase() === job.t[lang].title.toLowerCase(), tag + " " + job.route + " title");
    ok(d.back === list, tag + " " + job.route + " back link");
    // R24OX CAREERS-ENDING-1: Merywood ending structure kept (final + .mwc-talk/.mwc-wts), staff cards removed.
    ok(d.talk && d.wts === 3 && d.hr === 0 && !/merywood|linkedin|olga|alina|€|salary from|careers@/i.test(d.text), tag + " " + job.route + " source ending with BIO-A text, no Merywood people/pay text");
    ok(d.sections === 3 && d.gated === 5, tag + " " + job.route + " 3 sections, 5 owner-gated parts (" + d.sections + "/" + d.gated + ")");
    ok(d.cta === "mailto:contact@bioagroup.vn", tag + " " + job.route + " ending e-mail row = BIO-A contact");
    ok(d.langs[0] === careerPath(job.route, "vi") && d.langs[1] === careerPath(job.route, "en"), tag + " " + job.route + " language switch");
    ok(d.canonical === "https://bioagroup.vn" + careerPath(job.route, lang), tag + " " + job.route + " canonical");
    await page.goto(base + d.back, { waitUntil: "load" });
    ok(new URL(page.url()).pathname === list, tag + " back returns to the list");
  }
  ok(!errors.length, tag + " page errors: " + errors.join(" | "));
  ok(!nonGet.length, tag + " non-GET requests: " + nonGet.join(" | "));
  await ctx.close();
}
await browser.close(); server.close();
for (const f of fails) console.log("FAIL", f);
console.log(`Careers flow: ${checks - fails.length}/${checks} checks PASS`);
if (fails.length) process.exit(1);
