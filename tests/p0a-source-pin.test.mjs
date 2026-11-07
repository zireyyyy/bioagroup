// P0A — pinned source contract: hashes, restore, required DOM, fail-closed paths.
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { manifest, restoreCrawlerRefs, assertRequiredDom, assertNoCrawlerRefs } from "../tools/source-bundle.mjs";

test("manifest pins the verified owner archive and every build input", () => {
  assert.equal(manifest.archive.sha256, "9904a5d6fa59afb551957809e82b100fc5c3923f8c434fe6aa4de2ed43967c41");
  assert.equal(manifest.archive.bytes, 184107032);
  const routes = Object.keys(manifest.files).sort();
  assert.deepEqual(routes, ["/", "/about/", "/blog/", "/blog/what-affects-moq-in-supplement-manufacturing/", "/careers/", "/contacts/", "/contract-manufacturing-cosmetics/", "/cookie-policy/", "/hotel-spa-cosmetics/", "/privacy-policy/"]);
  for (const f of Object.values(manifest.files)) assert.match(f.sha256, /^[0-9a-f]{64}$/);
});

test("build.mjs has no live Merywood fetch", () => {
  const src = readFileSync("build.mjs", "utf8");
  assert.doesNotMatch(src, /fetch\s*\(/);
  assert.doesNotMatch(src, /const BASE\s*=/);
  assert.match(src, /loadSource\(sourceRoute\)/);
});

test("restore maps crawler paths but never touches absolute URLs", () => {
  const html = '<img src="assets/images/email.svg"><img src="assets/images/email.svg">' +
    '<link href="https://merywood.com/wp-content/themes/mery-wood/assets/css/main.css?ver=1">' +
    '<script id="swv-js" src="assets/js/index.js"></script><base href="https://merywood.com/">';
  const out = restoreCrawlerRefs(html, "/");
  assert.match(out, /icons\/desktop\/email\.svg[\s\S]*icons\/mobile\/email\.svg/);
  assert.match(out, /href="https:\/\/merywood\.com\/wp-content\/themes\/mery-wood\/assets\/css\/main\.css\?ver=1"/);
  assert.match(out, /id="swv-js" src="https:\/\/merywood\.com\/wp-content\/plugins\/contact-form-7\/includes\/swv\/js\/index\.js\?ver=6\.1\.7"/);
  assert.doesNotMatch(out, /<base/);
});

test("missing Merywood DOM stops the build instead of silently skipping", () => {
  assert.throws(() => assertRequiredDom("<html><body>today's merged DOM</body></html>", "/"), /required source DOM missing/);
});

test("unrestored crawler path in output stops the build", () => {
  assert.throws(() => assertNoCrawlerRefs('<img src="assets/images/x.webp">', "/"), /unrestored crawler path/);
  assert.doesNotMatch(String(assertNoCrawlerRefs('<img src="/assets/bioa-full.svg">', "/")), /error/);
});

test("net guard blocks any network access in the build process", () => {
  const r = spawnSync(process.execPath, ["--import", "./tools/net-guard.mjs", "-e", "fetch('https://merywood.com').then(()=>process.exit(0),e=>{console.error(e.message);process.exit(3)})"], { encoding: "utf8" });
  assert.equal(r.status, 3);
  assert.match(r.stderr, /NET GUARD/);
});

test("missing bundle directory fails closed", () => {
  const r = spawnSync(process.execPath, ["tools/verify-source-bundle.mjs"], { encoding: "utf8", env: { ...process.env, BIOA_SOURCE_DIR: "" } });
  assert.notEqual(r.status, 0);
  assert.match(r.stderr, /no live fallback/);
});
