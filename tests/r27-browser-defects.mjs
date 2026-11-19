// R27 browser regression for F01 (Footer text inside the viewport at narrow widths / zoom 125%) and F02 (quote modal:
// Esc closes the active modal through its own close path, focus returns to the opener, Tab stays inside, scroll position
// kept, typed values kept, repeated open/close) plus the chat CTA row. No network request leaves for a lead.
// Usage: node tests/r27-browser-defects.mjs <base-url> [out.json]
import fs from "node:fs";
import { chromium } from "playwright";

const base = (process.argv[2] || "http://127.0.0.1:4173").replace(/\/$/, "");
const out = process.argv[3];
const exe = process.env.BIOA_CHROME_PATH;
const browser = await chromium.launch(exe ? { executablePath: exe } : {});
const results = [];
const dismissCookie = async page => { const d = page.locator(".mw-deny:visible").first(); if (await d.count()) { await d.click(); await page.waitForTimeout(300); } };
const record = (ok, name, detail) => { results.push({ ok, name, detail }); console.log((ok ? "PASS " : "FAIL ") + name + (detail ? " :: " + detail : "")); };

// ---- F01 Footer ----
const profiles = [[312, 1.25], [320, 1], [360, 1], [375, 1], [390, 1], [768, 1], [1024, 1], [1152, 1.25], [1440, 1], [1920, 1]];
for (const route of ["/", "/en/", "/en/careers/", "/en/blog/", "/about/", "/en/contacts/"]) for (const [w, dpr] of profiles) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, deviceScaleFactor: dpr });
  const page = await ctx.newPage();
  await page.route(/\/api\//, r => r.abort());
  await page.goto(base + route, { waitUntil: "load" });
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await page.waitForTimeout(500);
  const r = await page.evaluate(() => {
    const vw = document.documentElement.clientWidth, bad = [];
    const roots = [...document.querySelectorAll(".footer, footer, .bioa-mobile-footer-v2")];
    for (const root of roots) for (const el of root.querySelectorAll("a, p, span, li, h2, h3, h4, div")) {
      if (![...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())) continue;
      const cs = getComputedStyle(el); if (cs.display === "none" || cs.visibility === "hidden" || +cs.opacity === 0) continue;
      const rc = el.getBoundingClientRect(); if (rc.width < 1 || rc.height < 1) continue;
      let hidden = false; for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) { const s = getComputedStyle(p); if (s.display === "none" || s.visibility === "hidden") { hidden = true; break; } }
      if (hidden) continue;
      if (rc.right > vw + 0.5 || rc.left < -0.5) bad.push(el.textContent.trim().slice(0, 30) + " right=" + Math.round(rc.right));
    }
    return { vw, doc: document.documentElement.scrollWidth, bad: bad.slice(0, 5) };
  });
  record(!r.bad.length && r.doc <= r.vw, `F01 footer ${route} @${w}${dpr !== 1 ? "@" + dpr : ""}`, r.bad.length || r.doc > r.vw ? JSON.stringify(r) : "");
  await ctx.close();
}

// ---- F02 modal keyboard ----
for (const [route, w] of [["/", 390], ["/", 1440], ["/en/", 1440], ["/contacts/", 834], ["/en/contract-manufacturing-cosmetics/", 390]]) {
  let ctxRef = null;
  try {
  const ctx = ctxRef = await browser.newContext({ viewport: { width: w, height: 900 }, hasTouch: w < 769 });
  const page = await ctx.newPage();
  const leads = [];
  page.on("request", q => { if (/\/api\/lead/.test(q.url()) && q.method() === "POST") leads.push(q.url()); });
  await page.goto(base + route, { waitUntil: "load" });
  await page.waitForTimeout(400);
  await dismissCookie(page);
  const opener = page.locator('[modal="get-a-quote"]:visible').first();
  if (!(await opener.count())) { record(false, `F02 ${route} @${w}`, "no visible opener"); await ctx.close(); continue; }
  await opener.scrollIntoViewIfNeeded();
  await page.evaluate(() => window.scrollBy(0, 1));
  const y0 = await page.evaluate(() => window.scrollY);
  await opener.click();
  await page.waitForFunction(() => document.querySelector("#get-a-quote")?.classList.contains("open"), null, { timeout: 4000 });
  await page.waitForTimeout(250);
  const focusIn = await page.evaluate(() => document.querySelector("#get-a-quote").contains(document.activeElement));
  const field = page.locator("#get-a-quote input[type=text]:visible, #get-a-quote input:not([type=hidden]):not([type=checkbox]):visible").first();
  let typed = false;
  if (await field.count()) { await field.fill("R27 keyboard test"); typed = true; }
  // Tab cycling must stay inside the dialog.
  let escaped = false;
  for (let i = 0; i < 25; i++) { await page.keyboard.press("Tab"); if (!(await page.evaluate(() => document.querySelector("#get-a-quote").contains(document.activeElement)))) { escaped = true; break; } }
  await page.keyboard.press("Escape");
  await page.waitForTimeout(700);
  const after = await page.evaluate(() => {
    const m = document.querySelector("#get-a-quote");
    const a = document.activeElement;
    return { open: m.classList.contains("open"), display: getComputedStyle(m).display, focusOnOpener: !!(a && a.getAttribute && a.getAttribute("modal") === "get-a-quote"), y: window.scrollY, others: document.querySelectorAll(".modal.open").length };
  });
  // Re-open: the typed value is kept (Merywood close does not reset the form), then close again with Esc.
  await opener.click();
  await page.waitForFunction(() => document.querySelector("#get-a-quote")?.classList.contains("open"), null, { timeout: 4000 });
  const kept = typed ? await field.inputValue() : "";
  await page.waitForTimeout(200);
  await page.keyboard.press("Escape");
  await page.waitForTimeout(700);
  const closedAgain = await page.evaluate(() => !document.querySelector("#get-a-quote").classList.contains("open"));
  // Esc with no modal open does nothing harmful.
  await page.keyboard.press("Escape");
  const ok = focusIn && !escaped && !after.open && after.display === "none" && after.focusOnOpener && Math.abs(after.y - y0) <= 2 && after.others === 0 && (!typed || kept === "R27 keyboard test") && closedAgain && !leads.length;
  record(ok, `F02 modal ${route} @${w}`, JSON.stringify({ focusIn, tabEscaped: escaped, ...after, y0, kept: typed ? kept : "(no field)", closedAgain, leads: leads.length }));
  // Close button still works.
  await opener.click();
  await page.waitForFunction(() => document.querySelector("#get-a-quote")?.classList.contains("open"), null, { timeout: 4000 });
  await page.locator("#get-a-quote .modal__close").click();
  await page.waitForTimeout(700);
  record(await page.evaluate(() => !document.querySelector("#get-a-quote").classList.contains("open")), `F02 close button ${route} @${w}`, "");
  await ctx.close();
  } catch (e) { record(false, `F02 modal ${route} @${w}`, "error: " + String(e.message).split("\n")[0]); if (ctxRef) await ctxRef.close().catch(() => {}); }
}

// ---- Chat CTA row ----
for (const [route, w] of [["/", 390], ["/en/", 1440]]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(base + route, { waitUntil: "load" });
  await dismissCookie(page);
  await page.locator(".bioa-contact-fab__toggle").click();
  await page.waitForTimeout(600);
  const r = await page.evaluate(() => ({
    input: !!document.querySelector(".bioa-chat__input"),
    ctas: [...document.querySelectorAll(".bioa-chat__cta")].map(a => ({ href: a.getAttribute("href"), text: a.textContent.trim(), w: Math.round(a.getBoundingClientRect().width) })),
    intro: document.querySelector(".bioa-chat__msg--intro .bioa-chat__bubble")?.textContent.trim().slice(0, 90)
  }));
  const ok = !r.input && r.ctas.length === 2 && /zalo\.me/.test(r.ctas[0].href) && /^tel:\+84/.test(r.ctas[1].href) && r.ctas.every(c => c.w > 60);
  record(ok, `chat CTA ${route} @${w}`, JSON.stringify(r));
  await ctx.close();
}

await browser.close();
const failed = results.filter(r => !r.ok).length;
if (out) fs.writeFileSync(out, JSON.stringify({ base, results }, null, 1));
console.log(`R27 BROWSER DEFECTS: ${results.length - failed}/${results.length} PASS`);
process.exit(failed ? 1 : 0);
