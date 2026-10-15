/** Phase 2 Tablet Blog detail TOC interaction QA, read-only and source-first.
 * Do not change Scrollbar, sticky CSS, consent mechanics, or private APIs.
 */
import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
import {chromium} from 'playwright';
const root=resolve('dist');
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.avif':'image/avif','.woff2':'font/woff2'};
const server=createServer(async(req,res)=>{
 const path=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
 const file=resolve(root,'.'+(path.endsWith('/')?path+'index.html':path));
 if(!file.startsWith(root+sep)){res.writeHead(403).end();return;}
 try{const bytes=await readFile(file);res.writeHead(200,{'content-type':types[extname(file)]||'application/octet-stream'}).end(bytes)}
 catch{if(!res.headersSent)res.writeHead(404).end('not found');else res.end()}
});
await new Promise(done=>server.listen(0,'127.0.0.1',done));
const origin='http://127.0.0.1:'+server.address().port;
const slug='gia-cong-kem-tri-tham-nhu-hoa-giai-phap-lam-hong-vung-nhay-cam-chuyen-sau';
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const results=[];
try{
 for(const lang of ['vi','en'])for(const width of [390,834,1024,1440]){
  const route=(lang==='en'?'/en':'')+'/blog/'+slug+'/';
  const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1});
  try{
   const response=await page.goto(origin+route,{waitUntil:'domcontentloaded',timeout:30000});
   assert.equal(response?.status(),200,route+' page returns HTTP 200');
   const struct=await page.evaluate(()=>{
    const links=[...document.querySelectorAll('.bb-toc__list a[href^="#"]')];
    const targets=links.map(link=>{
      const id=decodeURIComponent(link.getAttribute('href').slice(1));
      const el=document.getElementById(id);
      return {id,linkText:link.textContent.trim(),found:!!el,
       withinArticle:!!el?.closest('.bb-content-col'),text:el?.textContent.trim().slice(0,120)||null};
    });
    const toc=document.querySelector('.bb-toc');
    const sticky=document.querySelector('.bb-toc__inner')||toc;
    const c=sticky?getComputedStyle(sticky):null;
    return {tocCount:links.length,targets,sticky:{selector:sticky?.className||null,position:c?.position||null,top:c?.top||null},
      docWidth:document.documentElement.scrollWidth,viewport:innerWidth};
   });
   assert.ok(struct.tocCount>=3,route+' has TOC with at least 3 links');
   assert.ok(struct.targets.every(x=>x.found&&x.withinArticle),route+' all TOC anchors resolve to article section headings');
   assert.ok(struct.docWidth<=width+2,route+' does not overflow horizontally');
   if(width===834||width===1024){
    const rects=await page.evaluate(()=>{
      const toc=document.querySelector('.block-blog-body .bb-toc');
      const content=document.querySelector('.block-blog-body .bb-content-col');
      if(!toc||!content)return null;
      const t=toc.getBoundingClientRect(),c=content.getBoundingClientRect();
      return {tocLeft:t.left,tocRight:t.right,articleLeft:c.left,articleRight:c.right,overlap:t.right>c.left-4,transform:getComputedStyle(toc).transform};
    });
    assert.ok(rects,route+' has TOC and article');
    assert.equal(rects.overlap,false,route+' Tablet TOC must have its own reserved column');
    assert.equal(rects.transform,'none',route+' Tablet TOC must not inherit Merywood scroll fixer transform');
    console.log('BIOA_TABLET_TOC_GEOMETRY '+JSON.stringify({route,width,...rects}));
   }
   const record={route,width,struct,interaction:{status:'not attempted'}};
   const last=page.locator('.bb-toc__list a[href^="#"]').last();
   if(width>768&&await last.isVisible()){
    // Test the actual Merywood link, without injecting any scroll code.
    await last.scrollIntoViewIfNeeded({timeout:7000});
    const linkId=await last.getAttribute('href');
    const before=await page.evaluate(id=>{const e=document.getElementById(id.slice(1));return e?.getBoundingClientRect().top??null;},linkId);
    await last.click({timeout:7000});
    await page.waitForTimeout(800);
    const after=await page.evaluate(id=>{const e=document.getElementById(id.slice(1));return e?.getBoundingClientRect().top??null;},linkId);
    const hash=await page.evaluate(()=>location.hash);
    const moved=before!==null&&after!==null&&Math.abs(before-after)>100;
    record.interaction={status:'clicked',before,after,hash,moved,target:linkId};
    // Store observed native/source scrolling separately from structure.
    // Do not declare a visual PASS based on an anchor hash alone.
   }else record.interaction={status:'not-visible-or-mobile-source-mode'};
   results.push(record);
   console.log('BIOA_TABLET_TOC '+JSON.stringify(record));
  }catch(e){results.push({route,width,error:String(e)});console.log('BIOA_TABLET_TOC_ERROR '+route+' '+width+' '+String(e));process.exitCode=1}
  finally{await page.close()}
 }
}finally{
 await mkdir('audit-artifacts/tablet-phase2',{recursive:true});
 await writeFile('audit-artifacts/tablet-phase2/blog-toc-interactions.json',JSON.stringify({ownerVisualPass:false,scope:'Blog detail source component only',results},null,2));
 await browser.close();
 await new Promise(done=>server.close(done));
}
