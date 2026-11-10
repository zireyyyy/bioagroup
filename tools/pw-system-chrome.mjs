// Test runner shim (no test file is modified): makes every chromium.launch() use the system Chrome given in
// BIOA_CHROME_PATH when the Playwright-bundled browser is not installed on this machine.
// Usage: node --import ./tools/pw-system-chrome.mjs tests/<test>.mjs
import { chromium } from "playwright";
const exe = process.env.BIOA_CHROME_PATH;
if (exe){
  const launch = chromium.launch.bind(chromium);
  chromium.launch = (opts = {}) => launch({ executablePath: exe, ...opts });
}
