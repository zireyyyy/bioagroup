import assert from "node:assert/strict";
import {readFile, access} from "node:fs/promises";
import {load} from "cheerio";

/* Root cause regression:
 * Merywood's live footer may add its historical Headquarters content under
 * the source logo. BIO-A owns that column. Zalo previously missed source
 * socials__link. The owner's original circular PNG must be preserved.
 */
await access("dist/assets/zalo-bioa-owner.png");
const routes=["","en/","about/","en/about/","dich-vu-khac/","en/dich-vu-khac/","blog/","en/blog/","contacts/","en/contacts/"];
for(const route of routes){
 const filename="dist/"+route+"index.html";
 const $=load(await readFile(filename,"utf8"));
 const footer=$(".footer-top").first();
 assert.equal(footer.length,1,"footer must exist: "+filename);
 const left=footer.find(".footer-top__left").first();
 const content=left.text().replace(/\s+/g," ").trim();
 assert.doesNotMatch(content,/\bHeadquarters\b|Harju|Tallinn|Estonia|16386898/i,
   "Merywood headquarters must not survive: "+filename);
 assert.equal(left.find(".bioa-footer-company-info--desktop").length,1,
   "exactly one owner BIO-A business info block: "+filename);
 assert.equal(left.children().not(".footer-top__logo,.footer__logo,.bioa-footer-company-info--desktop").length,0,
   "logo/company-info are the only children in left footer: "+filename);
 if(route.startsWith("en/")){
   assert.match(content,/Bio-A Group Pharmaceutical & Cosmetic Manufacturing Factory/,"EN company title: "+filename);
   assert.match(content,/Business Tax ID:/,"EN tax label: "+filename);
   assert.doesNotMatch(content,/Nhà Máy Sản Xuất|Mã số thuế doanh nghiệp/,"EN has no VI footer labels: "+filename);
 }else{
   assert.match(content,/Nhà Máy Sản Xuất Dược Mỹ Phẩm Bio-A Group/,"VI company title: "+filename);
   assert.match(content,/Mã số thuế doanh nghiệp:/,"VI tax label: "+filename);
 }
 const anchors=footer.find(".footer-top__socials > a");
 assert.equal(anchors.length,4,"exactly four Footer social links: "+filename);
 for(const label of ["WhatsApp","Facebook","Telegram","Zalo"]){
   const a=anchors.filter((_,node)=>$(node).attr("aria-label")===label);
   assert.equal(a.length,1,label+" present exactly once: "+filename);
   assert.ok(a.hasClass("socials__link"),"source social class must be preserved for "+label+": "+filename);
 }
 const zalo=anchors.filter('[aria-label="Zalo"]');
 assert.equal(zalo.find("img.bioa-zalo-icon").attr("src"),"/assets/zalo-bioa-owner.png",
   "Footer Zalo must preserve original owner-approved PNG, not SVG: "+filename);
 assert.ok(zalo.attr("href")?.startsWith("https://zalo.me/"),"Zalo CTA retained: "+filename);
 const mobile=footer.find(".bioa-footer-mobile-v2__socials a[aria-label='Zalo'] img");
 if(mobile.length) assert.equal(mobile.attr("src"),"/assets/zalo-bioa-owner.png",
   "Mobile previously-approved art stays untouched: "+filename);
 console.log("BIOA_FOOTER_BRAND_SOURCE "+(route||"/"));
}
