/**
 * Read-only browser audit. Computed style is reported, NOT interpreted as
 * exact Merywood parity without a verified original CSS version.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { createServer } from "node:http";
import { chromium } from "playwright";
const root=path.resolve("dist");
const out=path.resolve("audit-artifacts");
const mime={".html":"text/html; charset=utf-8",".js":"text/javascript; charset=utf-8",".css":"text/css; charset=utf-8",".png":"image/png",".svg":"image/svg+xml",".webp":"image/webp",".avif":"image/avif",".woff2":"font/woff2"};
const server=createServer(async(req,res)=>{
 const loc=new URL(req.url,"http://localhost").pathname;
 let pathname;
 try{pathname=decodeURIComponent(loc);}catch{res.writeHead(400);res.end();return;}
 const file=path.resolve(root,"."+ (pathname.endsWith("/")?pathname+"index.html":pathname));
 if(!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
 try{const buf=await fs.readFile(file);res.writeHead(200,{"Content-Type":mime[path.extname(file)]||"application/octet-stream"});res.end(buf);}
 catch{res.writeHead(404);res.end("not found");}
});
await new Promise(resolve=>server.listen(0,"127.0.0.1",resolve));
const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
const widths=[390,768,769,834,1024,1180,1440];
const routes=["/","/en/","/about/","/en/about/","/contract-manufacturing-cosmetics/","/en/contract-manufacturing-cosmetics/","/dich-vu-khac/","/en/dich-vu-khac/","/blog/","/en/blog/","/contacts/","/en/contacts/"];
const selectors=[
 ".header__logo img",".header__nav",".header__email a",".header__socials .socials__link",".bioa-lang",
 ".footer-top__wrapper",".footer-top__menu",".footer-top__logo img",".footer-top__socials a[aria-label='Zalo']",
 ".footer-top__socials .bioa-zalo-icon",".bioa-contact-fab__toggle",".whatsapp__content",".whatsapp__btn",
 ".mwa-hero",".block-we-produce",".block-product-formats"
];
const reports=[];
try{
 for(const route of routes){
  try{await fs.access(path.join(root,route,"index.html"));}catch{continue;}
  for(const width of widths){
   const page=await browser.newPage({viewport:{width,height:840},deviceScaleFactor:1});
   const failed=[];
   page.on("requestfailed",req=>{
     const u=new URL(req.url());
     failed.push({host:u.host,path:u.pathname,error:req.failure()?.errorText||"unknown"});
   });
   let navError=null;
   try{
     await page.goto("http://127.0.0.1:"+server.address().port+route,{waitUntil:"domcontentloaded",timeout:18000});
     await page.evaluate(()=>document.fonts?.ready);
   }catch(err){navError=String(err).slice(0,220);}
   let diagnostic=null;
   if(!navError){
    diagnostic=await page.evaluate((sels)=>{
     const entries={};
     for(const selector of sels){
       const e=document.querySelector(selector);if(!e){entries[selector]=null;continue;}
       const r=e.getBoundingClientRect(),s=getComputedStyle(e);
       const inlineCandidates=[];
       for(const sheet of document.styleSheets){
         const node=sheet.ownerNode,id=node?.id||"";
         if(!id.startsWith("bioa-"))continue;
         let list;
         try{list=sheet.cssRules;}catch{continue;}
         const scan=rules=>{
           for(const rule of rules){
             if(rule.cssRules){
               if(rule.conditionText && rule.type===CSSRule.MEDIA_RULE && !matchMedia(rule.conditionText).matches)continue;
               scan(rule.cssRules);continue;
             }
             if(!rule.selectorText||!rule.style)continue;
             let matches=false;
             try{matches=e.matches(rule.selectorText);}catch{}
             if(!matches)continue;
             const changes={};
             for(const prop of ["width","height","font-size","display","object-fit","color","background-color","opacity","flex-basis","grid-template-columns"]){
               const value=rule.style.getPropertyValue(prop);
               if(value)changes[prop]={value,important:rule.style.getPropertyPriority(prop)==="important"};
             }
             if(Object.keys(changes).length)inlineCandidates.push({owner:id,selector:rule.selectorText.slice(0,210),changes});
           }
         };
         scan(list);
       }
       entries[selector]={x:+r.x.toFixed(2),y:+r.y.toFixed(2),w:+r.width.toFixed(2),h:+r.height.toFixed(2),
         css:{fontSize:s.fontSize,display:s.display,width:s.width,height:s.height,objectFit:s.objectFit,
           color:s.color,backgroundColor:s.backgroundColor,opacity:s.opacity,gridTemplateColumns:s.gridTemplateColumns},
         image:e instanceof HTMLImageElement?{complete:e.complete,naturalWidth:e.naturalWidth,naturalHeight:e.naturalHeight,currentSrc:e.currentSrc?new URL(e.currentSrc).pathname:null}:null,
         matchingInlineRules:inlineCandidates.slice(-16)};
     }
     return {documentWidth:document.documentElement.scrollWidth,viewportWidth:innerWidth,
       styles:[...document.styleSheets].map(s=>({owner:s.ownerNode?.id||"",url:s.href?new URL(s.href).pathname:null,
         accessible:(()=>{try{return s.cssRules.length>=0}catch{return false}})()})),
       entries};
    },selectors);
   }
   reports.push({route,width,navError,failedRequests:failed.slice(0,15),diagnostic});
   await page.close();
  }
 }
}finally{await browser.close();await new Promise(r=>server.close(r));}
await fs.mkdir(out,{recursive:true});
await fs.writeFile(path.join(out,"computed-styles-readonly.json"),JSON.stringify({schema:"bioa-browser-audit/v1",generatedAt:new Date().toISOString(),viewports:widths,observations:reports},null,2)+"\n");
console.log("BIOA_READONLY_BROWSER_AUDIT "+JSON.stringify({observations:reports.length,navErrors:reports.filter(r=>r.navError).map(r=>({route:r.route,width:r.width,error:r.navError})).slice(0,14),overflow:reports.filter(r=>r.diagnostic && r.diagnostic.documentWidth>r.width+1).map(r=>({route:r.route,width:r.width,scrollWidth:r.diagnostic.documentWidth})).slice(0,15)}));
