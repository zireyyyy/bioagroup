// D11 — every legacy Footer/About slug lands on its same-meaning BIO-A page in a real browser, and a
// real click on the Footer "Liên Hệ"/"Contact" link reaches Contacts. Read-only. Env: BIOA_CHROME_PATH.
import { chromium } from "playwright";
import { createDistServer } from "../tools/serve-dist.mjs";
import { legacyRedirectFiles } from "../bioa-legacy-redirects.mjs";

const server = createDistServer("dist");
await new Promise(r => server.listen(0, "127.0.0.1", r));
const base = "http://127.0.0.1:" + server.address().port;
const launch = { headless: true };
if (process.env.BIOA_CHROME_PATH) launch.executablePath = process.env.BIOA_CHROME_PATH;
const browser = await chromium.launch(launch);
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.route("**/*", r => r.request().method() !== "GET" || !r.request().url().startsWith(base) ? r.abort() : r.fallback());
const fails = [];
const files = legacyRedirectFiles([]);
for (const f of files){
  const res = await page.goto(base + f.route, { waitUntil: "load" }).catch(e => null);
  await page.waitForURL(u => new URL(u).pathname === f.target, { timeout: 10000 }).catch(() => {});
  const landed = new URL(page.url()).pathname;
  if (landed !== f.target) fails.push(f.route + " -> " + landed + " (expected " + f.target + ")");
  else if (!(await page.title()) || /chuyển hướng|Redirecting/.test(await page.title())) fails.push(f.route + " landed without target title");
}
for (const [home, label, target] of [["/", "Liên Hệ", "/contacts/"], ["/en/", "Contact", "/en/contacts/"]]){
  await page.goto(base + home, { waitUntil: "load" });
  const link = page.locator(".footer-top__nav a", { hasText: new RegExp("^\\s*" + label + "\\s*$") }).first();
  await link.scrollIntoViewIfNeeded().catch(() => {});
  await link.click({ timeout: 10000 }).catch(e => fails.push(home + " footer click failed: " + String(e).slice(0, 80)));
  await page.waitForURL(u => new URL(u).pathname === target, { timeout: 10000 }).catch(() => {});
  if (new URL(page.url()).pathname !== target) fails.push(home + " footer " + label + " -> " + new URL(page.url()).pathname);
}
await browser.close(); server.close();
for (const f of fails) console.log("FAIL", f);
console.log(`D11 legacy redirects: ${files.length + 2 - fails.length}/${files.length + 2} PASS`);
if (fails.length) process.exit(1);
