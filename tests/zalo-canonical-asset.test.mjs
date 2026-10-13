import assert from "node:assert/strict";
import {readFile,readdir} from "node:fs/promises";
import {load} from "cheerio";
const canonical="/assets/zalo-bioa-owner.png";
const deleted=["zalo-bioa.svg","zalo-bioa-circle-cream.svg","zalo-bioa-framed-cream.png"];
const files=await readdir("dist/assets");
for(const old of deleted)assert.ok(!files.includes(old),"obsolete Zalo file must not be emitted "+old);
const png=await readFile("dist"+canonical);
assert.equal(png.subarray(0,8).toString("hex"),"89504e470d0a1a0a");
assert.equal(png.readUInt32BE(16),96);
assert.equal(png.readUInt32BE(20),96);
for(const route of ["","en/","about/","en/about/","dich-vu-khac/","en/dich-vu-khac/","blog/","en/blog/","contacts/","en/contacts/"]){
 const $=load(await readFile("dist/"+route+"index.html","utf8"));
 const imgs=$("img.bioa-zalo-icon");
 assert.ok(imgs.length>0,"Zalo presence "+route);
 imgs.each((_,img)=>assert.equal($(img).attr("src"),canonical,"canonical Zalo artwork "+route));
}
console.log("BIOA_ZALO_CANONICAL_ASSET_PASS");