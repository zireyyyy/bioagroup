import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";

test("Home cold-load guard waits for Merywood Roadmap assets without CSS/device forks",async()=>{
  const source=await readFile(new URL("../bioa-home-refine.mjs",import.meta.url),"utf8");
  const guard=source.slice(source.indexOf("function addHomeRoadmapColdLoadSync($)"),source.indexOf("function addSharedPageReveal($,route)"));
  assert.ok(guard.includes("document.querySelector('.block-roadmap')"));
  assert.ok(guard.includes("document.fonts.ready"));
  assert.ok(guard.includes("img.addEventListener('load'"));
  assert.ok(guard.includes("img.addEventListener('error'"));
  assert.ok(guard.includes("window.jQuery(window).triggerHandler('resize')"));
  assert.ok(guard.includes("window.Scrollbar.get(page)"));
  assert.ok(guard.includes("sourceScrollbar.update()"));
  assert.ok(!guard.includes("style.height="));
  assert.ok(!guard.includes("min-height:"));
  const home=source.slice(source.lastIndexOf("export function applyHomeRefinement($,route,lang){"));
  assert.match(home,/addHomeRoadmapColdLoadSync\(\$\);/);
  const shared=source.slice(source.lastIndexOf("export function applySharedShell($,route,lang){"),source.lastIndexOf("export function applyHomeRefinement($,route,lang){"));
  assert.ok(!shared.includes("addHomeRoadmapColdLoadSync($);"));
});
