import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import {load} from "cheerio";

const routes=["","en/","about/","en/about/","contract-manufacturing-cosmetics/","en/contract-manufacturing-cosmetics/","dich-vu-khac/","en/dich-vu-khac/","blog/","en/blog/","contacts/","en/contacts/"];
for(const route of routes){
  const filename=path.join("dist",route,"index.html");
  const source=await fs.readFile(filename,"utf8");
  const $=load(source);
  const head=$("head");
  const first=head.children().first();
  assert.equal(first.attr("id"),"bioa-first-paint-stability",`first-head CSS must be immediate: ${route||"/"}`);
  assert.equal(head.find("#bioa-first-paint-stability").length,1,"no duplicate critical stylesheet");
  const css=first.html()||"";
  assert.match(css,/\*\{margin:0;padding:0;box-sizing:border-box\}/,"original Merywood normalize must match");
  assert.match(css,/@media\(min-width:769px\)\{html\{scrollbar-width:none\}\}/,"source SmoothScrollbar split remains 769+");
  assert.ok(source.includes("main.css"),"source stylesheet retained: "+route);
  console.log("FIRST_PAINT_OUTPUT "+(route||"/")+" ready");
}
