/** Phase 2B cross-device owner smoke — read-only Chromium audit.
 * Routes, locale and canonical shell only; visual approval remains the owner's.
 * Source Merywood assets/network may be unavailable locally: do not submit forms,
 * trigger navigation or require third-party scripts to respond.
 */
import assert from "node:assert/strict";
import {createServer} from "node:http";
import {readFile,mkdir,writeFile} from "node:fs/promises";
import {resolve,extname,sep} from "node:path";
import {chromium} from "playwright";

const root=resolve("dist");
const mime={".html":"text/html; charset=utf-8",".js":"text/javascript; charset=utf-8",".css":"text/css",
 ".png":"image/png",".svg":"image/svg+xml",".webp":"image/webp",".avif":"image/avif",".woff2":"font/woff2"};
const server=createServer(async(req,res)=>{
 const pathname=decodeURIComponent(new URL(req.url,"http://localhost").pathname);
 const path=resolve(root,"."+(pathname.endsWith("/")?pathname+"index.html":pathname));
 if(!path.startsWith(root+sep)){res.writeHead(403).end();return}
 try{const data=await readFile(path);res.writeHead(200,{"content-type":mime[extname(path)]||"application/octet-stream"}).end(data)}
 catch{res.writeHead(404).end("not found")}
});
await new Promise(ok=>server.listen(0,"127.0.0.1",ok));
const origin="http://127.0.0.1:"+server.address().port;
const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
const widths=[390,834,1440];
const routes=["/","/about/","/contract-manufacturing-cosmetics/","/dich-vu-khac/","/blog/","/contacts/"];
const records=[],failures=[];
try{
 for(const path of routes)for(const lang of ["vi","en"])for(const width of widths){
  const route=(lang==="en"?"/en":"")+path;
  const page=await browser.newPage({viewport:{width,height:860},deviceScaleFactor:1});
  try{
   const response=await page.goto(origin+route,{waitUntil:"domcontentloaded",timeout:30000});
   assert.equal(response?.status(),200,"route status "+route);
   const state=await page.evaluate(()=>{
    const el=s=>document.querySelector(s);
    const company=el(".footer-top .bioa-footer-company-info--desktop");
    const mobile=el(".footer-top .bioa-footer-mobile-v2");
    return {lang:document.documentElement.lang,docWidth:document.documentElement.scrollWidth,viewport:innerWidth,
      header:document.querySelectorAll(".header__wrapper").length,
      footer:document.querySelectorAll(".footer-top").length,
      desktopIdentity:document.querySelectorAll(".footer-top .bioa-footer-company-info--desktop").length,
      identityLang:company?.getAttribute("lang")||null,
      mobileFooter:document.querySelectorAll(".footer-top .bioa-footer-mobile-v2").length,
      mobileFooterDisplay:mobile?getComputedStyle(mobile).display:null,
      homeStyle:document.querySelectorAll("style#bioa-home-refine").length,
      sharedStyle:document.querySelectorAll("style#bioa-shared-shell").length,
      categories:document.querySelectorAll("#bioa-cosmetics-categories .bioa-category-card").length,
      oldGrid:document.querySelectorAll(".bioa-footer-mobile-head,.bioa-produce-mobile-card").length};
   });
   assert.equal(state.lang,lang,"document language "+route);
   assert.equal(state.header,1,"shared header "+route);
   assert.equal(state.footer,1,"shared footer "+route);
   assert.equal(state.desktopIdentity,1,"company owner "+route);
   assert.equal(state.identityLang,lang,"company locale "+route);
   assert.equal(state.mobileFooter,1,"canonical footer v2 "+route);
   assert.equal(state.oldGrid,0,"no retired mobile owner "+route);
   assert.equal(state.homeStyle,path==="/"?1:0,"Home styles only on Home "+route);
   assert.equal(state.sharedStyle,path==="/"?0:1,"shared shell styles on inner pages "+route);
   if(path==="/contract-manufacturing-cosmetics/")assert.equal(state.categories,6,"six category cards "+route);
   records.push({route,width,...state});
   console.log("BIOA_PHASE2B_CROSS_DEVICE "+JSON.stringify({route,width,docWidth:state.docWidth,mobileFooterDisplay:state.mobileFooterDisplay}));
  }catch(err){failures.push({route,width,error:String(err)});console.error("BIOA_PHASE2B_CROSS_DEVICE_FAIL",route,width,String(err).slice(0,500))}
  finally{await page.close()}
 }
}finally{
 await mkdir("audit-artifacts/phase2b",{recursive:true});
 await writeFile("audit-artifacts/phase2b/cross-device-owner-matrix.json",JSON.stringify({kind:"technical DOM/computed audit, not owner visual PASS",records,failures},null,2));
 await browser.close();
 await new Promise(done=>server.close(done));
}
assert.equal(records.length,routes.length*2*widths.length,"Full VI/EN Desktop/Tablet/Mobile structural matrix");
assert.equal(failures.length,0,JSON.stringify(failures.slice(0,8)));
