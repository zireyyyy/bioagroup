/**
 * Capture visual evidence from generated source without modifying HTML/CSS.
 * Original Merywood HTML/CSS is not fully pinned, so these are BIO-A
 * viewport comparisons, NOT automatic pixel-perfect Merywood approval.
 */
import fs from "node:fs/promises";
import {createServer} from "node:http";
import path from "node:path";
import {chromium} from "playwright";
const root=path.resolve("dist"),output=path.resolve("audit-artifacts/footer-parity");
const types={".html":"text/html; charset=utf-8",".css":"text/css",".js":"application/javascript",".svg":"image/svg+xml",".webp":"image/webp",".png":"image/png",".woff2":"font/woff2"};
const server=createServer(async(req,res)=>{
 const pathname=new URL(req.url,"http://localhost").pathname;
 const safe=path.resolve(root,"."+(pathname.endsWith("/")?pathname+"index.html":pathname));
 if(!safe.startsWith(root+path.sep)){res.writeHead(403);res.end();return}
 try{let body=await fs.readFile(safe);res.writeHead(200,{"content-type":types[path.extname(safe)]||"application/octet-stream"});res.end(body)}
 catch{res.writeHead(404);res.end("not found")}
});
await fs.mkdir(output,{recursive:true});
await new Promise(r=>server.listen(0,"127.0.0.1",r));
const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
const list=[],widths=[390,768,769,834,1024,1180,1440];
try{
 for(const [route,slug] of [["/","home-vi"],["/en/","home-en"],["/about/","about-vi"],["/en/about/","about-en"],["/dich-vu-khac/","services-vi"],["/en/dich-vu-khac/","services-en"]]){
  for(const width of widths){
   const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1});
   try{
    await page.goto("http://127.0.0.1:"+server.address().port+route,{waitUntil:"domcontentloaded",timeout:30000});
    await page.evaluate(()=>document.fonts?.ready);
    // Capture element rectangles directly. Keep source scrolling and transitions intact.
    for(const [element,selector] of [["footer",".footer-top"],["header",".header"]]){
      const loc=page.locator(selector).first();
      if(!await loc.count())continue;
      const rect=await loc.boundingBox();
      if(!rect||rect.height<1)continue;
      const image=slug+"-"+width+"-"+element+".png";
      await loc.screenshot({path:path.join(output,image),animations:"disabled",timeout:15000});
      list.push({route,width,element,image,rect});
    }
    const metrics=await page.evaluate(()=>{
      const element=document.querySelector(".footer-top__wrapper");
      const socials=[...document.querySelectorAll(".footer-top__socials a")];
      const box=e=>{if(!e)return null;let r=e.getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height}};
      return {footer:box(element),columns:[...document.querySelectorAll(".footer-top__menu .footer-top__nav")].map(box),
        logo:box(document.querySelector(".footer-top__logo img")),
        email:box(document.querySelector(".footer-top__email a")),
        social:socials.map(x=>({name:x.getAttribute("aria-label"),rect:box(x)})),
        documentWidth:document.documentElement.scrollWidth,viewport:innerWidth};
    });
    list.push({route,width,metrics});
   }catch(error){list.push({route,width,error:String(error).slice(0,280)})}
   finally{await page.close()}
  }
 }
}finally{await browser.close();await new Promise(r=>server.close(r))}
await fs.writeFile(path.join(output,"metrics.json"),JSON.stringify({schema:"bioa-footer-visual-evidence/v1",generatedAt:new Date().toISOString(),observations:list},null,2));
console.log("FOOTER_PARITY_VISUAL "+JSON.stringify({screenshots:list.filter(x=>x.image).length,errors:list.filter(x=>x.error).slice(0,12)}));
