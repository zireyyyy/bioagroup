/**
 * MVR-TYPE1 — read-only computed typography across 3 device classes.
 * Owner visual PASS is separate from these deterministic regression checks.
 * Original Merywood Hero number font-weight is 300 (source main.txt).
 */
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import {createServer} from "node:http";
import {chromium} from "playwright";
const root=path.resolve("dist");
const mime={".html":"text/html; charset=utf-8",".css":"text/css",".js":"text/javascript",".png":"image/png",".svg":"image/svg+xml",".webp":"image/webp",".woff2":"font/woff2"};
const server=createServer(async(req,res)=>{
 const url=new URL(req.url,"http://localhost");
 const file=path.resolve(root,"."+(url.pathname.endsWith("/")?url.pathname+"index.html":url.pathname));
 if(!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
 try{const bytes=await fs.readFile(file);res.writeHead(200,{"Content-Type":mime[path.extname(file)]||"application/octet-stream"});res.end(bytes);}
 catch{res.writeHead(404);res.end("not found");}
});
await new Promise(resolve=>server.listen(0,"127.0.0.1",resolve));
const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
const reports=[];
try{
 for(const route of ["/","/en/"]){
  for(const width of [390,834,1440]){
   const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1});
   try{
    await page.goto("http://127.0.0.1:"+server.address().port+route,{waitUntil:"domcontentloaded",timeout:30000});
    await page.evaluate(()=>document.fonts?.ready);
    const info=await page.evaluate(()=>{
      const weight=e=>e&&getComputedStyle(e).fontWeight;
      const first=(q)=>document.querySelector(q);
      const nav=first(".header .header__nav > ul > li > a");
      const cta=first(".header .header__btn .btn__text")||first(".block-title .content .btn .btn__text");
      const numbers=[...document.querySelectorAll(".block-title .info.desctop .list > .item .item__number, .block-title-continue .info .list > .item .item__number, .block-title-mobile .info .list > .item .item__number")]
        .filter(e=>e.getClientRects().length>0).map(e=>({text:e.textContent.trim(),weight:weight(e),
          spans:[...e.querySelectorAll("span")].map(weight),
          variation:getComputedStyle(e).fontVariationSettings}));
      const labels=[...document.querySelectorAll(".block-title .info.desctop .list > .item .item__text, .block-title-continue .info .list > .item .item__text, .block-title-mobile .info .list > .item .item__text")]
        .filter(e=>e.getClientRects().length>0).map(weight);
      return {navWeight:weight(nav),ctaWeight:weight(cta),
        numbers,labels,bodyMargin:getComputedStyle(document.body).margin,
        rootScrollbar:getComputedStyle(document.documentElement).scrollbarWidth,
        pageWidth:document.documentElement.scrollWidth,viewport:innerWidth};
    });
    if(width>768)assert.equal(info.navWeight,"500","Main navigation medium "+route+" @"+width);
    assert.equal(info.ctaWeight,"500","Header CTA should be medium "+route+" @"+width);
    assert.ok(info.numbers.length>=5,"Five hero numbers exist "+route+" @"+width);
    for(const n of info.numbers){assert.equal(n.weight,"300","Hero number lightweight "+route+" @"+width+" "+n.text);for(const w of n.spans)assert.equal(w,"300","Nested hero number same axis "+n.text);}
    for(const w of info.labels)assert.equal(w,"400","Hero label regular "+route+" @"+width);
    assert.equal(info.bodyMargin,"0px","Approved first-paint guard retained");
    if(width>768)assert.equal(info.rootScrollbar,"none","Source scrollbar behavior retained");
    assert.ok(info.pageWidth<=width+2,"No horizontal overflow");
    reports.push({route,width,...info});
   }finally{await page.close();}
  }
 }
}finally{await browser.close();await new Promise(r=>server.close(r));}
await fs.mkdir("audit-artifacts",{recursive:true});
await fs.writeFile("audit-artifacts/hero-type-weights.json",JSON.stringify({schema:"bioa-type-mvr1",reports},null,2));
console.log("BIOA_VARIABLE_FONT_WEIGHT_PARITY "+JSON.stringify(reports.map(r=>({route:r.route,width:r.width,nav:r.navWeight,cta:r.ctaWeight,numberWeights:[...new Set(r.numbers.map(n=>n.weight))],labelWeights:[...new Set(r.labels)]}))));
