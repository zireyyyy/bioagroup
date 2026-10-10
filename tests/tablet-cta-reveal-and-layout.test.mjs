import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
const load=p=>readFile(new URL("../"+p,import.meta.url),"utf8");
test("CTA content cannot remain hidden when Smooth Scrollbar moves it into the tablet viewport",async()=>{
 const s=await load("bioa-home-refine.mjs");
 const match="el.matches('.whatsapp__content')";
 assert.equal(s.split(match).length-1,2,"home and all other routes must both unhide CTA");
 assert.ok(s.includes("el.matches('.whatsapp__content')){\n        show(el);"));
 assert.ok(s.includes("function addSharedPageReveal($,route){"));
 assert.ok(s.includes("function addHomeReveal($)"));
 assert.ok(s.includes("mark('.whatsapp .whatsapp__content','fade-up',300)"));
});
test("BIO-A longer text retains readable minimums within the existing source flex structure",async()=>{
 const [h,t]=await Promise.all([load("bioa-home-refine.mjs"),load("bioa-transform.mjs")]);
 assert.ok(h.includes("const patchD5FooterTabletCss = `"));
 assert.ok(h.includes(".footer-top__wrapper{\n    display:flex!important"));
 assert.ok(h.includes("font-size:clamp(11px,.82vw,14px)!important"));
 assert.ok(h.includes(".bioa-header-actions .header__btn{\n    height:clamp(28px,2.4479vw,42px)!important"));
 assert.ok(t.includes("min-width:max(17.7083vw,200px)!important"));
 assert.ok(t.includes("font-size:clamp(16px,1.5625vw,30px)!important"));
 assert.ok(t.includes("font-size:clamp(11px,.8333vw,16px)!important"));
});
test("Approved mobile UI, 404, owner content, maintenance and integrations not touched",async()=>{
 const [h,t]=await Promise.all([load("bioa-home-refine.mjs"),load("bioa-transform.mjs")]);
 assert.ok(h.includes("const patchMobileHeaderSourceParityCss"));
 assert.ok(h.includes("function addHomeRoadmapColdLoadSync($)"));
 assert.ok(h.includes("const patchCookieConsentCss"));
 assert.ok(t.includes("@media(max-width:768px)"));
});
