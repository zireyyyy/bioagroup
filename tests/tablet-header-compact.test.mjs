import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";

const load=path=>readFile(new URL("../"+path,import.meta.url),"utf8");

test("Original Merywood is the responsive owner for all shared shell routes",async()=>{
 const [shell,home]=await Promise.all([load("bioa-transform.mjs"),load("bioa-home-refine.mjs")]);
 assert.ok(!shell.includes("@media(max-width:1200px){.header__nav ul{gap:14px!important}"));
 assert.ok(!home.includes("@media(max-width:1100px){.header__logo img"));
 assert.ok(!home.includes("@media(max-width:1200px){\n  .header__inner{height:64px"));
 assert.ok(!home.includes(".header__nav ul{gap:28px!important}"));
 assert.ok(!home.includes(".header__nav a{font-size:16px!important}"));
 assert.ok(!home.includes(".header__nav a{font-size:clamp("));
 assert.ok(!home.includes(".header__nav a{\n  font-size:17px!important"));
 assert.ok(!home.includes(".header__btn{\n  min-width:126px!important"));
});
test("New BIO-A controls use actual Merywood desktop units at 769+ without a duplicate mobile layout",async()=>{
 const home=await load("bioa-home-refine.mjs");
 assert.ok(home.includes("@media(min-width:769px) and (max-width:1200px){\n  .bioa-header-actions{gap:.5208vw!important}"));
 assert.ok(home.includes(".bioa-header-actions .header__btn{\n    height:clamp(28px,2.4479vw,42px)!important;"));
 assert.ok(home.includes("padding:0 clamp(8px,1.1458vw,20px)!important"));
 assert.ok(home.includes(".bioa-header-actions .bioa-lang a{\n    width:clamp(22px,1.8229vw,35px)!important;"));
 assert.ok(home.includes("@media(max-width:768px)"));
 assert.ok(home.includes("const patchD5FooterTabletCss")); // owner PASS / locked
 assert.ok(home.includes("function addHomeRoadmapColdLoadSync($)")); // cold-load PASS
});
test("Custom route additions do not force original Merywood content to mobile mode above 768px",async()=>{
 const [about,blog,cosmetics,services,contacts]=await Promise.all([
   load("bioa-about-refine.mjs"),load("bioa-blog-refine.mjs"),
   load("bioa-cosmetics-refine.mjs"),load("bioa-services-refine.mjs"),
   load("bioa-contacts-refine.mjs")
 ]);
 assert.ok(about.includes("applyAboutRefinement"));
 assert.ok(services.includes("@media(max-width:768px)"));
 assert.ok(contacts.includes("@media(max-width:768px)"));
 assert.ok(!cosmetics.includes("@media(max-width:1023px)"));
 assert.ok(cosmetics.includes("@media(max-width:768px){#bioa-cosmetics-categories"));
 const mid=blog.indexOf("'@media(max-width:1024px){'+");
 const mob=blog.indexOf("'@media(max-width:768px){'+");
 assert.ok(mid>=0&&mob>mid);
 assert.ok(!blog.slice(mid,mob).includes(".merywood-cg-grid.merywood-cg--cols-3{grid-template-columns"));
 assert.ok(blog.slice(mob).includes(".merywood-cg-grid.merywood-cg--cols-3{grid-template-columns"));
});
