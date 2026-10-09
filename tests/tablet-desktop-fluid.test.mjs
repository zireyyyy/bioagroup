import test from "node:test";import assert from "node:assert/strict";import{readFile}from"node:fs/promises";
test("source responsive footer retains four Bio-A columns on 769-1200",async()=>{
 const src=await readFile(new URL("../bioa-home-refine.mjs",import.meta.url),"utf8");
 const start=src.indexOf("const patchD5FooterTabletCss = `");
 const end=src.indexOf("const patchCookieConsentCss = `",start);
 const css=src.slice(start,end);
 assert.ok(css.includes("@media(min-width:769px) and (max-width:1200px)"));
 assert.ok(css.includes("grid-template-columns:repeat(4,minmax(0,1fr))!important"));
 assert.ok(!css.includes("grid-template-columns:repeat(2,minmax(0,1fr))"));
 assert.ok(css.includes(".bioa-footer-company-info--desktop{\n    display:block!important"));
 assert.ok(css.includes(".bioa-footer-company-info--responsive{display:none!important}"));
 assert.ok(src.includes("const patchFooterInfo1Css"));
 assert.ok(src.includes("@media(max-width:768px)"));
});
test("added BIO-A header icons and email scale with the Merywood viewport",async()=>{
 const src=await readFile(new URL("../bioa-home-refine.mjs",import.meta.url),"utf8");
 assert.ok(src.includes(".bioa-header-actions .header__socials .bioa-zalo-icon"));
 assert.ok(src.includes("width:1.4583vw!important"));
 assert.ok(src.includes(".bioa-header-actions .header__email a{\n    height:2.4479vw!important"));
 assert.ok(src.includes("overflow:hidden!important"));
 assert.ok(src.includes(".bioa-header-actions .bioa-lang a{\n    width:1.8229vw!important"));
 assert.ok(src.includes("function addHomeRoadmapColdLoadSync($)"));
});