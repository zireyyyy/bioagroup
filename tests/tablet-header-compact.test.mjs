import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
const load=p=>readFile(new URL("../"+p,import.meta.url),"utf8");
const part=(s,a,b)=>{const i=s.indexOf(a),j=s.indexOf(b,i+a.length);assert.ok(i>=0&&j>i);return s.slice(i,j)};

test("Merywood controls the Header at every Desktop-fluid width",async()=>{
 const [home,trans]=await Promise.all([load("bioa-home-refine.mjs"),load("bioa-transform.mjs")]);
 const a7=part(home,"const patchA7Css = `","const patchA8Css = `");
 assert.ok(a7.includes("font-size:inherit!important"));
 assert.ok(a7.includes("height:2.4479vw!important"));
 assert.ok(a7.includes("padding:0 1.1458vw!important"));
 assert.ok(a7.includes("width:1.8229vw!important"));
 assert.ok(!a7.slice(a7.indexOf("@media(min-width:769px)")).includes("clamp("));
 assert.ok(!trans.includes("@media(max-width:1200px){.header__nav ul"));
 assert.ok(!home.includes("@media(max-width:1100px){.header__logo img"));
});
test("Other routes share one source responsive shell",async()=>{
 const home=await load("bioa-home-refine.mjs");
 const shell=part(home,"const sharedShellCss =","export function applySharedShell($,route,lang){");
 for(const owner of ["patchA7Css","patchA8Css","patchD5FooterTabletCss","patchFooterInfo1Css","patchZaloIconCss"])
  assert.ok(shell.includes(owner));
 assert.ok(home.includes("const patchMobileHeaderSourceParityCss"));
 assert.ok(home.includes("function addHomeRoadmapColdLoadSync($)"));
});