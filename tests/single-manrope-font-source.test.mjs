import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {load} from "cheerio";
const url="https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap";
for(const route of ["","en/","about/","en/about/","dich-vu-khac/","en/dich-vu-khac/","blog/","en/blog/","contacts/","en/contacts/"]){
 const $=load(await readFile("dist/"+route+"index.html","utf8"));
 const styles=$('head link[rel="stylesheet"]').toArray().map(el=>($(el).attr("href")||"").replace(/&amp;/g,"&"));
 assert.ok(styles.some(h=>/merywood\.com\/wp-content\/themes\/mery-wood\/assets\/css\/main\.css\?/i.test(h)),"Merywood layout stylesheet remains "+route);
 assert.equal(styles.filter(h=>h===url).length,1,"One exact Google variable 200–800 stylesheet "+route);
 assert.equal(styles.filter(h=>/fonts\.googleapis\.com\/css2?\?/.test(h)).length,1,"No duplicate Google stylesheet "+route);
 assert.equal($("#bioa-first-paint-stability").length,1,"Frozen first paint retained "+route);
 assert.equal($("#bioa-variable-font-policy").length,1,"Font policy retained "+route);
}
console.log("BIOA_VARIABLE_MANROPE_STYLESHEET_PASS");
