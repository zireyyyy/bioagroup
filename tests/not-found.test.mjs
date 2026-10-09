import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {renderNotFound} from "../bioa-404.mjs";

test("both / and /en/ 404 documents use one original English copy",()=>{
  const html=renderNotFound();
  assert.equal(html,renderNotFound("vi"));
  assert.equal(html,renderNotFound("en"));
  assert.match(html,/<html lang="en">/);
  assert.match(html,/<h1[^>]*>Ooops!<\/h1>/);
  assert.match(html,/We can’t find the page you’re looking for/);
  assert.doesNotMatch(html,/Không tìm thấy trang|Page not found/);
});
test("Merywood CTA DOM and arrow SVG restored without text glyph",()=>{
  const html=renderNotFound();
  assert.match(html,/class="btn bioa-404__cta" href="\/" aria-label="Back home"/);
  assert.match(html,/class="btn__icon"/);
  assert.match(html,/class="btn__text">Back home/);
  assert.match(html,/min-width:142px;min-height:47px/);
  assert.match(html,/font-size:14px;font-weight:500/);
  assert.ok(html.includes('class="icon btn__icon arrow"'));
  assert.ok(html.includes('<svg width="20" height="20"'));
  assert.ok(!html.includes('aria-hidden="true">←</span>'));
  assert.doesNotMatch(html,/linear-gradient\(|bioa-404:before/);
  assert.match(html,/name="robots" content="noindex,nofollow,noarchive"/);
});
test("404 prefers the untouched owner PNG and retains old image only as temporary fallback",async()=>{
  const html=renderNotFound();
  assert.ok(html.includes('src="/assets/bioa-404-original.png"'));
  assert.match(html,/bioa-404-art\\.avif/);
  assert.match(html,/onerror=/);
  const fallback=await readFile(new URL("../assets/bioa-404-art.avif",import.meta.url));
  assert.equal(fallback.subarray(4,12).toString("ascii"),"ftypavif");
});
test("build still emits 404.html and en/404.html via Cloudflare Pages",async()=>{
  const build=await readFile(new URL("../build.mjs",import.meta.url),"utf8");
  assert.match(build,/path\.join\(OUT,"404\.html"\),renderNotFound\("vi"\)/);
  assert.match(build,/path\.join\(OUT,"en","404\.html"\),renderNotFound\("en"\)/);
  assert.match(build,/include:\["\/\*"\],exclude:\[\]/);
});
