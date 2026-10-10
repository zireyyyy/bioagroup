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
 for(const width of [834,1024,1180]){
   const page=await browser.newPage({viewport:{width,height:820},deviceScaleFactor:1});
   await page.goto('http://127.0.0.1:'+address.port+'/',{waitUntil:'domcontentloaded',timeout:30000});
   await page.waitForSelector('.header__email a',{timeout:12000});
   const m=await page.evaluate(()=>{
     const el=q=>document.querySelector(q);
     const get=q=>{const e=el(q);if(!e)return null;const c=getComputedStyle(e),b=e.getBoundingClientRect();return {width:b.width,height:b.height,font:parseFloat(c.fontSize),opacity:c.opacity,visibility:c.visibility,scroll:e.scrollWidth,client:e.clientWidth}};
     const sections={email:get('.header .bioa-header-actions .header__email a'),headerButton:get('.header .bioa-header-actions .header__btn'),cta:get('.whatsapp'),ctaTitle:get('.whatsapp .whatsapp__title'),ctaContent:get('.whatsapp .whatsapp__content'),footerZalo:get('.footer-top .footer-top__socials a[aria-label="Zalo"] .bioa-zalo-icon'),footerSocial:get('.footer-top .footer-top__socials a[aria-label="Zalo"]'),footerLink:get('.footer-top .footer-top__nav ul li:not(:first-child) a'),formatTab:get('.block-product-formats .formats__tab'),formatHeading:get('.block-product-formats .formats__cta-title')};
     return {width:innerWidth,bodyScroll:document.body.scrollWidth,documentScroll:document.documentElement.scrollWidth,sections};
   });
   console.log('TABLET_BROWSER_SMOKE '+JSON.stringify(m));
   const s=m.sections;
   assert.ok(s.email&&s.headerButton&&s.cta&&s.ctaTitle&&s.ctaContent&&s.footerZalo&&s.footerSocial&&s.footerLink,'all owned components should exist');
   assert.ok(Math.abs(s.email.height-s.headerButton.height)<5,'Header email matches the CTA height @'+width);
   assert.ok(s.email.font>=10,'Header email readable @'+width);
   assert.ok(s.cta.height>=155,'CTA not collapsed @'+width);
   assert.ok(s.ctaTitle.font>=22,'CTA title readable @'+width);
   assert.ok(s.ctaContent.opacity==='1'&&s.ctaContent.visibility==='visible','CTA content visible @'+width);
   assert.ok(s.footerZalo.width<=s.footerSocial.width&&s.footerZalo.height<=s.footerSocial.height,'Zalo must fit inside footer icon box @'+width);
   assert.ok(s.footerLink.font>=10.5,'Footer links readable @'+width);
   if(s.formatTab)assert.ok(s.formatTab.font>=10.5,'product tab text readable @'+width);
   if(s.formatHeading)assert.ok(s.formatHeading.font>=20,'product heading readable @'+width);
   if(m.documentScroll>width+16)console.warn('HORIZONTAL_OVERFLOW_NEEDS_INVESTIGATION '+JSON.stringify({width,scrollWidth:m.documentScroll}));
   await page.close();
 }
} finally {
 await browser.close();
 await new Promise(r=>server.close(r));
}
