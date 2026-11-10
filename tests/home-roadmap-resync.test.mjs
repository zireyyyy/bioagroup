import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";

test("ROADMAP-R5: source height re-syncs after a width change, owned once and reused by Cosmetics",async()=>{
  const source=await readFile(new URL("../bioa-home-refine.mjs",import.meta.url),"utf8");
  const guard=source.slice(source.indexOf("export function addHomeRoadmapColdLoadSync($)"),source.indexOf("function addSharedPageReveal($,route)"));
  // re-runs the Merywood swiperAutoHeight path after Swiper's own resize, only on a real width change
  assert.ok(guard.includes("slider.on('resize'"));
  assert.ok(guard.includes("if(slider.width===lastWidth)return;"));
  // and again after the source card transition (.step{transition:.5s}) settles, read from computed style
  assert.ok(guard.includes("cardTransitionMs()"));
  assert.ok(guard.includes("getComputedStyle(step)"));
  // R24d: the settled pass follows the card's own transitionend (timer only as fallback)
  assert.ok(guard.includes("section.addEventListener('transitionend'"));
  assert.ok(!guard.includes("style.height="));
  assert.ok(!guard.includes("min-height:"));
  assert.ok(!guard.includes("innerHeight("));
  const cosmetics=await readFile(new URL("../bioa-cosmetics-refine.mjs",import.meta.url),"utf8");
  assert.match(cosmetics,/import \{ addHomeRoadmapColdLoadSync \} from "\.\/bioa-home-refine\.mjs";/);
  assert.match(cosmetics,/addHomeRoadmapColdLoadSync\(\$\);/);
  assert.ok(!cosmetics.includes("triggerHandler('resize')"),"Cosmetics must reuse the Home owner, not copy it");
});
