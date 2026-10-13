import assert from "node:assert/strict";
import {readFile,access} from "node:fs/promises";
import {load} from "cheerio";

// Original Merywood mask URL has both absolute and root-relative forms.
// This test targets the exactly proven missing local asset in the generated
// Home/Other Services VI+EN output, without asserting a visual redesign.
await access("dist/assets/bioa-monogram.svg");
const routes=["","en/","dich-vu-khac/","en/dich-vu-khac/"];
for(const route of routes){
 const routeLabel="/"+route, html=await readFile("dist/"+route+"index.html","utf8");
 const $=load(html);
 const styleText=$("style").toArray().map(el=>$(el).html()||"").join("\n")+"\n"+
   $("[style]").toArray().map(el=>$(el).attr("style")||"").join("\n");
 assert.doesNotMatch(styleText,/\/assets\/img\/logo-bg\.svg/gi,
   "Old, missing Merywood watermark path survived in "+routeLabel);
 assert.match(styleText,/\/assets\/bioa-monogram\.svg/i,
   "Expected BIO-A replacement watermark missing from "+routeLabel);
 console.log("BIOA_WATERMARK_SOURCE_REMAP "+routeLabel);
}
