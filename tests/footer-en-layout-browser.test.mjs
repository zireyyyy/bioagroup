/**
 * FOOTER-EN-WRAP1 — browser geometry/first-paint diagnostic.
 * Browser screenshots are evidence, NOT a claim that live owner QA passed.
 * This test MUST NOT edit runtime/HTML/CSS, submit leads or touch Cloudflare.
 */
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import {createServer} from "node:http";
import {chromium} from "playwright";
const root=path.resolve("dist"),output=path.resolve("audit-artifacts/footer-en-wrap");
const mime={".html":"text/html; charset=utf-8",".css":"text/css",".js":"text/javascript",
 ".png":"image/png",".svg":"image/svg+xml",".webp":"image/webp",".woff2":"font/woff2",".avif":"image/avif"};
const server=createServer(async(req,res)=>{
 const pathname=new URL(req.url,"http://localhost").pathname;
 const file=path.resolve(root,"."+(pathname.endsWith("/")?pathname+"index.html":pathname));
 if(!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
 try{const bytes=await fs.readFile(file);res.writeHead(200,{"Content-Type":mime[path.extname(file)]||"application/octet-stream"});res.end(bytes);}
 catch{res.writeHead(404);res.end("not found");}
});
await fs.mkdir(output,{recursive:true});
await new Promise(resolve=>server.listen(0,"127.0.0.1",resolve));
const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
const observations=[];
const cases=[
 ["/",1440],["/en/",834],["/en/",1024],["/en/",1280],["/en/",1440],["/en/",1900],
 ["/en/about/",834],["/en/about/",1440],["/en/dich-vu-khac/",1024],["/en/dich-vu-khac/",1440]
];
try{
 for(const [route,width] of cases){
  const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1});
  const fail=[];
  page.on("pageerror",e=>fail.push(String(e).slice(0,160)));
  await page.addInitScript(()=>{
   window.__bioaReadOnlyShifts=[];
   try{new PerformanceObserver(list=>{
     for(const e of list.getEntries()){
      if(e.hadRecentInput)continue;
      window.__bioaReadOnlyShifts.push({time:+e.startTime.toFixed(1),value:e.value,
       sources:(e.sources||[]).slice(0,5).map(s=>({node:s.node?.className?.baseVal||s.node?.className||s.node?.nodeName||"unknown",
         old:s.previousRect?{x:s.previousRect.x,width:s.previousRect.width}:null,
         next:s.currentRect?{x:s.currentRect.x,width:s.currentRect.width}:null}))});
     }
   }).observe({type:"layout-shift",buffered:true})}catch{}
  });
  try{
   await page.goto("http://127.0.0.1:"+server.address().port+route,{waitUntil:"domcontentloaded",timeout:30000});
   const sample=()=>page.evaluate(()=>{
     const title=document.querySelector(".footer-top .bioa-footer-company-info--desktop .bioa-footer-company-info__title");
     const left=document.querySelector(".footer-top .footer-top__left");
     const menu=document.querySelector(".footer-top .footer-top__menu");
     const header=document.querySelector(".header");
     const rect=e=>{if(!e)return null;const r=e.getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height,right:r.right}};
     const sr=title&&getComputedStyle(title);
     return {title:rect(title),left:rect(left),menu:rect(menu),header:rect(header),
       titleClientWidth:title?.clientWidth, titleScrollWidth:title?.scrollWidth,
       titleWhitespace:sr?.whiteSpace, titleOverflowWrap:sr?.overflowWrap,
       bodyMargin:getComputedStyle(document.body).margin,
       rootScrollBar:getComputedStyle(document.documentElement).scrollbarWidth,
       viewport:innerWidth, documentWidth:document.documentElement.scrollWidth,
       shifts:window.__bioaReadOnlyShifts||[]};
   });
   const immediate=await sample();
   await page.evaluate(()=>document.fonts?.ready);
   await page.waitForTimeout(850);
   const settled=await sample();
   const record={route,width,immediate,settled,errors:fail};
   observations.push(record);
   if(route.startsWith("/en/")){
     assert.ok(settled.title && settled.left && settled.menu,"Footer EN geometry "+route+" @"+width);
     assert.equal(await page.locator(".footer-top .bioa-footer-company-info--desktop").first().getAttribute("lang"),"en",
       "Footer company owner has stable EN language even if document lang changes "+route+" @"+width);
     assert.ok(settled.titleScrollWidth<=settled.titleClientWidth+2,
       "Footer EN title spills outside its own block "+route+" @"+width+" "+JSON.stringify(record));
     assert.ok(settled.title.right<=settled.left.right+2,
       "Footer EN title block exceeds identity column "+route+" @"+width);
     assert.ok(settled.left.right<=settled.menu.x+3,
       "Identity and navigation columns overlap "+route+" @"+width);
     if(width>=1201)assert.equal(settled.titleWhitespace,"normal","EN Desktop title must wrap "+route+" @"+width);
     assert.ok(settled.documentWidth<=width+2,"unexpected horizontal scrolling "+route+" @"+width);
   }
   if(width>=769)assert.equal(settled.rootScrollBar,"none","approved first-paint scrollbar behavior unchanged");
   assert.equal(settled.bodyMargin,"0px","approved first-paint margin normalization unchanged");
   if(route==="/en/"&&(width===834||width===1440||width===1900)){
     const footer=page.locator(".footer-top").first();
     if(await footer.count())await footer.screenshot({path:path.join(output,"footer-en-"+width+".png"),animations:"disabled",timeout:15000});
   }
   console.log("BIOA_FOOTER_EN_STABILITY "+JSON.stringify({route,width,title:record.settled.title,
     left:record.settled.left,menu:record.settled.menu,
     titleScrollWidth:record.settled.titleScrollWidth,titleClientWidth:record.settled.titleClientWidth,
     titleWhitespace:record.settled.titleWhitespace,rootScrollBar:record.settled.rootScrollBar,
     shifts:record.settled.shifts.slice(0,12)}));
  }finally{await page.close();}
 }
}finally{
 await fs.writeFile(path.join(output,"metrics.json"),JSON.stringify({schema:"bioa-footer-en-wrap-and-shift/v1",
  baseline:"44879b49c180a5f9433a9a118b9ff9979b329f3d",measurements:observations},null,2));
 await browser.close();await new Promise(resolve=>server.close(resolve));
}
