/** Phase 2B Footer owner convergence: deprecated Mobile v1 is absent. */
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {load} from "cheerio";
const source=await readFile("bioa-home-refine.mjs","utf8");
for(const token of ["buildMobileFooterContact","bioa-footer-mobile-head","bioa-footer-mobile-logo","bioa-footer-mobile-contact","bioa-footer-mobile-email","bioa-footer-mobile-socials"]){
 assert.ok(!source.includes(token),"Legacy Footer v1 source survives: "+token);
}
assert.match(source,/function buildMobileFooterV2\(/);
assert.match(source,/function addFooterCompanyInfo\(/);
// The old Merywood direct-child selector lived only inside an unreferenced CSS
// string (patchB5Css). The active Footer v2 owns hiding via this class.
assert.match(source,/\.bioa-footer-original-contact\s*\{\s*display:none!important\s*\}/);
assert.match(source,/originals\.addClass\('bioa-footer-original-contact'\)/);
assert.match(source,/bioa-footer-company-info--desktop\[lang="en"\]/);
for(const locale of ["","en/"]){
 const $=load(await readFile("dist/"+locale+"index.html","utf8"));
 assert.equal($(".footer-top .bioa-footer-mobile-v2").length,1,"Canonical Footer v2 should remain");
 assert.equal($(".footer-top .bioa-footer-company-info--desktop").length,1,"Approved desktop business info remains");
 assert.equal($(".footer-top .bioa-footer-mobile-head").length,0,"Retired Footer v1 should not render");
 const title=$(".footer-top .bioa-footer-company-info--desktop .bioa-footer-company-info__title").first().text();
 assert.match(title,locale?/Bio-A Group Pharmaceutical & Cosmetic Manufacturing Factory/:/Nhà Máy Sản Xuất Dược Mỹ Phẩm Bio-A Group/);
 console.log("BIOA_PHASE2B_FOOTER_OWNER "+(locale||"vi")+" PASS");
}
