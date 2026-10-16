/** Phase 2B: reject retired non-included Home CSS constants while preserving active CSS. */
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
const source=await readFile("bioa-home-refine.mjs","utf8");
for(const token of ["patchB5Css","patchB11Css"])assert.ok(!source.includes(token),"Retired stylesheet "+token);
for(const token of ["const patchB6Css","const patchB12Css","export function applyHomeRefinement","export function applySharedShell","function buildMobileFooterV2($)","function replaceMobileProduceSection($,lang)","bioa-footer-company-info--desktop[lang=\"en\"]"]){
 assert.ok(source.includes(token),"Protected source owner "+token);
}
console.log("BIOA_PHASE2B_HOME_CSS_DEAD_CONSTANTS PASS");
