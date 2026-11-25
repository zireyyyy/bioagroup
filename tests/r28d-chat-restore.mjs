// R28d CHAT-RESTORE-2 (owner FAIL 2026-11-21 on the R28b hotline link): the consultation popup's bottom row is the
// owner-approved CHAT-C4B/C7 form again. Browser checks, Desktop/Tablet/Mobile x VI/EN:
//   * one text input + inset round send button; the composer is a form, never a tel: link;
//   * typing + Enter and typing + clicking Send post a user bubble (text only, XSS payload stays text) and, without
//     the chat API flag, an honest local reply after ~320 ms ("not sent to Bio-A") with ONE hand-off link:
//     Zalo on VI pages, Telegram on EN pages (bioa-business.mjs URLs, new tab, rel noopener); no navigation,
//     no dialog, no tel: chooser, no request to /api/chat or /api/lead; empty input sends nothing; the send button
//     is disabled while a reply is pending (no double send);
//   * with the API flag (data-chat-api="1", injected here by rewriting the served HTML) the form posts the v1
//     contract to /api/chat (answered by a route stub, nothing leaves the browser): ok:true shows the reply as text
//     (+ hand-off link when handoff:true), a 503/429/invalid body shows the honest error reply with the hand-off link;
//   * Esc still closes the panel; focus stays usable (input focus after open).
// Usage: node tests/r28d-chat-restore.mjs <baseUrl> [--engine chromium|webkit]
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const pw = require("playwright");
const args = process.argv.slice(2);
const opt = (k) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : null; };
const base = (args[0] && !args[0].startsWith("--") ? args[0] : "http://127.0.0.1:4173").replace(/\/$/, "");
const engine = opt("--engine") || "chromium";
const ZALO = "https://zalo.me/84779399379", TELEGRAM = "https://t.me/bioagroup";
const fails = []; let checks = 0;
const ok = (c, m) => { checks++; if (!c) fails.push(m); };
const browser = await pw[engine].launch(engine === "chromium" ? { executablePath: process.env.BIOA_CHROME_PATH || undefined } : {});

async function session(route, w, { api = null } = {}) {
  const ctx = await browser.newContext({ viewport: { width: w, height: w <= 768 ? 800 : 900 } });
  const page = await ctx.newPage();
  const net = [], dialogs = [];
  // Same-origin API calls and tel: navigations only (the Turnstile widget's own /cdn-cgi challenge POSTs are not chat traffic).
  page.on("request", (r) => { const u = r.url(); if (u.startsWith(base + "/api/") || /^tel:/.test(u)) net.push(r.method() + " " + u.replace(/^https?:\/\/[^/]+/, "")); });
  page.on("dialog", (d) => { dialogs.push(d.type()); d.dismiss().catch(() => {}); });
  page.on("load", () => page.evaluate(() => document.querySelector(".mw-deny")?.click()).catch(() => {}));
  if (api) {
    await page.route((u) => u.pathname === route, async (r) => {
      const res = await r.fetch(); const html = (await res.text()).replace('id="bioa-contact-fab">', 'id="bioa-contact-fab" data-chat-api="1">');
      await r.fulfill({ response: res, body: html });
    });
    await page.route("**/api/chat", async (r) => { api.requests.push(JSON.parse(r.request().postData() || "null")); const a = api.answers.shift(); await r.fulfill({ status: a.status, contentType: "application/json", body: a.body }); });
  }
  await page.goto(base + route, { waitUntil: "load" });
  await page.waitForTimeout(600);
  await page.locator(".bioa-contact-fab__toggle").click();
  await page.waitForTimeout(500);
  return { ctx, page, net, dialogs };
}
const replies = (page) => page.evaluate(() => [...document.querySelectorAll("#bioa-contact-fab .bioa-chat__messages .bioa-chat__msg")].map((m) => ({
  user: m.classList.contains("bioa-chat__msg--user"), text: m.querySelector(".bioa-chat__bubble")?.textContent || "",
  imgs: m.querySelectorAll(".bioa-chat__bubble img").length,
  links: [...m.querySelectorAll("a")].map((a) => ({ href: a.getAttribute("href"), target: a.target, rel: a.rel, w: a.getBoundingClientRect().width })),
})));

for (const route of ["/", "/en/", "/dich-vu-khac/", "/en/blog/"]) for (const w of [320, 390, 768, 834, 1024, 1440, 1920]) {
  const vi = !route.startsWith("/en/");
  const tag = `${route} @${w}`;
  const { ctx, page, net, dialogs } = await session(route, w);
  const st = await page.evaluate(() => { const c = document.querySelector("#bioa-contact-fab .bioa-chat__composer"), s = c?.querySelector(".bioa-chat__send"), i = c?.querySelector(".bioa-chat__input");
    const r = (e) => e && e.getBoundingClientRect(); const cr = r(c), sr = r(s);
    return { tag: c?.tagName, href: c?.getAttribute("href"), input: !!i, type: i?.type, ph: i?.placeholder, sendType: s?.type, h: cr?.height, inset: !!(sr && cr && sr.left >= cr.left && sr.right <= cr.right + 0.5 && sr.top >= cr.top - 0.5 && sr.bottom <= cr.bottom + 0.5), focus: document.activeElement === i,
      inPanel: (() => { const p = document.querySelector(".bioa-contact-fab__panel").getBoundingClientRect(); return cr && cr.left >= p.left - 0.5 && cr.right <= p.right + 0.5; })() }; });
  ok(st.tag === "FORM" && !st.href && st.input && st.type === "text" && st.sendType === "submit", `${tag} composer is not the approved form ${JSON.stringify(st)}`);
  ok(st.ph === (vi ? "Nhập tin nhắn..." : "Type your message..."), `${tag} placeholder ${st.ph}`);
  ok(Math.abs(st.h - 44) <= 1 && st.inset && st.inPanel, `${tag} shell geometry ${JSON.stringify(st)}`);
  ok(st.focus, `${tag} input not focused after open`);
  // Empty input sends nothing.
  await page.locator(".bioa-chat__send").click(); await page.waitForTimeout(450);
  ok((await replies(page)).length === 0, `${tag} empty input produced a message`);
  // Enter with an XSS payload.
  const payload = '<img src=x onerror="window.__bioaXss=1">';
  await page.locator(".bioa-chat__input").fill(payload);
  await page.locator(".bioa-chat__input").press("Enter");
  const pending = await page.evaluate(() => document.querySelector(".bioa-chat__send").disabled);
  await page.locator(".bioa-chat__input").fill("second"); await page.locator(".bioa-chat__input").press("Enter");
  await page.waitForTimeout(700);
  let m = await replies(page);
  ok(pending, `${tag} send not disabled while the reply is pending`);
  ok(m.length === 2 && m[0].user && m[0].text.includes(payload) && m[0].imgs === 0, `${tag} user bubble wrong / payload rendered as HTML ${JSON.stringify(m[0])}`);
  ok(!(await page.evaluate(() => window.__bioaXss)), `${tag} XSS payload executed`);
  const r1 = m[1];
  ok(r1 && !r1.user && (vi ? /chưa được gửi tới Bio-A Group/ : /has not been sent to Bio-A Group/).test(r1.text), `${tag} reply is not the honest local reply: ${r1?.text.slice(0, 90)}`);
  ok(r1 && r1.links.length === 1 && r1.links[0].href === (vi ? ZALO : TELEGRAM) && r1.links[0].target === "_blank" && /noopener/.test(r1.links[0].rel) && r1.links[0].w > 60, `${tag} hand-off link ${JSON.stringify(r1?.links)}`);
  // Click Send with text.
  await page.locator(".bioa-chat__input").fill(vi ? "Bio-A có gia công serum không?" : "Do you make serums?");
  await page.locator(".bioa-chat__send").click(); await page.waitForTimeout(700);
  m = await replies(page);
  ok(m.length === 4 && m[2].user && !m[3].user, `${tag} click-send did not add user + reply (${m.length})`);
  ok(page.url() === base + route, `${tag} navigated to ${page.url()}`);
  ok(dialogs.length === 0, `${tag} dialog opened: ${dialogs.join(",")}`);
  ok(net.length === 0, `${tag} network: ${net.join(" | ")}`);
  const of = await page.evaluate(() => { const p = document.querySelector(".bioa-contact-fab__panel"); return p.scrollWidth - p.clientWidth; });
  ok(of <= 1, `${tag} panel horizontal overflow ${of}`);
  await page.keyboard.press("Escape"); await page.waitForTimeout(350);
  ok(!(await page.evaluate(() => document.getElementById("bioa-contact-fab").classList.contains("is-open"))), `${tag} Esc did not close`);
  await ctx.close();
}

// API flag on (route stubs only).
for (const [route, w] of [["/", 390], ["/en/", 1440], ["/en/", 834]]) {
  const vi = route === "/";
  const tag = `api ${route} @${w}`;
  const api = { requests: [], answers: [
    { status: 200, body: JSON.stringify({ ok: true, mode: "live", reply: "<b>Bio-A</b> làm OEM/ODM.", handoff: true, handoff_channels: {}, session_id: "x", lead_created: false }) },
    { status: 503, body: JSON.stringify({ ok: false, status: "disabled", lead_created: false }) },
    { status: 429, body: JSON.stringify({ ok: false, status: "rate_limited", lead_created: false }) },
    { status: 200, body: "not json" },
  ] };
  const { ctx, page, net, dialogs } = await session(route, w, { api });
  for (const t of ["một", "hai", "ba", "bốn"]) { await page.locator(".bioa-chat__input").fill(t); await page.locator(".bioa-chat__input").press("Enter"); await page.waitForTimeout(600); }
  const m = (await replies(page)).filter((x) => !x.user);
  const q = api.requests[0] || {};
  ok(api.requests.length === 4 && q.locale === (vi ? "vi" : "en") && q.message === "một" && q.website === "" && /^[A-Za-z0-9_-]{16,64}$/.test(q.session_id || "") && Object.keys(q).sort().join() === "locale,message,session_id,website", `${tag} request contract ${JSON.stringify(api.requests)}`);
  ok(new Set(api.requests.map((r) => r.session_id)).size === 1, `${tag} session id not stable`);
  ok(m[0] && m[0].text.includes("<b>Bio-A</b> làm OEM/ODM.") && m[0].links.length === 1 && m[0].links[0].href === (vi ? ZALO : TELEGRAM), `${tag} ok reply ${JSON.stringify(m[0])}`);
  for (const i of [1, 2, 3]) ok(m[i] && (vi ? /trợ lý hiện chưa trả lời được.*chưa được gửi/ : /cannot answer right now.*has not been sent/).test(m[i].text) && m[i].links.length === 1, `${tag} error reply ${i} ${JSON.stringify(m[i])}`);
  ok(dialogs.length === 0 && !net.some((n) => /\/api\/lead/.test(n)), `${tag} dialog or lead request ${JSON.stringify({ dialogs, net })}`);
  await ctx.close();
}

await browser.close();
console.log(`r28d-chat-restore (${engine}): ${checks - fails.length}/${checks} PASS`);
if (fails.length) { console.log(fails.slice(0, 60).join("\n")); process.exit(1); }
