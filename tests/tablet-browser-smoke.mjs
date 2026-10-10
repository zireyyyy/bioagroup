import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {resolve, extname, sep} from 'node:path';
import {chromium} from 'playwright';

const root=resolve('dist');
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.png':'image/png','.webp':'image/webp','.svg':'image/svg+xml','.avif':'image/avif','.json':'application/json','.woff2':'font/woff2'};
const server=createServer(async(req,res)=>{
 const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
 let file=resolve(root,'.'+(pathname.endsWith('/')?pathname+'index.html':pathname));
 if(!file.startsWith(root+sep)&&file!==root){res.writeHead(403);res.end();return;}
 try{const body=await readFile(file);res.writeHead(200,{'content-type':types[extname(file)]||'application/octet-stream'});res.end(body);}
 catch{res.writeHead(404);res.end('not found');}
});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
const address=server.address();
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
try {
 const measurements=new Map();
 for(const width of [390,768,769,820,834,1024,1180,1280,1440]){
   const page=await browser.newPage({viewport:{width,height:820},deviceScaleFactor:1});
   const clientErrors=[];
   page.on('pageerror',e=>clientErrors.push(String(e).slice(0,200)));
   await page.goto('http://127.0.0.1:'+address.port+'/',{waitUntil:'domcontentloaded',timeout:30000});
   await page.waitForSelector('.header__wrapper',{timeout:12000});
   await page.evaluate(()=>document.fonts?.ready);
   const diagnostic=await page.evaluate(()=>{
     const list=[
       'html','body','.header','.header__wrapper','.header__inner','.header__logo','.header__logo img',
       '.header__nav','.header__nav ul','.header__nav ul li a','.bioa-header-actions',
       '.header__email','.header__email a','.header__btn','.bioa-lang','.bioa-lang a',
       '.header__socials .socials__link','.block-title','.block-title .content',
       '.block-title .content .text-large','.block-title .info.desctop',
       '.block-title .info .item',
       '.whatsapp-wrapper','.whatsapp','.whatsapp__content','.whatsapp__title',
       '.whatsapp__description','.whatsapp__btn','.whatsapp__btn .btn__text',
       '.block-product-formats .formats','.block-product-formats .formats__tab',
       '.block-product-formats .formats__cta-title','.block-product-formats .formats__cta-btn',
       '.footer-top','.footer-top__wrapper','.footer-top__left','.footer-top__logo img',
       '.footer-top__menu','.footer-top__nav','.footer-top__nav > ul > li:not(:first-child) > a',
       '.footer-top__right','.footer-top__email','.footer-top__email a','.footer-top__socials',
       '.footer-top__socials a[aria-label="Zalo"]','.footer-top__socials .bioa-zalo-icon',
       '.footer-top__socials a[aria-label="WhatsApp"]'
     ];
     const values={};
     for(const sel of list){
       const e=document.querySelector(sel);if(!e){values[sel]=null;continue;}
       const st=getComputedStyle(e),r=e.getBoundingClientRect();
       values[sel]={
          w:+r.width.toFixed(1),h:+r.height.toFixed(1),
          x:+r.x.toFixed(1),y:+r.y.toFixed(1),
          font:+parseFloat(st.fontSize).toFixed(2),
          line:st.lineHeight,display:st.display,
          position:st.position,opacity:st.opacity,
          overflowX:st.overflowX,flex:st.flex,grid:st.gridTemplateColumns,
          scroll:e.scrollWidth,client:e.clientWidth
       };
     }
     const offenders=Array.from(document.body.querySelectorAll('*')).map(e=>{
        let r=e.getBoundingClientRect();return {tag:e.tagName,cl:e.className?.baseVal||e.className||'',x:r.x,right:r.right,w:r.width}
     }).filter(x=>typeof x.cl==='string' && x.w>0 && (x.right>innerWidth+12 || x.x< -12))
        .sort((a,b)=>b.right-a.right).slice(0,15);
     return {width:innerWidth,docW:document.documentElement.scrollWidth,bodyW:document.body.scrollWidth,
       values,offenders};
   });
   console.log('TABLET_RATIO_AUDIT '+JSON.stringify({diagnostic,clientErrors}));
   measurements.set(width,diagnostic);
   await page.close();
 }
 /* Compare with the approved 1440px Desktop component dimensions, not
    arbitrary minimum type sizes. BIO-A's bottom CTA must shrink at roughly
    the SAME rate as the Desktop source component. */
 const desktop=measurements.get(1440);
 for(const width of [769,820,834,1024,1180]){
   const cur=measurements.get(width);
   assert.equal(cur.docW,width,'no document horizontal overflow @'+width);
   for(const selector of ['.whatsapp','.whatsapp__title','.whatsapp__btn']){
     const tablet=cur.values[selector],source=desktop.values[selector];
     assert.ok(tablet&&source,'CTA component present '+selector);
     const metric=selector==='.whatsapp__title'?'font':'h';
     const ratio=tablet[metric]/source[metric];
     const expected=width/1440;
     console.log('SOURCE_PARITY_RATIO '+JSON.stringify({width,selector,ratio,expected,actual:tablet[metric],desktop:source[metric]}));
     assert.ok(ratio>expected*.84 && ratio<expected*1.16,
       selector+' must shrink proportionally to the desktop reference @'+width);
   }
   const email=cur.values['.header__email a'],button=cur.values['.header__btn'];
   assert.ok(email&&button&&Math.abs(email.h-button.h)<2,'Header contact alignment @'+width);
 }
} finally {
 await browser.close();
 await new Promise(r=>server.close(r));
}
