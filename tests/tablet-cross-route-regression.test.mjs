import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
const load=p=>readFile(new URL("../"+p,import.meta.url),"utf8");
const block=(src,start,end)=>{
 const a=src.indexOf(start),b=src.indexOf(end,a+start.length);
 assert.ok(a>=0&&b>a,"known component owner");
 return src.slice(a,b);
};
test("Shared Header and Footer source owners apply on Home and every subpage",async()=>{
 const home=await load("bioa-home-refine.mjs");
 const shell=block(home,"const sharedShellCss =","export function applySharedShell($,route,lang){");
 const homeStyle=block(home,"export function applyHomeRefinement($,route,lang){","  localizeHomeCtas($,lang);");
 for(const shared of ["patchA7Css","patchD5FooterTabletCss","patchZaloIconCss","patchD6FooterMetaCss"]){
  assert.ok(shell.includes(shared),"shared shell includes "+shared);
  assert.ok(homeStyle.includes(shared),"Home includes "+shared);
 }
 assert.ok(home.includes("addContactLauncher($,lang);"));
});
test("Footer category widths adapt to BIO-A content without introducing a separate Tablet stack",async()=>{
 const home=await load("bioa-home-refine.mjs");
 const footer=block(home,"const patchD5FooterTabletCss = `","const patchCookieConsentCss = `");
 assert.ok(footer.includes("@media(min-width:769px) and (max-width:1200px)"));
 assert.ok(footer.includes(".footer-top__menu{\n    display:flex!important"));
 assert.ok(footer.includes(".footer-top__nav:nth-child(4){flex:.88 1 0!important}"));
 assert.ok(!footer.includes("grid-template-columns:"));
 assert.ok(footer.includes("overflow-wrap:normal!important"));
 assert.ok(home.includes("@media(max-width:768px)"));
});
test("Product selection CTA labels have their own accessible type, not inherited tiny Merywood type",async()=>{
 const src=await load("bioa-transform.mjs");
 assert.ok(src.includes(".block-product-formats .formats__cta-btn .btn__text{"));
 assert.ok(src.includes("font-size:clamp(12px,1vw,16px)!important"));
 assert.ok(src.includes(".block-product-formats .formats__cta-btn .btn__icon"));
 assert.ok(src.includes(".block-product-formats .formats__cta-title{"));
});
test("Tablet automatic chat teaser never covers footer; manual chat stays usable",async()=>{
 const home=await load("bioa-home-refine.mjs");
 const fab=block(home,"function addContactLauncher($,lang){","const patchMobileHeaderScrollCss = `");
 assert.ok(fab.includes("function footerVisibleOnTablet()"));
 assert.ok(fab.includes("new IntersectionObserver("));
 assert.ok(fab.includes("footerVisibleOnTablet()&&!root.classList.contains('is-open')"));
 assert.ok(fab.includes("if(teaserShown||teaserDismissed||root.classList.contains('is-open')||footerVisibleOnTablet())return"));
 assert.ok(fab.includes("toggle.addEventListener('click'"));
});
