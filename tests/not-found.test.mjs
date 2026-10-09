import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { renderNotFound } from "../bioa-404.mjs";

test("VI 404 uses Bio-A text, existing Merywood CTA DOM and VI home",()=>{
  const html=renderNotFound("vi");
  assert.match(html,/<html lang="vi">/);
  assert.match(html,/<h1[^>]+>Không tìm thấy trang<\/h1>/);
  assert.match(html,/href="\/" aria-label="Về trang chủ"/);
  assert.match(html,/class="btn__icon"/);
  assert.match(html,/class="btn__text"/);
  assert.doesNotMatch(html,/Page not found/);
  assert.match(html,/name="robots" content="noindex,nofollow,noarchive"/);
});
test("EN 404 uses /en/ home, even when JS is disabled",()=>{
  const html=renderNotFound("en");
  assert.match(html,/<html lang="en">/);
  assert.match(html,/Page not found/);
  assert.match(html,/href="\/en\/" aria-label="Back home"/);
  assert.doesNotMatch(html,/Không tìm thấy trang/);
  assert.doesNotMatch(html,/<script[\s>]/);
});
test("404 image is present as exact repo asset and referenced by both languages",async()=>{
  const data=await readFile(new URL("../assets/bioa-404-art.avif",import.meta.url));
  assert.equal(data.length,18520);
  assert.equal(data.subarray(4,12).toString("ascii"),"ftypavif");
  assert.match(renderNotFound("vi"),/src="\/assets\/bioa-404-art\.avif"/);
  assert.match(renderNotFound("en"),/src="\/assets\/bioa-404-art\.avif"/);
});
test("build outputs nearest 404 files for VI / EN without touching other routes",async()=>{
  const build=await readFile(new URL("../build.mjs",import.meta.url),"utf8");
  assert.match(build,/path\.join\(OUT,"404\.html"\),renderNotFound\("vi"\)/);
  assert.match(build,/path\.join\(OUT,"en","404\.html"\),renderNotFound\("en"\)/);
  assert.match(build,/include:\["\/\*"\],exclude:\[\]/);
});
