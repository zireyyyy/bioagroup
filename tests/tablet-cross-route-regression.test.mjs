import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
const load=p=>readFile(new URL("../"+p,import.meta.url),"utf8");
const part=(s,a,b)=>{const i=s.indexOf(a),j=s.indexOf(b,i+a.length);assert.ok(i>=0&&j>i);return s.slice(i,j)};

test("Shared stylesheet is bound on Home and all page routes",async()=>{
 const s=await load("bioa-home-refine.mjs");
 const shell=part(s,"const sharedShellCss =","export function applySharedShell($,route,lang){");
 const home=part(s,"export function applyHomeRefinement($,route,lang){","  localizeHomeCtas($,lang);");
 for(const shared of ["patchA7Css","patchD5FooterTabletCss","patchZaloIconCss","patchD6FooterMetaCss"]){
  assert.ok(shell.includes(shared));assert.ok(home.includes(shared));
 }
});
test("BIO-A formats scale Desktop-like instead of switching to a third Tablet design",async()=>{
 const t=await load("bioa-transform.mjs");
 const start=t.indexOf("@media(min-width:769px) and (max-width:1200px){");
 const end=t.indexOf("\n\n.block-reviews{",start);
 assert.ok(start>=0&&end>start);
 const band=t.slice(start,end);
 assert.ok(band.includes(".whatsapp__btn"));
 assert.ok(band.includes(".block-product-formats .formats"));
 assert.ok(band.includes("font-size:.8333vw!important"));
 assert.ok(!band.includes("clamp("));
});
test("Manual chat is untouched; auto-teaser protects Footer",async()=>{
 const h=await load("bioa-home-refine.mjs");
 assert.ok(h.includes("function footerVisibleOnTablet()"));
 assert.ok(h.includes("new IntersectionObserver("));
 assert.ok(h.includes("toggle.addEventListener('click'"));
});