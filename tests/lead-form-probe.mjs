// Lead form probe (quote modal, real Chrome, VI/EN, Mobile/Tablet/Desktop). NO request leaves the browser:
// /api/lead and /api/lead/config are answered by page.route mocks; every other non-GET is aborted.
// Scenarios: preview  = API locked like a public Preview host (middleware 503) -> error, never success;
//            reject   = server 200 {ok:false}                                  -> error;
//            limited  = server 429                                             -> rate-limit message;
//            saved    = server 200 {ok:true} (D1 write succeeded)              -> success, modal closes.
// The visitor may see "đã nhận / received" ONLY in "saved". Usage: node tests/lead-form-probe.mjs [fixedDistDir]
import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createDistServer } from "../tools/serve-dist.mjs";

const dist = process.argv[2] || "dist";
const OUT = process.env.BIOA_REPORTS || "probe-reports"; mkdirSync(OUT, { recursive: true });
const server = createDistServer(dist); await new Promise(r => server.listen(0, "127.0.0.1", r));
const base = "http://127.0.0.1:" + server.address().port;
const browser = await chromium.launch({ headless: true, ...(process.env.BIOA_CHROME_PATH ? { executablePath: process.env.BIOA_CHROME_PATH } : {}) });
const SCEN = {
  preview: { config: [503, "Service temporarily unavailable"], lead: [503, "Service temporarily unavailable"], expect: "error" },
  reject:  { config: [200, { enabled: false, misconfigured: false, sitekey: null }], lead: [200, { ok: false, error: "validation" }], expect: "error" },
  limited: { config: [200, { enabled: false, misconfigured: false, sitekey: null }], lead: [429, { ok: false, error: "rate_limited" }], expect: "limited" },
  saved:   { config: [200, { enabled: false, misconfigured: false, sitekey: null }], lead: [200, { ok: true, id: "bioa_test" }], expect: "success" }
};
const rows = [];
for (const route of (process.env.PROBE_ROUTES || "/,/en/,/contacts/").split(",")) for (const width of [390, 834, 1440]) for (const [name, sc] of Object.entries(SCEN)){
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  const sent = [], leaked = [], mapsBlocked = [];
  await page.route("**/*", async r => {
    const q = r.request(), u = q.url();
    if (u.startsWith(base + "/api/lead/config")) { const [st, b] = sc.config; return r.fulfill({ status: st, contentType: typeof b === "string" ? "text/plain" : "application/json", body: typeof b === "string" ? b : JSON.stringify(b) }); }
    if (u.startsWith(base + "/api/lead")) { sent.push(JSON.parse(q.postData() || "{}")); const [st, b] = sc.lead; return r.fulfill({ status: st, contentType: typeof b === "string" ? "text/plain" : "application/json", body: typeof b === "string" ? b : JSON.stringify(b) }); }
    // The Contacts Google Maps iframe posts its own telemetry (same on the approved Preview): aborted and
    // recorded, not part of the form. Any other non-GET is aborted and fails the case.
    if (q.method() !== "GET" && /^https:\/\/maps\.googleapis\.com\/maps_api_js_slo\/log/.test(u)) { mapsBlocked.push(u); return r.abort(); }
    if (q.method() !== "GET") { leaked.push(q.method() + " " + u); return r.abort(); }
    if (/challenges\.cloudflare|geojs|googletagmanager|yandex|dashly/.test(u)) return r.abort();
    return r.fallback();
  });
  const fail = [];
  try {
    await page.goto(base + route, { waitUntil: "load", timeout: 70000 }); await page.waitForTimeout(500);
    const deny = page.locator("#mw-consent .mw-deny").first(); if (await deny.isVisible().catch(() => false)) await deny.click();
    await page.evaluate(() => { const m = document.getElementById("get-a-quote"); const t = document.querySelector('[modal="get-a-quote"],[data-modal="get-a-quote"],a[href="#get-a-quote"]'); if (t) t.click(); else if (m) m.classList.add("active"); });
    await page.waitForTimeout(700);
    const f = "#get-a-quote form.wpcf7-form";
    await page.fill(f + ' [name="your-name"]', "QA Test");
    await page.fill(f + ' [name="your-phone"]', "0900000000");
    await page.evaluate(sel => { const c = document.querySelector(sel + ' [name="your-acceptance"]'); if (c && !c.checked) c.click(); }, f);
    await page.evaluate(sel => { const b = document.querySelector(sel + " .cf-modal__button,[type=submit]"); const form = document.querySelector(sel); form.requestSubmit ? form.requestSubmit(b && b.form === form ? b : undefined) : b.click(); }, f);
    await page.waitForTimeout(1500);
    const st = await page.evaluate(sel => ({ msg: (document.querySelector(sel + " [data-bioa-lead-status]") || {}).textContent || "",
      open: getComputedStyle(document.getElementById("get-a-quote")).display !== "none" && getComputedStyle(document.getElementById("get-a-quote")).visibility !== "hidden" }), f);
    const success = /đã nhận|has received/i.test(st.msg), limited = /quá nhiều|Too many/i.test(st.msg), error = /Chưa gửi|Could not send/i.test(st.msg);
    if (sc.expect === "success" && !success) fail.push("expected success, got: " + st.msg);
    if (sc.expect !== "success" && success) fail.push("FALSE SUCCESS shown: " + st.msg);
    if (sc.expect === "error" && !error) fail.push("expected error message, got: " + st.msg);
    if (sc.expect === "limited" && !limited) fail.push("expected rate-limit message, got: " + st.msg);
    if (name !== "preview" && sent.length !== 1) fail.push("POST /api/lead count " + sent.length);
    if (sent[0] && (sent[0].consent !== true || !/^bioa_/.test(sent[0].submission_id) || sent[0].website !== "")) fail.push("payload contract");
    rows.push({ route, width, scenario: name, ok: !fail.length, fail, msg: st.msg, modalOpenAfter: st.open });
  } catch (e){ fail.push("error " + e.message.split("\n")[0]); rows.push({ route, width, scenario: name, ok: false, fail }); }
  if (mapsBlocked.length) rows[rows.length - 1].mapsTelemetryBlocked = mapsBlocked.length;
  if (leaked.length) { fail.push("unexpected non-GET attempted (aborted): " + leaked.join(" | ")); rows[rows.length - 1].ok = false; }
  console.log((fail.length ? "FAIL " : "ok   ") + route + " @" + width + " " + name + (fail.length ? " :: " + fail.join(" | ") : ""));
  await page.close();
}
await browser.close(); server.close();
writeFileSync(join(OUT, "lead-form-probe.json"), JSON.stringify(rows, null, 1));
const bad = rows.filter(r => !r.ok).length;
console.log(`Lead form probe: ${rows.length - bad}/${rows.length} PASS (no request left the browser)`);
process.exit(bad ? 1 : 0);
