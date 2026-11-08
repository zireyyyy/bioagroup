// Regression for the 2026-11-08 owner FAIL: the local QA server crashed on the first missing file
// (Cloudflare-edge-only /cdn-cgi/ script), so main.css/images loaded after it were refused and the
// Header rendered as bullet lists. A missing file must return 404 and the server must keep serving.
import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync, mkdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createDistServer } from "../tools/serve-dist.mjs";

test("serve-dist survives missing files and keeps serving CSS", async () => {
  const d = mkdtempSync(join(process.env.TEMP || tmpdir(), "bioa-serve-"));
  writeFileSync(join(d, "index.html"), "<h1>ok</h1>");
  writeFileSync(join(d, "404.html"), "<h1>404</h1>");
  mkdirSync(join(d, "assets")); writeFileSync(join(d, "assets", "main.css"), "body{}");
  mkdirSync(join(d, "about")); writeFileSync(join(d, "about", "index.html"), "about");
  const s = createDistServer(d);
  await new Promise(r => s.listen(0, "127.0.0.1", r));
  const u = p => "http://127.0.0.1:" + s.address().port + p;
  try{
    const miss = await fetch(u("/cdn-cgi/scripts/x/cloudflare-static/email-decode.min.js"));
    assert.equal(miss.status, 404);
    assert.match(await miss.text(), /404/);
    const css = await fetch(u("/assets/main.css?v=1"));
    assert.equal(css.status, 200);
    assert.equal(css.headers.get("content-type"), "text/css");
    const dir = await fetch(u("/about"), { redirect: "manual" });
    assert.equal(dir.status, 301);
    assert.equal(dir.headers.get("location"), "/about/");
    assert.equal((await fetch(u("/about/"))).status, 200);
    assert.equal((await fetch(u("/x"), { method: "POST" })).status, 405);
    assert.equal((await fetch(u("/"))).status, 200, "server still alive after 404s");
  } finally { s.close(); }
});
