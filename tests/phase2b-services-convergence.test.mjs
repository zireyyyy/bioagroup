/** Phase 2B — Other Services dead-data convergence guard.
 * Owner confirmed FULL TABLET PASS 2026-10-15. Read-only source/output assertions:
 * no recreation of the removed static grid, no Swiper/CSS/DOM redesign.
 */
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {load} from "cheerio";

const source=await readFile("bioa-services-refine.mjs","utf8");
assert.doesNotMatch(source,/\bserviceIconMap\b|\bwhyTitle\s*:|^\s+why\s*:\s*\[/m,
  "Removed why-grid data must not be resurrected alongside the approved range slider");
assert.match(source,/\$\("#why-choose-us"\)\.remove\(\)/,
  "Keep the owner-approved single showcase (no second static grid)");
assert.match(source,/\.slice\(d\.range\.length\)\.remove\(\)/,
  "Retain five original Merywood slide wrappers without cloning");
assert.match(source,/\.addClass\("bioa-why-icon-bioa"\)/,
  "Preserve Home-canonical Bio-A artwork class");

for(const lang of ["vi","en"]){
  const route=(lang==="en"?"en/":"")+"dich-vu-khac/";
  const $=load(await readFile("dist/"+route+"index.html","utf8"));
  assert.equal($("#why-choose-us").length,0,lang+" redundant grid must stay absent");
  const showcase=$(".block-how-works").first();
  assert.ok(showcase.length,lang+" source Swiper showcase must exist");
  const slides=showcase.find(".swiper-wrapper").first().children(".swiper-slide");
  assert.equal(slides.length,5,lang+" approved five service slides remain intact");
  slides.each((_,node)=>{
    const icon=$(node).find(".step__icon img").first();
    assert.equal(icon.attr("src"),"/assets/bioa-monogram-cream.svg",
      lang+" service step uses the canonical artwork");
    assert.ok(icon.hasClass("bioa-why-icon-bioa"),lang+" step uses canonical class");
  });
  const processIcon=$(".block-right-choice .client").eq(2).find(".client__icon img").first();
  assert.equal(processIcon.attr("src"),"/assets/bioa-monogram-cream.svg",lang+" workflow monogram source");
  assert.ok(processIcon.hasClass("bioa-why-icon-bioa"),lang+" workflow shares Home canonical class");
  const serviceCss=$("#bioa-other-services-style").html()||"";
  assert.match(serviceCss,/min-width:42px!important/,lang+" mobile artwork box parity");
  assert.equal($("#bioa-other-services-style").length,1,
    lang+" existing route-only CSS owner is unchanged");
  console.log("BIOA_PHASE2B_SERVICE_OWNER "+lang+" PASS");
}
