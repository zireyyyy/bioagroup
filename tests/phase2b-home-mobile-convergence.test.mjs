/** Phase 2B: deprecated mobile Produce owner must remain absent.
 * Source-only: canonical replacement and Footer v2 stay untouched.
 */
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {load} from "cheerio";
const source=await readFile("bioa-home-refine.mjs","utf8");
assert.doesNotMatch(source,/function refineMobileProduce\(|bioa-produce-mobile-card|bioa-produce-mobile-title|bioa-produce-mobile-copy|bioa-produce-mobile-media/);
assert.match(source,/function replaceMobileProduceSection\(/);
assert.match(source,/function buildMobileFooterV2\(/);
assert.match(source,/function addHomeRoadmapColdLoadSync\(/);
for(const lang of ["","en/"]){
 const $=load(await readFile("dist/"+lang+"index.html","utf8"));
 assert.ok($(".bioa-produce-mobile-clean").length>=1,"Canonical Home mobile Produce must remain");
 assert.equal($(".bioa-produce-mobile-card").length,0,"Old card tree must not return");
 assert.equal($(".bioa-footer-mobile-v2").length,1,"Canonical mobile Footer retained");
 console.log("BIOA_PHASE2B_HOME_MOBILE_OWNER "+(lang||"vi")+" PASS");
}
