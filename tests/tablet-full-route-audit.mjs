/** Phase 2, read-only Tablet route audit; diagnostics do not equal owner visual PASS. */
import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {readFile,mkdir,writeFile} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
import {chromium} from 'playwright';

const root=resolve('dist');
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.avif':'image/avif','.woff':'font/woff','.woff2':'font/woff2'};
const server=createServer(async(req,res)=>{
 const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
 const file=resolve(root,'.'+(pathname.endsWith('/')?pathname+'index.html':pathname));
 if(!file.startsWith(root+sep)){res.writeHead(403).end();return;}
 try{const data=await readFile(file);res.writeHead(200,{'content-type':types[extname(file)]||'application/octet-stream'}).end(data);}
 catch{res.writeHead(404).end('not found');}
});
await new Promise(done=>server.listen(0,'127.0.0.1',done));
const origin='http://127.0.0.1:'+server.address().port;
const routes=['/','/about/','/contract-manufacturing-cosmetics/','/dich-vu-khac/','/blog/','/contacts/'];
const widths=[768,834,1024,1180]; // 768 boundary plus source-fluid Tablet widths
const output=[];
let failures=0;
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
try{
 for(const route of routes)for(const lang of ['vi','en'])for(const width of widths){
  const pathname=lang==='en'?'/en'+(route==='/'?'/':route):route;
  const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1});
  const runtimeErrors=[];
  page.on('pageerror',e=>runtimeErrors.push(String(e).slice(0,240)));
  try{
   const response=await page.goto(origin+pathname,{waitUntil:'domcontentloaded',timeout:20000});
   await page.locator('body').waitFor({state:'attached',timeout:5000});
   const report=await page.evaluate(()=>{
    const rect=selector=>{const e=document.querySelector(selector);if(!e)return null;const r=e.getBoundingClientRect();return {x:Math.round(r.x),y:Math.round(r.y),w:Math.round(r.width),h:Math.round(r.height)};};
    const exceptions=[...document.querySelectorAll('body *')].map(e=>{
     const r=e.getBoundingClientRect();
     return {tag:e.tagName,cls:typeof e.className==='string'?e.className.slice(0,80):'',left:Math.round(r.left),right:Math.round(r.right)};
    }).filter(x=>x.left< -16||x.right>innerWidth+16).slice(0,8);
    return {lang:document.documentElement.lang,viewport:innerWidth,docWidth:document.documentElement.scrollWidth,
     header:rect('.header__wrapper'),nav:rect('.header__nav'),footer:rect('.footer-top__wrapper'),
     cookie:rect('#mw-consent'),chat:rect('.bioa-contact-fab__toggle'),offenders:exceptions};
   });
   const result={route:pathname,width,status:response?.status()||0,...report,runtimeErrors};
   output.push(result);
   if(result.status!==200||!result.header||!result.footer)failures++;
   console.log('TABLET_PHASE2 '+JSON.stringify(result));
  }catch(error){failures++;output.push({route:pathname,width,error:String(error)});console.log('TABLET_PHASE2_ERROR '+pathname+' '+width+' '+String(error));}
  finally{await page.close();}
 }
}finally{
 await mkdir('audit-artifacts/tablet-phase2',{recursive:true});
 await writeFile('audit-artifacts/tablet-phase2/route-matrix.json',JSON.stringify({sourceCommit:process.env.GITHUB_SHA||null,ownerVisualPass:false,failures,results:output},null,2));
 await browser.close();
 await new Promise(done=>server.close(done));
}
assert.equal(failures,0,'Tablet routes and shared shell exist; inspect route-matrix.json for visual warnings');
