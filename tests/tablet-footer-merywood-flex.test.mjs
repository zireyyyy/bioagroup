import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
const get=path=>readFile(new URL("../"+path,import.meta.url),"utf8");
const take=(src,a,b)=>{
 const i=src.indexOf(a),j=src.indexOf(b,i+a.length);
 assert.ok(i>=0&&j>i,"source block exists");
 return src.slice(i,j);
};
test("Merywood Footer retains flex layout from 769px without an invented Tablet grid",async()=>{
 const src=await get("bioa-home-refine.mjs");
 const info=take(src,"const patchFooterInfo1Css = `","const patchFooterHover1Css = `");
 const footer=take(src,"const patchD5FooterTabletCss = `","const patchCookieConsentCss = `");
 assert.ok(!info.includes("@media(max-width:1200px){"));
 assert.ok(info.includes("@media(max-width:768px){"));
 assert.ok(footer.includes(".footer-top__wrapper{\n    display:flex!important"));
 assert.ok(footer.includes(".footer-top__menu{\n    display:flex!important"));
 assert.ok(!footer.includes("display:grid!important"));
 assert.ok(!footer.includes("grid-template-columns:"));
 assert.ok(footer.includes(".footer-top__nav:nth-child(4){flex:.88 1 0!important}"));
 assert.ok(footer.includes(".bioa-footer-company-info--desktop{\n    display:block!important"));
});
test("Footer contact has one pill; all Bio-A categories remain visible",async()=>{
 const src=await get("bioa-home-refine.mjs");
 const footer=take(src,"const patchD5FooterTabletCss = `","const patchCookieConsentCss = `");
 assert.ok(footer.includes(".footer-top__email{\n    display:flex!important"));
 assert.ok(footer.includes(".footer-top__email a{\n    display:inline-flex!important"));
 assert.ok(footer.includes("font-size:clamp(11px,.82vw,14px)!important"));
 assert.ok(!footer.includes(".footer-top__nav{display:none"));
});
test("Home and all other routes share the exact Footer CSS ownership",async()=>{
 const src=await get("bioa-home-refine.mjs");
 const shell=take(src,"const sharedShellCss =","export function applySharedShell($,route,lang){");
 const home=take(src,"export function applyHomeRefinement($,route,lang){","  localizeHomeCtas($,lang);");
 for(const part of ["patchFooterInfo1Css","patchD5FooterTabletCss","patchZaloIconCss"]){
  assert.ok(shell.includes(part),"shared "+part);
  assert.ok(home.includes(part),"home "+part);
 }
 assert.ok(src.includes("const patchMobileHeaderSourceParityCss"));
 assert.ok(src.includes("function addHomeRoadmapColdLoadSync($)"));
});