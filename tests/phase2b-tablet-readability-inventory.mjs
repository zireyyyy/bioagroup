/** Targeted Phase2B readability & canonical icon audit.
 * Read-only, no live leads, no styles edited by script. */
import {chromium} from "playwright";
import {createServer} from "node:http";
import {readFile} from "node:fs/promises";
import {resolve,sep,extname} from "node:path";
const root=resolve("dist");
const types={".html":"text/html; charset=utf-8",".js":"text/javascript",".css":"text/css",".woff2":"font/woff2",".svg":"image/svg+xml",".png":"image/png",".webp":"image/webp",".avif":"image/avif"};
const server=createServer(async(req,res)=>{
 const u=new URL(req.url,"http://localhost");
 const f=resolve(root,"."+(u.pathname.endsWith("/")?u.pathname+"index.html":u.pathname));
 if(!f.startsWith(root+sep)){res.writeHead(403).end();return}
 try{const data=await readFile(f);res.writeHead(200,{"content-type":types[extname(f)]||"application/octet-stream"}).end(data)}
 catch{if(!res.headersSent)res.writeHead(404).end("missing");else res.end()}
});
await new Promise(resolve=>server.listen(0,"127.0.0.1",resolve));
const origin="http://127.0.0.1:"+server.address().port;
const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
const paths=["/","/about/","/contract-manufacturing-cosmetics/","/dich-vu-khac/","/blog/","/contacts/"];
try{
 for(const path of paths)for(const lang of ["vi","en"])for(const width of [834,1024]){
  const route=(lang==="vi"?"":"/en")+path;
  const page=await browser.newPage({viewport:{width,height:880}});
  try{
   await page.goto(origin+route,{waitUntil:"domcontentloaded",timeout:25000});
   const data=await page.evaluate(()=>{
    const samples=[];
    const all=document.querySelectorAll(".page-main h1,.page-main h2,.page-main h3,.page-main h4,.page-main p,.page-main li,.page-main a,.page-main .text,.page-main .title,.page-main .step__text,.page-main .client__description,.block-how-works .step__title,.block-reviews .review__text,.block-product-formats .formats__description,.block-product-formats .formats__item,.footer-top__nav a");
    for(const el of all){
      if(samples.length>1800)break;
      const txt=el.textContent?.replace(/\s+/g," ").trim()||"";
      if(txt.length<10||txt.length>350)continue;
      const cs=getComputedStyle(el),rect=el.getBoundingClientRect();
      if(cs.display==="none"||cs.visibility==="hidden"||rect.width<10||rect.height<3)continue;
      const font=parseFloat(cs.fontSize);if(!Number.isFinite(font))continue;
      samples.push({font:+font.toFixed(2),weight:cs.fontWeight,lh:cs.lineHeight,tag:el.tagName.toLowerCase(),cl:typeof el.className==="string"?el.className.slice(0,90):"",text:txt.slice(0,65)});
    }
    const images=[];
    for(const node of document.querySelectorAll("#why-choose-us img,.block-how-works .step__icon img,.block-right-choice .client__icon img")){
      const box=node.getBoundingClientRect(),par=node.parentElement?.getBoundingClientRect();
      const c=getComputedStyle(node);
      const css=node.parentElement?getComputedStyle(node.parentElement):null;
      images.push({src:node.getAttribute("src")?.slice(-72),class:node.className,img:[+box.width.toFixed(1),+box.height.toFixed(1)],parent:par?[+par.width.toFixed(1),+par.height.toFixed(1)]:null,css:[c.width,c.height,c.objectFit],parentCSS:css?[css.display,css.overflow]:null});
    }
    const small=samples.filter(x=>x.font<11);
    return {sampleCount:samples.length,smallCount:small.length,lowest:small.sort((a,b)=>a.font-b.font).slice(0,14),distribution:Object.entries(samples.reduce((a,x)=>{const k=String(x.font);a[k]=(a[k]||0)+1;return a},{})).sort((a,b)=>Number(a[0])-Number(b[0])).slice(0,15),images:images.slice(0,14)};
   });
   console.log("BIOA_TABLET_READABILITY "+JSON.stringify({route,width,...data}).slice(0,8200));
  }catch(err){console.log("BIOA_TABLET_READABILITY_FAIL "+route+" "+width+" "+String(err))}
  finally{await page.close()}
 }
}finally{await browser.close();await new Promise(done=>server.close(done))}
