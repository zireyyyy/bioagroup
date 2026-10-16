/** Phase 2B Cosmetics single-owner guard: no duplicate legacy icon injector. */
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {load} from "cheerio";
const source=await readFile("bioa-cosmetics-refine.mjs","utf8");
assert.doesNotMatch(source,/function applyCategoryArtwork\(|bioa-cosmetics-category-icon-style|bioa-cosmetics-category-icon-box/);
assert.match(source,/function applyCategories\(/);
assert.match(source,/function applyManufacturingCategorySection\(/);
for(const prefix of ["","en/"]){
 const $=load(await readFile("dist/"+prefix+"contract-manufacturing-cosmetics/index.html","utf8"));
 assert.equal($("#bioa-cosmetics-categories").length,1,"Single categories section");
 assert.equal($("#bioa-cosmetics-categories .bioa-category-card").length,6,"Six canonical category cards");
 assert.equal($("#why-choose-us").length,1,"Why Choose source remains");
 assert.equal($("#bioa-cosmetics-category-icon-style").length,0,"No duplicate legacy stylesheet");
 $("#bioa-cosmetics-categories .bioa-category-card img").each((i,el)=>{
   assert.equal($(el).attr("src"),["/assets/about-icon-01-trang-diem.png","/assets/about-icon-02-cham-soc-toc.png","/assets/about-icon-03-cham-soc-body.png","/assets/about-icon-04-cham-soc-da-mat.png","/assets/about-icon-05-ca-nhan.png","/assets/about-icon-06-me-be.png"][i]);
 });
 console.log("BIOA_PHASE2B_COSMETICS_OWNER "+(prefix||"vi")+" PASS");
}
