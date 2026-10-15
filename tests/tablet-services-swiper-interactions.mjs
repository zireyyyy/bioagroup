/** Phase 2 interaction closeout — source-owned Swiper services only.
 * Read-only Chromium QA; no forms, cookie state mutation, or backend calls.
 */
import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
import {chromium} from 'playwright';

const root=resolve('dist');
const mime={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.avif':'image/avif','.woff2':'font/woff2'};
const server=createServer(async(req,res)=>{
 const path=decodeURIComponent(new URL(req.url,'http://127.0.0.1').pathname);
 const file=resolve(root,'.'+(path.endsWith('/')?path+'index.html':path));
 if(!file.startsWith(root+sep)){res.writeHead(403).end();return}
 try{const bytes=await readFile(file);res.writeHead(200,{'content-type':mime[extname(file)]||'application/octet-stream'}).end(bytes)}
 catch{if(!res.headersSent)res.writeHead(404).end('not found');else res.end()}
});
await new Promise(ok=>server.listen(0,'127.0.0.1',ok));
const origin='http://127.0.0.1:'+server.address().port;
const routes=['/contract-manufacturing-cosmetics/','/dich-vu-khac/'];
const widths=[390,834,1024,1440];
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const all=[];
try{
 for(const path of routes)for(const lang of ['vi','en'])for(const width of widths){
  const route=(lang==='en'?'/en':'')+path;
  const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1});
  const issues=[];
  try{
   const res=await page.goto(origin+route,{waitUntil:'domcontentloaded',timeout:30000});
   assert.equal(res?.status(),200,'Source route loads '+route);
   await page.waitForTimeout(900);
   const snap=await page.evaluate(()=>{
    const slides=[...document.querySelectorAll('.swiper')].map((el,i)=>{
      const sw=el.swiper;
      const wrapper=el.querySelector('.swiper-wrapper');
      const sec=el.closest('section')||el.parentElement;
      const controls=[...sec.querySelectorAll('.swiper-button_right,.swiper-button_left,.swiper-button-next,.swiper-button-prev')];
      return {i,className:el.className.slice(0,130),slideCount:wrapper?.children.length||0,
        initialized:!!sw&&!sw.destroyed,activeIndex:sw?.activeIndex??null,
        translate:sw?.translate??null,controls:controls.map(btn=>({
          className:btn.className.slice(0,140),disabled:btn.classList.contains('swiper-button-disabled'),
          visible:!!(btn.offsetWidth||btn.offsetHeight||btn.getClientRects().length)}))};
    });
    return {docWidth:document.documentElement.scrollWidth,viewport:innerWidth,swipers:slides,
      carouselSections:[...document.querySelectorAll('.block-how-works,.block-products,.block-reviews')].map(el=>({cls:el.className.slice(0,100),swipers:el.querySelectorAll('.swiper').length}))};
   });
   assert.ok(snap.docWidth<=width+2,'No service page-wide horizontal scrolling '+route+' '+width);
   assert.ok(snap.swipers.some(sw=>sw.slideCount>=2),'Source Swiper slides retained '+route+' '+width);
   const record={route,width,...snap,interaction:{status:'unavailable'}};
   const clickable=await page.evaluate(()=>{
    const swiper=[...document.querySelectorAll('.swiper')].find(el=>{
      const sec=el.closest('section')||el.parentElement;
      return el.querySelectorAll('.swiper-slide').length>=2&&
        [...sec.querySelectorAll('.swiper-button_right,.swiper-button-next')].some(btn=>{
          const r=btn.getBoundingClientRect(),st=getComputedStyle(btn);
          return r.width>0&&r.height>0&&st.display!=='none'&&st.visibility!=='hidden'&&!btn.classList.contains('swiper-button-disabled');
        });
    });
    if(!swiper)return null;
    const sec=swiper.closest('section')||swiper.parentElement;
    const btn=[...sec.querySelectorAll('.swiper-button_right,.swiper-button-next')].find(e=>{
      const r=e.getBoundingClientRect();return r.width>0&&r.height>0&&!e.classList.contains('swiper-button-disabled');
    });
    if(!btn)return null;
    btn.setAttribute('data-bioa-tablet-audit-target','next');
    swiper.setAttribute('data-bioa-tablet-audit-slider','1');
    const sw=swiper.swiper;
    return {beforeIndex:sw?.activeIndex??null,beforeTranslate:sw?.translate??null,beforeTransform:swiper.querySelector('.swiper-wrapper')?getComputedStyle(swiper.querySelector('.swiper-wrapper')).transform:null};
   });
   if(clickable){
    try{
     const button=page.locator('[data-bioa-tablet-audit-target="next"]').first();
     await button.scrollIntoViewIfNeeded({timeout:5500});
     await button.click({timeout:7000});
     await page.waitForTimeout(750);
     const after=await page.evaluate(()=>{
      const el=document.querySelector('[data-bioa-tablet-audit-slider="1"]'),sw=el?.swiper,wrap=el?.querySelector('.swiper-wrapper');
      return {afterIndex:sw?.activeIndex??null,afterTranslate:sw?.translate??null,afterTransform:wrap?getComputedStyle(wrap).transform:null};
     });
     record.interaction={status:'clicked',...clickable,...after,
       changed:(clickable.beforeIndex!==null&&clickable.beforeIndex!==after.afterIndex)||
         (clickable.beforeTranslate!==null&&clickable.beforeTranslate!==after.afterTranslate)||
         (clickable.beforeTransform!==after.afterTransform)};
     if(!record.interaction.changed)issues.push('Next arrow clicked but slider state/transform unchanged');
    }catch(err){record.interaction={status:'error',reason:String(err).slice(0,250)};issues.push('Unable to exercise visible source slider next arrow');}
   }else record.interaction={status:'no visible enabled next arrow at this viewport'};
   record.issues=issues;
   all.push(record);
   console.log('BIOA_TABLET_SERVICE '+JSON.stringify(record));
  }catch(err){all.push({route,width,error:String(err)});console.log('BIOA_TABLET_SERVICE_ERROR '+route+' '+width+' '+String(err));process.exitCode=1}
  finally{await page.close()}
 }
}finally{
 await mkdir('audit-artifacts/tablet-phase2',{recursive:true});
 await writeFile('audit-artifacts/tablet-phase2/services-swiper-interactions.json',JSON.stringify({ownerVisualPass:false,results:all},null,2));
 await browser.close();
 await new Promise(done=>server.close(done));
}
if(all.some(x=>x.issues?.length))process.exitCode=1;
