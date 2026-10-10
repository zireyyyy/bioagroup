import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
const load=p=>readFile(new URL("../"+p,import.meta.url),"utf8");
const part=(s,a,b)=>{const i=s.indexOf(a),j=s.indexOf(b,i+a.length);assert.ok(i>=0&&j>i);return s.slice(i,j)};

test("Footer uses Merywood source type scale, without double fixed-px minimum",async()=>{
 const s=await load("bioa-home-refine.mjs");
 const css=part(s,"const patchD5FooterTabletCss = `","const patchCookieConsentCss = `");
 for(const needle of ["font-size:.9375vw!important","font-size:.8333vw!important","font-size:.7813vw!important","font-size:.6510vw!important"])
  assert.ok(css.includes(needle),needle);
 assert.ok(!css.includes("clamp("));
 assert.ok(css.includes(".footer-top__email"));
});
test("Zalo and Why Choose artwork keep source-sized slots",async()=>{
 const s=await load("bioa-home-refine.mjs");
 const z=part(s,"const patchZaloIconCss = `","const patchH5CMobileMoqCss = `");
 const w=part(s,"const patchWhyChooseIconCss = `","const patchSharedHeroStatsParityCss = `");
 assert.ok(z.includes("width:1.25vw!important"));
 assert.ok(z.includes("font-size:.8333vw!important"));
 assert.ok(w.includes("width:1.1458vw!important"));
 assert.ok(w.includes("height:1.4063vw!important"));
});