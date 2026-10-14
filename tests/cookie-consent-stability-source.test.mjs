import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {load} from "cheerio";
for(const route of ["","en/","about/","en/about/","dich-vu-khac/","en/dich-vu-khac/","blog/","en/blog/","contacts/","en/contacts/"]){
 const $=load(await readFile("dist/"+route+"index.html","utf8"));
 const root=$("#mw-consent.bioa-consent");
 assert.equal(root.length,1,"Cookie banner exists "+route);
 assert.equal(root.find(".mw-actions > .mw-btn").length,3,"Original three actions "+route);
 assert.equal(root.find(".mw-deny").first().text().trim(),route.startsWith("en/")?"Reject":"Từ chối","Deny localized "+route);
 const css=await readFile("bioa-home-refine.mjs","utf8");
 assert.match(css,/#mw-consent\.bioa-consent \.mw-actions \.mw-btn/,"Cookie style owner "+route);
 assert.match(css,/font-size:12px/,"Cookie compact labels "+route);
 assert.equal($("#bioa-cookie-font-ready").length,1,"Font gate script present "+route);
 assert.equal($("#bioa-cookie-copy-sync").length,1,"Consent copy runtime present "+route);
 assert.equal($("#bioa-cookie-state-sync").length,1,"Consent state runtime present "+route);
}
console.log("BIOA_COOKIE_SOURCE_PASS");