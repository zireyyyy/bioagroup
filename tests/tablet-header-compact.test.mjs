import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
test("Tablet header uses existing compact 12px and 13px gaps without a new override",async()=>{
 const src=await readFile(new URL("../bioa-home-refine.mjs",import.meta.url),"utf8");
 assert.ok(src.includes(".header__nav ul{gap:13px!important}\n  .header__nav a{font-size:12px!important}"));
 assert.ok(src.includes("@media(max-width:1200px){\n  .header__nav a{font-size:12px!important}\n}"));
 assert.ok(src.includes("@media(max-width:1200px){.header__nav a{font-size:12px!important}}"));
 assert.ok(!src.includes("@media(max-width:1200px){.header__nav a{font-size:15px!important}}"));
 assert.ok(!src.includes("@media(max-width:1200px){\n  .header__nav a{font-size:15px!important}\n}"));
 assert.ok(src.includes("@media(max-width:768px)"));
});
