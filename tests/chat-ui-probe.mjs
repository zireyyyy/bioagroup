// Chat UI probe (OWNER PASS design, still the local preview mock): real Chrome, VI/EN,
// Mobile/Tablet/Desktop. Opens the launcher, checks the R27 contact-CTA row (no simulated message box) and the
// honest intro, closes; asserts the panel stays inside the viewport, no horizontal overflow,
// no request to /api/chat (UI not wired, flag OFF) and no non-GET request at all.
// Read-only. Env: BIOA_CHROME_PATH, BIOA_REPORTS, CHAT_SHOTS=1 for screenshots.
import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createDistServer } from "../tools/serve-dist.mjs";

const OUT = process.env.BIOA_REPORTS || "p0a-reports";
mkdirSync(join(OUT, "chat-shots"), { recursive: true });
const ROUTES = ["/", "/en/", "/about/", "/en/contacts/", "/blog/an-gi-de-chong-lao-hoa-da/", "/en/contract-manufacturing-cosmetics/"];
const WIDTHS = [375, 390, 768, 769, 834, 1024, 1200, 1201, 1440, 1920];
const server = createDistServer(process.argv[2] || "dist"); await new Promise(r => server.listen(0, "127.0.0.1", r));
const base = "http://127.0.0.1:" + server.address().port;
const browser = await chromium.launch({ headless: true, ...(process.env.BIOA_CHROME_PATH ? { executablePath: process.env.BIOA_CHROME_PATH } : {}) });
const results = [];
for (const route of ROUTES) for (const width of WIDTHS){
  const page = await browser.newPage({ viewport: { width, height: width < 769 ? 812 : 900 } });
  const chatReq = [], nonGet = [];
  await page.route("**/*", r => { const q = r.request(); if (q.url().includes("/api/chat")) chatReq.push(q.url());
    if (q.method() !== "GET"){ nonGet.push(q.method() + " " + q.url()); return r.abort(); }
    if (/challenges\.cloudflare|google-analytics|googletagmanager|yandex|dashly|geojs/.test(q.url())) return r.abort();
    return r.fallback(); });
  const fail = [];
  try {
    await page.goto(base + route, { waitUntil: "load", timeout: 60000 }); await page.waitForTimeout(600);
    const deny = page.locator("#mw-consent .mw-deny").first(); if (await deny.isVisible().catch(() => false)) await deny.click();
    const toggle = page.locator("#bioa-contact-fab .bioa-contact-fab__toggle");
    if (!await toggle.isVisible()) fail.push("launcher not visible");
    const tb = await toggle.boundingBox(); if (tb && (tb.x < 0 || tb.y < 0 || tb.x + tb.width > width + 0.5)) fail.push("launcher outside viewport");
    await toggle.click(); await page.waitForTimeout(450);
    const st = await page.evaluate(() => { const root = document.getElementById("bioa-contact-fab"); const panel = root.querySelector(".bioa-contact-fab__panel"); const r = (panel || root).getBoundingClientRect();
      return { open: root.classList.contains("is-open"), r: [r.left, r.top, r.right, r.bottom], vw: innerWidth, vh: innerHeight, focus: document.activeElement && document.activeElement.classList.contains("bioa-chat__input"), overflow: document.documentElement.scrollWidth - innerWidth }; });
    if (!st.open) fail.push("panel did not open");
    if (st.r[0] < -0.5 || st.r[2] > st.vw + 0.5 || st.r[1] < -0.5 || st.r[3] > st.vh + 0.5) fail.push("panel outside viewport " + st.r.map(Math.round).join(","));
    if (st.overflow > 1) fail.push("horizontal overflow " + st.overflow);
    // R27: the message box only simulated a conversation (nothing was sent). The composer row now holds the two real
    // channels; the intro must say that the chat takes no online messages.
    const cta = await page.evaluate(() => { const root = document.getElementById("bioa-contact-fab"); const p = root.querySelector(".bioa-contact-fab__panel").getBoundingClientRect();
      return { input: !!root.querySelector(".bioa-chat__input,form"), links: [...root.querySelectorAll(".bioa-chat__cta")].map(a => { const r = a.getBoundingClientRect(); return { href: a.getAttribute("href"), w: r.width, inside: r.left >= p.left - 0.5 && r.right <= p.right + 0.5, clipped: a.scrollWidth > a.clientWidth + 1 }; }),
        intro: (root.querySelector(".bioa-chat__msg--intro .bioa-chat__bubble") || {}).textContent || "" }; });
    if (cta.input) fail.push("message box still present");
    if (cta.links.length !== 2 || !/zalo\.me/.test(cta.links[0].href) || !/^tel:\+84/.test(cta.links[1].href)) fail.push("contact CTAs " + JSON.stringify(cta.links));
    if (cta.links.some(l => !l.inside || l.clipped || l.w < 60)) fail.push("CTA clipped or outside panel " + JSON.stringify(cta.links));
    if (!/chưa nhận tin nhắn trực tuyến|does not take messages online/.test(cta.intro)) fail.push("intro does not say the chat is offline: " + cta.intro.slice(0, 80));
    if (process.env.CHAT_SHOTS) await page.screenshot({ path: join(OUT, "chat-shots", (route.replace(/\W+/g, "_") || "_") + "-" + width + ".png") });
    await page.locator("#bioa-contact-fab .bioa-chat__collapse").click(); await page.waitForTimeout(300);
    if (await page.evaluate(() => document.getElementById("bioa-contact-fab").classList.contains("is-open"))) fail.push("panel did not close");
  } catch (e){ fail.push("error " + e.message.split("\n")[0]); }
  if (chatReq.length) fail.push("/api/chat requested");
  if (nonGet.length) fail.push("non-GET " + nonGet.join(" | "));
  results.push({ route, width, ok: !fail.length, fail });
  console.log((fail.length ? "FAIL " : "ok   ") + route + " @" + width + (fail.length ? " :: " + fail.join(" | ") : ""));
  await page.close();
}
await browser.close(); server.close();
writeFileSync(join(OUT, "chat-ui-probe.json"), JSON.stringify(results, null, 2));
const bad = results.filter(r => !r.ok).length;
console.log(`Chat UI probe: ${results.length - bad}/${results.length} PASS`);
process.exit(bad ? 1 : 0);
