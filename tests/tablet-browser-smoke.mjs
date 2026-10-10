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
   if(width>=769){
     const iconParity=await page.evaluate(()=>{
       const head=document.querySelector('.header__socials a');
       const footer=document.querySelector('.footer-top__socials a[aria-label="WhatsApp"]');
       const headSvg=head?.querySelector('svg');
       const footSvg=footer?.querySelector('svg');
       const rect=e=>{if(!e)return null;const r=e.getBoundingClientRect();return {w:r.width,h:r.height};};
       return {
         headerSvg:headSvg?.outerHTML||'',
         footerSvg:footSvg?.outerHTML||'',
         headerLink:head?.getAttribute('href'),
         footerLink:footer?.getAttribute('href'),
         headerBox:rect(head),headerArt:rect(headSvg),
         aria:head?.getAttribute('aria-label')
       };
     });
     assert.ok(iconParity.headerSvg.length>100 && iconParity.footerSvg.length>100,
       'Header and Footer WhatsApp SVGs must exist @'+width);
     assert.equal(iconParity.headerSvg,iconParity.footerSvg,
       'Header must reuse approved Footer WhatsApp artwork @'+width);
     assert.equal(iconParity.headerLink,iconParity.footerLink,
       'Header WhatsApp contact URL remains unchanged @'+width);
     assert.ok(iconParity.headerBox && iconParity.headerArt &&
       iconParity.headerArt.w>0 && iconParity.headerArt.h>0 &&
       iconParity.headerArt.w<=iconParity.headerBox.w+1 &&
       iconParity.headerArt.h<=iconParity.headerBox.h+1,
       'Header WhatsApp artwork must fit inside original button @'+width);
     console.log('HEADER_WHATSAPP_PARITY '+JSON.stringify({
       width,svg:'same-as-Footer',href:iconParity.headerLink,
       box:iconParity.headerBox,art:iconParity.headerArt
     }));
   }
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
       '.footer-top__socials a[aria-label="WhatsApp"]','.footer-top__socials a[aria-label="Facebook"]','.footer-top__socials a[aria-label="Telegram"]','.footer-top__socials a[aria-label="WhatsApp"] svg','.footer-top__socials a[aria-label="Zalo"] img','.bioa-contact-fab__toggle','.bioa-chat__teaser'
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
     assert.ok(ratio>expected*.80 && ratio<expected*1.20,
       selector+' must shrink proportionally to the desktop reference @'+width);
   }
   for(const selector of ['.header__logo','.header__logo img','.footer-top__left','.footer-top__email a','.footer-top__socials a[aria-label="Zalo"]','.bioa-contact-fab__toggle']){
     const tablet=cur.values[selector],reference=desktop.values[selector];
     assert.ok(tablet&&reference&&tablet.w>0&&reference.w>0,'component geometry present '+selector);
     const expected=reference.w*width/1440;
     console.log('SHELL_SCALE_RATIO '+JSON.stringify({width,selector,actual:tablet.w,reference:reference.w,expected}));
     assert.ok(Math.abs(tablet.w-expected)<Math.max(2,expected*.10),selector+' must scale like approved Desktop @'+width);
   }
   const footer=cur.values['.footer-top__wrapper'];
   assert.ok(footer?.grid && footer.grid!=='none','approved BIO-A Desktop footer grid retained @'+width);
   const socials=cur.values['.footer-top__socials a[aria-label="Zalo"]'];
   const art=cur.values['.footer-top__socials .bioa-zalo-icon'];
   assert.ok(art.w<=socials.w&&art.h<=socials.h,'Zalo artwork fits within social button @'+width);
   const labels=['WhatsApp','Facebook','Telegram','Zalo'];
   const tiles=labels.map(x=>cur.values['.footer-top__socials a[aria-label="'+x+'"]']);
   assert.ok(tiles.every(t=>t&&t.w>0&&t.h>0),'four footer social anchors present @'+width);
   for(const tile of tiles) {
     assert.ok(Math.abs(tile.w-tile.h)<1.5,'footer icon tile square @'+width);
     assert.ok(Math.abs(tile.w-tiles[0].w)<1.5,'four footer icon tiles equal @'+width);
   }
   const wa=cur.values['.footer-top__socials a[aria-label="WhatsApp"] svg'];
   assert.ok(wa&&wa.w>0&&Math.abs(wa.w-art.w)<1.5,'WhatsApp SVG and Zalo artwork equal size @'+width);
      const email=cur.values['.header__email a'],button=cur.values['.header__btn'];
   assert.ok(email&&button&&Math.abs(email.h-button.h)<2,'Header contact alignment @'+width);
 }
} finally {
 await browser.close();
 await new Promise(r=>server.close(r));
}
