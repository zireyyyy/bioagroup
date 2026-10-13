import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {load} from "cheerio";
// COLD FONT SOURCE1: preserve exact Merywood Manrope owner while preventing
// a second external Google Manrope face from replacing text after first paint.
for(const route of ["","en/","about/","en/about/","dich-vu-khac/","en/dich-vu-khac/","blog/","en/blog/","contacts/","en/contacts/"]){
 const source=await readFile("dist/"+route+"index.html","utf8"),$=load(source);
 const remaining=$('link[rel="stylesheet"],link[rel="preload"][as="style"]')
   .toArray().map(el=>($(el).attr('href')||"").replace(/&amp;/g,"&"));
 assert.ok(remaining.some(h=>/merywood\.com\/wp-content\/themes\/mery-wood\/assets\/css\/main\.css\?/i.test(h)),
  "original Merywood css/font source must be preserved: "+route);
 assert.ok(!remaining.some(h=>/^https?:\/\/fonts\.googleapis\.com\/css2?\?/i.test(h)&&/family=Manrope/i.test(h)),
  "duplicate Google Manrope style must be removed: "+route);
 assert.equal($("#bioa-first-paint-stability").length,1,"first paint guard unchanged: "+route);
 console.log("BIOA_SINGLE_MANROPE_FONT_SOURCE "+(route||"/"));
}
