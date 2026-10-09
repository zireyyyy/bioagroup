import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
const read=()=>readFile(new URL("../bioa-home-refine.mjs",import.meta.url),"utf8");
const section=(src,start,end)=>src.slice(src.indexOf(start),src.indexOf(end,src.indexOf(start)));
test("Footer inherits Merywood font scale at 769-1200 rather than shrinking Bio-A labels further",async()=>{
  const src=await read();
  const css=section(src,"const patchD5FooterTabletCss = `","const patchCookieConsentCss = `");
  assert.ok(css.includes("grid-template-columns:repeat(4,minmax(0,1fr))!important"));
  assert.ok(!css.includes("grid-template-columns:repeat(2,minmax(0,1fr))"));
  assert.ok(css.includes(".bioa-footer-company-info--desktop{\n    display:block!important"));
  assert.ok(css.includes(".bioa-footer-company-info--responsive{display:none!important}"));
  for(const forbidden of ["font-size:.7292vw!important","font-size:.6771vw!important","font-size:.8333vw!important"])
    assert.ok(!css.includes(forbidden));
  assert.ok(css.includes("font-size:inherit!important"));
  assert.ok(src.includes("@media(max-width:768px)"));
});
test("Zalo CTA artwork uses original source viewport scaling on desktop-like Tablet",async()=>{
  const src=await read();
  const css=section(src,"const patchZaloIconCss = `","const patchH5CMobileMoqCss = `");
  assert.ok(css.includes("@media(min-width:769px) and (max-width:1200px)"));
  assert.ok(css.includes(".whatsapp__btn .btn__icon{"));
  assert.ok(css.includes(".whatsapp__btn .bioa-zalo-icon{"));
  assert.ok(css.includes("width:1.25vw!important"));
  assert.ok(css.includes(".whatsapp__btn .btn__text{"));
});
test("Bio-A category icon respects the smaller Merywood icon slot at desktop-like Tablet",async()=>{
  const src=await read();
  const css=section(src,"const patchWhyChooseIconCss = `","const patchSharedHeroStatsParityCss = `");
  assert.ok(css.includes("@media(min-width:769px) and (max-width:1200px)"));
  assert.ok(css.includes("#why-choose-us .bioa-why-icon-bioa{"));
  assert.ok(css.includes("width:1.1458vw!important"));
  assert.ok(css.includes("height:1.4063vw!important"));
  assert.ok(src.includes("const patchD5FooterTabletCss"));
  assert.ok(src.includes("function addHomeRoadmapColdLoadSync($)"));
});