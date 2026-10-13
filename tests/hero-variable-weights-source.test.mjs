import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {load} from "cheerio";
for(const route of ["","en/"]){
 const $=load(await readFile("dist/"+route+"index.html","utf8"));
 const css=($('#bioa-shared-shell').html()||'')+'\n'+($('#bioa-home-refine').html()||'');
 assert.match(css,/\.header \.header__nav > ul > li > a\{font-weight:500\}/,"Header nav weight source");
 assert.match(css,/\.btn,\.btn \.btn__text\{font-weight:500\}/,"CTA weight source");
 assert.doesNotMatch(css,/font-variation-settings:"wght"\s*(200|300|400)\s*!important/,"No manually forced variable axis");
 assert.ok($("#bioa-manrope-variable").length===1,"Manrope Variable source loaded once");
}
console.log("BIOA_HERO_FONT_WEIGHT_SOURCE_PASS");
