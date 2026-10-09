import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";

test("Tablet header reuses Merywood-style fluid desktop sizing from 769px",async()=>{
 const src=await readFile(new URL("../bioa-home-refine.mjs",import.meta.url),"utf8");
 assert.ok(src.includes(".header__nav ul{gap:13px!important}\n  .header__nav a{font-size:clamp(9px,1vw,12px)!important}"));
 assert.ok(src.includes("@media(min-width:769px) and (max-width:1200px){\n  .header__nav a{font-size:clamp(9px,1vw,12px)!important}\n}"));
 assert.ok(src.includes("@media(min-width:769px) and (max-width:1200px){.header__nav a{font-size:clamp(9px,1vw,12px)!important}}"));
 assert.ok(src.includes("height:clamp(28px,3.2vw,42px)!important"));
 assert.ok(src.includes("padding-left:clamp(8px,1vw,20px)!important"));
 assert.ok(!src.includes("@media(max-width:1200px){.header__nav a{font-size:15px!important}}"));
 assert.ok(src.includes("@media(max-width:768px)"));
});

test("Added blog and cosmetics content retain source Mobile split at 768px",async()=>{
 const blog=await readFile(new URL("../bioa-blog-refine.mjs",import.meta.url),"utf8");
 const cosmetics=await readFile(new URL("../bioa-cosmetics-refine.mjs",import.meta.url),"utf8");
 const i=blog.indexOf("'@media(max-width:1024px){'+");
 const j=blog.indexOf("'@media(max-width:768px){'+");
 assert.ok(i>=0&&j>i);
 assert.ok(!blog.slice(i,j).includes(".merywood-cg--cols-3{grid-template-columns:minmax(0,1fr)!important}"));
 assert.ok(blog.slice(j).includes(".merywood-cg--cols-3{grid-template-columns:minmax(0,1fr)!important}"));
 assert.ok(cosmetics.includes("@media(max-width:768px){#bioa-cosmetics-categories"));
 assert.ok(!cosmetics.includes("@media(max-width:767px){#bioa-cosmetics-categories"));
});
