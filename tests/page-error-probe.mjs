// Page-error probe: loads routes repeatedly from a FIXED dist directory (never rebuilt during the run)
// and records every uncaught page error with name/message/stack, console errors and failed requests,
// so an intermittent error (route smoke 2026-11-10: "Object") can be attributed to its source.
// Usage: node tests/page-error-probe.mjs <fixedDistDir>   Env: PROBE_ROUTES (csv), PROBE_RUNS, PROBE_WIDTHS, BIOA_REPORTS
import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createDistServer } from "../tools/serve-dist.mjs";

const dist = process.argv[2]; if (!dist){ console.error("usage: page-error-probe.mjs <fixedDistDir>"); process.exit(2); }
const ROUTES = (process.env.PROBE_ROUTES || "/en/blog/top-20-cong-ty-gia-cong-my-pham-uy-tin-tai-tphcm/,/blog/top-20-cong-ty-gia-cong-my-pham-uy-tin-tai-tphcm/").split(",");
const RUNS = +(process.env.PROBE_RUNS || 15), WIDTHS = (process.env.PROBE_WIDTHS || "1440,390").split(",").map(Number);
const OUT = process.env.BIOA_REPORTS || "probe-reports"; mkdirSync(OUT, { recursive: true });
const server = createDistServer(dist); await new Promise(r => server.listen(0, "127.0.0.1", r));
const base = "http://127.0.0.1:" + server.address().port;
const browser = await chromium.launch({ headless: true, ...(process.env.BIOA_CHROME_PATH ? { executablePath: process.env.BIOA_CHROME_PATH } : {}) });
const rows = []; const summary = {};
for (const route of ROUTES) for (const width of WIDTHS) for (let i = 0; i < RUNS; i++){
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  const errors = [], consoleErr = [], failed = [];
  await page.addInitScript(() => {
    window.__bioaRejections = [];
    window.addEventListener("unhandledrejection", e => { const r = e.reason; window.__bioaRejections.push({ type: Object.prototype.toString.call(r), json: (() => { try { return JSON.stringify(r).slice(0, 300); } catch { return String(r); } })(), stack: r && r.stack ? String(r.stack).slice(0, 400) : "" }); });
  });
  page.on("pageerror", e => errors.push({ name: e.name, message: String(e.message).slice(0, 200), stack: String(e.stack || "").slice(0, 500) }));
  page.on("console", m => { if (m.type() === "error") consoleErr.push(m.text().slice(0, 200)); });
  page.on("requestfailed", q => failed.push(q.url().replace(/\?.*$/, "").slice(0, 140) + " " + (q.failure()?.errorText || "")));
  await page.route("**/*", r => r.request().method() !== "GET" ? r.abort() : r.fallback());
  try { await page.goto(base + route, { waitUntil: "load", timeout: 70000 }); await page.waitForTimeout(1500); }
  catch (e){ errors.push({ name: "goto", message: e.message.split("\n")[0] }); }
  const rejections = await page.evaluate(() => window.__bioaRejections || []).catch(() => []);
  const row = { route, width, run: i, errors, rejections, consoleErr, failed };
  rows.push(row);
  for (const e of [...errors.map(e => "pageerror " + e.name + ": " + e.message), ...rejections.map(r => "rejection " + r.type + " " + r.json)]) (summary[route + " @" + width + " :: " + e] ||= 0, summary[route + " @" + width + " :: " + e]++);
  await page.close();
}
await browser.close(); server.close();
writeFileSync(join(OUT, "page-error-probe.json"), JSON.stringify(rows, null, 1));
console.log(`Page-error probe: ${rows.length} loads from fixed dist ${dist}`);
for (const [k, v] of Object.entries(summary)) console.log(`  ${v}/${RUNS} × ${k}`);
const withErr = rows.filter(r => r.errors.length || r.rejections.length).length;
console.log(`loads with page errors/unhandled rejections: ${withErr}/${rows.length}`);
