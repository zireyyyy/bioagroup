import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
const load=p=>readFile(new URL("../"+p,import.meta.url),"utf8");
const part=(s,a,b)=>{const i=s.indexOf(a),j=s.indexOf(b,i+a.length);assert.ok(i>=0&&j>i);return s.slice(i,j)};

test("Only A8 specifies BIO-A compact Header email pill geometry",async()=>{
 const s=await load("bioa-home-refine.mjs");
 const a7=part(s,"const patchA7Css = `","const patchA8Css = `");
 const a8=part(s,"const patchA8Css = `","const patchBCss = `");
 assert.ok(!a7.includes(".bioa-header-actions .header__email a{"));
 assert.ok(a8.includes("height:2.4479vw!important"));
 assert.ok(a8.includes("font-size:inherit!important"));
});
test("Hero and added format CTA follow the same viewport unit",async()=>{
 const [h,t]=await Promise.all([load("bioa-home-refine.mjs"),load("bioa-transform.mjs")]);
 const b4=part(h,"const patchB4Css = `","const patchB5Css = `");
 assert.ok(b4.includes("width:22.1354vw!important;min-width:0!important"));
 assert.ok(b4.includes("font-size:1.6667vw!important"));
 assert.ok(t.includes(".block-product-formats .formats__cta-title{font-size:1.6667vw!important"));
 assert.ok(t.includes("min-width:17.7083vw!important"));
});