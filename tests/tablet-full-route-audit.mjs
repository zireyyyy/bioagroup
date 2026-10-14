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
const routes=['/','/about/','/contract-manufacturing-cosmetics/','/dich-vu-khac/','/blog/','/blog/gia-cong-kem-tri-tham-nhu-hoa-giai-phap-lam-hong-vung-nhay-cam-chuyen-sau/','/contacts/','/404.html'];
const widths=[768,834,1024,1180]; // 768 boundary plus source-fluid Tablet widths
const output=[];
let failures=0;
const visualDir='audit-artifacts/tablet-phase2/visual';
await mkdir(visualDir,{recursive:true});
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
try{
 for(const route of routes)for(const lang of ['vi','en'])for(const width of widths){
  const pathname=lang==='en'?'/en'+(route==='/'?'/':route):route;
  const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1});
  const runtimeErrors=[];
  // Playwright String(error) can return "Object", hiding the actual exception.
  // Preserve message, stack and enumerable details, without logging page input values.
  page.on('pageerror',e=>{
   let details='';
   try{details=JSON.stringify(e,Object.getOwnPropertyNames(e)).slice(0,500);}catch{}
   runtimeErrors.push({name:e?.name||null,message:e?.message||String(e),stack:e?.stack?.slice(0,600)||null,details});
  });
  try{
   const response=await page.goto(origin+pathname,{waitUntil:'domcontentloaded',timeout:20000});
   await page.locator('body').waitFor({state:'attached',timeout:5000});
   const report=await page.evaluate(()=>{
    const rect=selector=>{const e=document.querySelector(selector);if(!e)return null;const r=e.getBoundingClientRect();return {x:Math.round(r.x),y:Math.round(r.y),w:Math.round(r.width),h:Math.round(r.height)};};
    const overflowElements=[...document.querySelectorAll('body *')].map(e=>{
     const r=e.getBoundingClientRect();
     if(r.width===0||!(r.left< -16||r.right>innerWidth+16))return null;
     let node=e.parentElement,clip=null;
     while(node&&node!==document.documentElement){
      const cs=getComputedStyle(node);
      if(/hidden|clip|auto|scroll/.test(cs.overflowX)){
       const ar=node.getBoundingClientRect();
       if(ar.width>0&&ar.width<=innerWidth+4){clip={tag:node.tagName,cls:typeof node.className==='string'?node.className.slice(0,55):'',overflow:cs.overflowX};break;}
      }
      node=node.parentElement;
     }
     return {tag:e.tagName,cls:typeof e.className==='string'?e.className.slice(0,70):'',left:Math.round(r.left),right:Math.round(r.right),clippedBy:clip};
    }).filter(Boolean);
    const navLinks=[...document.querySelectorAll('.header__nav > ul > li > a')].filter(e=>getComputedStyle(e).display!=='none'&&e.getBoundingClientRect().width>0);
    const navRows=[...new Set(navLinks.map(e=>Math.round(e.getBoundingClientRect().top)))];
    const footerText=document.querySelector('html[lang="en"] .bioa-footer-company-info--desktop .bioa-footer-company-info__title');
    return {lang:document.documentElement.lang,viewport:innerWidth,docWidth:document.documentElement.scrollWidth,
     header:rect('.header__wrapper'),nav:rect('.header__nav'),actions:rect('.bioa-header-actions'),
     navRows:navRows.length,footer:rect('.footer-top__wrapper'),
     footerTitleOverflow:footerText?footerText.scrollWidth>footerText.clientWidth+2:false,
     cookie:rect('#mw-consent'),chat:rect('.bioa-contact-fab__toggle'),
     overflowTotal:overflowElements.length,
     clippedOffscreen:overflowElements.filter(x=>x.clippedBy).length,
     unclassifiedOffscreen:overflowElements.filter(x=>!x.clippedBy).slice(0,6)};
   });
   const result={route:pathname,width,status:response?.status()||0,...report,runtimeErrors};
   output.push(result);
   // Save representative visual QA evidence WITHOUT changing the page or user state.
   // Screenshots are advisory for owner QA, not visual PASS.
   if((width===834||width===1024)&&response?.status()===200){
    const filename=pathname.replace(/[^a-z0-9]+/gi,'-').replace(/^-|-$/g,'').slice(0,90);
    try{
      // Capture untouched first visit as a separate, explicitly labeled state.
      await page.screenshot({path:visualDir+'/'+filename+'-'+width+'-first-visit.png',animations:'disabled',timeout:12000});
      // On this throwaway local test page only, exercise the existing source
      // Reject/deny control. Never set a fake consent flag or patch runtime DOM.
      const deny=page.locator('#mw-consent .mw-deny').first();
      if(await deny.count()&&await deny.isVisible()){
        try{await deny.click({timeout:3500});result.cookieDenyInteraction='clicked';}
        catch(e){result.cookieDenyInteraction='unavailable: '+String(e).slice(0,160);}
      }else result.cookieDenyInteraction='not visible';
      await page.screenshot({path:visualDir+'/'+filename+'-'+width+'-content.png',animations:'disabled',timeout:12000});
      const footer=page.locator('.footer-top').first();
      if(await footer.count()){
        // Merywood footer uses scroll-triggered reveal. Capture after actually
        // entering viewport, unlike the old off-screen element screenshot.
        await footer.scrollIntoViewIfNeeded({timeout:5000});
        await page.waitForTimeout(850);
        await footer.screenshot({path:visualDir+'/'+filename+'-'+width+'-footer-scrolled.png',animations:'disabled',timeout:12000});
      }
    }catch(e){result.visualCaptureWarning=String(e).slice(0,260);}
   }
   if(result.status!==200||(route!=='/404.html'&&(!result.header||!result.footer))||result.docWidth>width+2)failures++;
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
assert.equal(failures,0,'Tablet routes, page width and shared shell are valid; inspect route-matrix.json for warnings');
