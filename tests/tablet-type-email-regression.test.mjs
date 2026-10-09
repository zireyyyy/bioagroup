import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
const load=p=>readFile(new URL("../"+p,import.meta.url),"utf8");
const sec=(text,a,b)=>{
 const i=text.indexOf(a),j=text.indexOf(b,i+a.length);
 assert.ok(i>=0 && j>i,"Required owner block exists");
 return text.slice(i,j);
};
test("A8 owns Tablet Header email sizing after A7 to avoid stale 42px pill",async()=>{
 const s=await load("bioa-home-refine.mjs");
 const a7=sec(s,"const patchA7Css = `","const patchA8Css = `");
 const a8=sec(s,"const patchA8Css = `","const patchBCss = `");
 assert.ok(!a7.includes(".bioa-header-actions .header__email a{\n    height:2.4479vw"));
 assert.ok(a8.includes("@media(min-width:769px) and (max-width:1200px)"));
 assert.ok(a8.includes("height:clamp(28px,2.4479vw,42px)!important"));
 assert.ok(a8.includes("font-size:clamp(10.5px,.83vw,14px)!important"));
});
test("One Footer email shell rather than inherited 208px parent",async()=>{
 const s=await load("bioa-home-refine.mjs");
 const d5=sec(s,"const patchD5FooterTabletCss = `","const patchCookieConsentCss = `");
 assert.ok(d5.includes(".footer-top__email{\n    display:flex!important"));
 assert.ok(d5.includes("width:100%!important;\n    min-width:0!important;\n    height:auto!important"));
 assert.ok(d5.includes("font-size:clamp(10.5px,.83vw,14px)!important"));
 assert.ok(d5.includes("grid-template-columns:minmax(0,1.3fr) minmax(0,1.45fr) minmax(0,.82fr) minmax(0,.83fr)!important"));
});
test("BIO-A new copy receives readable Tablet text floors without changing Merywood sections",async()=>{
 const h=await load("bioa-home-refine.mjs"),t=await load("bioa-transform.mjs");
 assert.ok(h.includes("font-size:clamp(11.5px,.9896vw,16px)!important"));
 assert.ok(h.includes("font-size:clamp(12px,.95vw,15px)!important"));
 assert.ok(t.includes("formats__cta-title{\n    font-size:clamp(20px,1.8vw,32px)!important"));
 assert.ok(t.includes(".block-product-formats .formats__item,"));
 assert.ok(h.includes("@media(max-width:768px)"));
});
