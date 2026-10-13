import assert from "node:assert/strict";
import {createServer} from "node:http";
import {readFile} from "node:fs/promises";
import {resolve,extname,sep} from "node:path";
import {chromium} from "playwright";

const root=resolve("dist");
const mime={".html":"text/html; charset=utf-8",".css":"text/css; charset=utf-8",".js":"text/javascript; charset=utf-8",".png":"image/png",".svg":"image/svg+xml"};
const server=createServer(async(req,res)=>{
  let pathname=decodeURIComponent(new URL(req.url,"http://localhost").pathname);
  const file=resolve(root,"."+(pathname.endsWith("/")?pathname+"index.html":pathname));
  if(!file.startsWith(root+sep)){res.writeHead(403);res.end();return;}
  try{const body=await readFile(file);res.writeHead(200,{"content-type":mime[extname(file)]||"application/octet-stream"});res.end(body);}
  catch{res.writeHead(404);res.end("not found");}
});
await new Promise(r=>server.listen(0,"127.0.0.1",r));
const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
try{
  for(const route of ["/","/en/","/about/","/en/about/"]){
    for(const width of [390,768,769,834,1024,1440]){
      const page=await browser.newPage({viewport:{width,height:840},deviceScaleFactor:1});
      await page.addInitScript(()=>{
        window.__bioaLayoutShifts=[];
        new PerformanceObserver(list=>{
          for(const entry of list.getEntries())if(!entry.hadRecentInput){
            window.__bioaLayoutShifts.push({value:entry.value,
              sources:(entry.sources||[]).map(s=>s.node?.nodeName||"unknown")});
          }
        }).observe({type:"layout-shift",buffered:true});
      });
      await page.goto("http://127.0.0.1:"+server.address().port+route,{waitUntil:"domcontentloaded",timeout:30000});
      const measurement=await page.evaluate(()=>{
        const html=getComputedStyle(document.documentElement);
        return {
          bodyMargin:getComputedStyle(document.body).margin,
          scrollbarWidth:html.scrollbarWidth,
          rootScrollbarGutter:html.scrollbarGutter,
          width:innerWidth,
          nativeScrollWidth:document.documentElement.scrollWidth,
          shifts:window.__bioaLayoutShifts||[]
        };
      });
      assert.equal(measurement.bodyMargin,"0px","no UA 8px margin at paint: "+route+" @"+width);
      if(width>=769)assert.equal(measurement.scrollbarWidth,"none","desktop fluid keeps native scrollbar gutter suppressed");
      else assert.notEqual(measurement.scrollbarWidth,"none","mobile native-scroll owner preserved");
      console.log("FIRST_PAINT_BROWSER "+JSON.stringify({route,width,...measurement}));
      await page.close();
    }
  }
}finally{await browser.close();await new Promise(r=>server.close(r));}
