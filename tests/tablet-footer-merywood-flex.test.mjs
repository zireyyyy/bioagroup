import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
const load=p=>readFile(new URL("../"+p,import.meta.url),"utf8");
const part=(s,a,b)=>{const i=s.indexOf(a),j=s.indexOf(b,i+a.length);assert.ok(i>=0&&j>i);return s.slice(i,j)};

test("Footer carries exact original Merywood flex owner rather than a Tablet grid",async()=>{
 const s=await load("bioa-home-refine.mjs");
 const i=part(s,"const patchFooterInfo1Css = `","const patchFooterHover1Css = `");
 const f=part(s,"const patchD5FooterTabletCss = `","const patchCookieConsentCss = `");
 assert.ok(!i.includes("@media(max-width:1200px){"));
 assert.ok(i.includes("@media(max-width:768px){"));
 assert.ok(f.includes("display:flex!important"));
 assert.ok(f.includes(".footer-top__menu"));
 assert.ok(!f.includes("display:grid!important"));
 assert.ok(!f.includes("grid-template-columns:"));
 assert.ok(f.includes(".footer-top__nav:nth-child(4){flex:.88 1 0!important}"));
});
test("All BIO-A company and contact elements are retained",async()=>{
 const s=await load("bioa-home-refine.mjs");
 const f=part(s,"const patchD5FooterTabletCss = `","const patchCookieConsentCss = `");
 assert.ok(f.includes(".bioa-footer-company-info--desktop"));
 assert.ok(f.includes(".footer-top__email a"));
 assert.ok(f.includes(".footer-top__socials a"));
 assert.ok(f.includes(".bioa-zalo-icon"));
});