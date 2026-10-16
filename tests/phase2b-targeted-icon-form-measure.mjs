/** Read-only scope measurement for owner: Home icon parity, Services, Tablet lead modal.
 * No form submission, no user data, no runtime writes. */
import {createServer} from "node:http";
import {readFile} from "node:fs/promises";
import {resolve,extname,sep} from "node:path";
import {chromium} from "playwright";
const root=resolve("dist"),types={".html":"text/html",".js":"text/javascript",".css":"text/css",".svg":"image/svg+xml",".png":"image/png",".webp":"image/webp",".woff2":"font/woff2"};
const server=createServer(async(req,res)=>{
 const pathname=decodeURIComponent(new URL(req.url,"http://local").pathname);
 const file=resolve(root,"."+(pathname.endsWith("/")?pathname+"index.html":pathname));
 if(!file.startsWith(root+sep)){res.writeHead(403).end();return}
 try{const body=await readFile(file);res.writeHead(200,{"content-type":types[extname(file)]||"application/octet-stream"}).end(body)}catch{if(!res.headersSent)res.writeHead(404).end("not found");else res.end()}
});
await new Promise(done=>server.listen(0,"127.0.0.1",done));
const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
const origin="http://127.0.0.1:"+server.address().port;
const selectors=[
 "#why-choose-us .mobile .item:nth-child(4) img",
 "#why-choose-us .grid.desctop > .item:nth-child(4) img",
 ".block-how-works .swiper-slide:first-child .step__icon img",
 ".block-right-choice .client:first-child .client__icon img",
 ".block-right-choice .client:nth-child(3) .client__icon img",
 "#get-a-quote .cf-modal",
 "#get-a-quote .cf-modal__button",
 "#get-a-quote .cf-modal__title",
 "#get-a-quote form [name='your-name']",
 "#get-a-quote form [name='your-phone']",
 "#get-a-quote #ddType .dd-label",
 "#get-a-quote form .wpcf7-list-item-label"
];
try{
 for(const route of ["/","/dich-vu-khac/","/en/","/en/dich-vu-khac/"])
 for(const width of [390,834,1024]){
  const page=await browser.newPage({viewport:{width,height:880},deviceScaleFactor:1});
  try{
   await page.goto(origin+route,{waitUntil:"domcontentloaded",timeout:30000});
   const result=await page.evaluate(selectors=>{
    const out={};
    for(const sel of selectors){
     const node=document.querySelector(sel);
     if(!node){out[sel]=null;continue;}
     const meta=el=>{
      if(!el)return null;
      const cs=getComputedStyle(el),r=el.getBoundingClientRect();
      return {class:typeof el.className==="string"?el.className.slice(0,110):"",
        w:+r.width.toFixed(1),h:+r.height.toFixed(1),font:cs.fontSize,weight:cs.fontWeight,
        bg:cs.backgroundColor,padding:cs.padding,radius:cs.borderRadius,
        src:el.getAttribute("src")||null,display:cs.display};
     };
     out[sel]={node:meta(node),parent:meta(node.parentElement),placeholder:node.tagName==="INPUT"?getComputedStyle(node,"::placeholder").fontSize:null};
    }
    return out;
   },selectors);
   console.log("BIOA_OWNER_PROBE "+JSON.stringify({route,width,result}));
  }catch(e){console.log("BIOA_OWNER_PROBE_ERROR "+route+" "+width+" "+String(e))}
  finally{await page.close()}
 }
}finally{await browser.close();await new Promise(done=>server.close(done))}
