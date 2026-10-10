import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
const load=p=>readFile(new URL("../"+p,import.meta.url),"utf8");
const part=(s,a,b)=>{const i=s.indexOf(a),j=s.indexOf(b,i+a.length);assert.ok(i>=0&&j>i);return s.slice(i,j)};

test("Merywood Footer flex is reused for all four BIO-A groups",async()=>{
 const src=await load("bioa-home-refine.mjs");
 const css=part(src,"const patchD5FooterTabletCss = `","const patchCookieConsentCss = `");
 assert.ok(css.includes("@media(min-width:769px) and (max-width:1200px)"));
 assert.ok(css.includes("display:flex!important"));
 assert.ok(css.includes(".footer-top__nav:nth-child(4){flex:.88 1 0!important}"));
 assert.ok(!css.includes("grid-template-columns:"));
 assert.ok(css.includes(".bioa-footer-company-info--desktop"));
});
test("Zalo/email Header controls inherit source viewport units",async()=>{
 const s=await load("bioa-home-refine.mjs");
 const a8=part(s,"const patchA8Css = `","const patchBCss = `");
 assert.ok(a8.includes("height:2.4479vw!important"));
 assert.ok(a8.includes("font-size:inherit!important"));
 assert.ok(s.includes("width:1.4583vw!important"));
});