/** BIO-A Phase 2 Tablet closeout: Contacts safe interactions and 404 host boundary.
 * No lead API calls, no submits, no external navigation and no auth tokens.
 * No site DOM/CSS/JS alteration; owner UI acceptance is separate.
 */
import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
import {chromium} from 'playwright';
import {onRequest} from '../functions/_middleware.js';

const root=resolve('dist');
const types={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.avif':'image/avif','.woff2':'font/woff2'};
const server=createServer(async(req,res)=>{
 const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
 const file=resolve(root,'.'+(pathname.endsWith('/')?pathname+'index.html':pathname));
 if(!file.startsWith(root+sep)){res.writeHead(403).end();return}
 try{const bytes=await readFile(file);res.writeHead(200,{'Content-Type':types[extname(file)]||'application/octet-stream'}).end(bytes)}
 catch{if(!res.headersSent)res.writeHead(404).end('not found');else res.end()}
});
await new Promise(done=>server.listen(0,'127.0.0.1',done));
const origin='http://127.0.0.1:'+server.address().port;
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const results=[],failures=[];
const addIssue=(route,width,message)=>failures.push({route,width,message});
try{
 for(const lang of ['vi','en'])for(const width of [390,834,1024,1440]){
  const route=(lang==='en'?'/en':'')+'/contacts/';
  const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1});
  try{
   const response=await page.goto(origin+route,{waitUntil:'domcontentloaded',timeout:30000});
   assert.equal(response?.status(),200,route+' must load');
   const before=await page.evaluate(()=>{
    const items=[...document.querySelectorAll('.contacts-faq-item')];
    const first=items[0],q=first?.querySelector('.contacts-faq-q'),ans=first?.querySelector('.contacts-faq-a');
    const state=node=>node?{cls:node.className,aria:node.getAttribute('aria-expanded'),height:Math.round(node.getBoundingClientRect().height),display:getComputedStyle(node).display,visibility:getComputedStyle(node).visibility}:null;
    const anchors=[...document.querySelectorAll('.contacts-info-grid a[href],.contacts-address-note[href]')].map(a=>({href:a.getAttribute('href'),target:a.getAttribute('target'),rel:a.getAttribute('rel')}));
    const map=document.querySelector('.contacts-map-block iframe');
    return {faqCount:items.length,question:q?.textContent.trim().slice(0,120),answer:ans?.textContent.trim().slice(0,150),
      row:state(first),questionState:state(q),answerState:state(ans),
      addresses:anchors,map:{src:map?.getAttribute('src'),loading:map?.getAttribute('loading'),title:map?.getAttribute('title')},
      pageWidth:document.documentElement.scrollWidth,viewport:innerWidth};
   });
   assert.equal(before.faqCount,5,route+' maintains five owner-approved FAQs');
   assert.ok(before.question&&before.answer,route+' FAQ copy remains present');
   assert.ok(before.pageWidth<=width+2,route+' no horizontal page overflow');
   assert.ok(before.addresses.some(a=>a.href?.startsWith('mailto:')),route+' email link');
   assert.ok(before.addresses.some(a=>a.href?.startsWith('https://www.google.com/maps/')),route+' Maps directions');
   assert.ok(before.map.src?.startsWith('https://www.google.com/maps/embed'),route+' embedded Maps URL');
   const q=page.locator('.contacts-faq-item').first().locator('.contacts-faq-q');
   await q.scrollIntoViewIfNeeded({timeout:6500});
   await q.click({timeout:6500});
   await page.waitForTimeout(450);
   const after=await page.evaluate(()=>{
    const item=document.querySelector('.contacts-faq-item'),q=item?.querySelector('.contacts-faq-q'),ans=item?.querySelector('.contacts-faq-a');
    const state=node=>node?{cls:node.className,aria:node.getAttribute('aria-expanded'),height:Math.round(node.getBoundingClientRect().height),display:getComputedStyle(node).display,visibility:getComputedStyle(node).visibility}:null;
    return {row:state(item),questionState:state(q),answerState:state(ans),pageWidth:document.documentElement.scrollWidth};
   });
   const expanded=before.row?.cls!==after.row?.cls||before.questionState?.aria!==after.questionState?.aria||before.answerState?.height!==after.answerState?.height||before.answerState?.display!==after.answerState?.display||before.answerState?.visibility!==after.answerState?.visibility;
   if(!expanded)addIssue(route,width,'FAQ click produced no observable state or answer-height change');
   if(after.pageWidth>width+2)addIssue(route,width,'FAQ expansion caused page-width overflow');
   const record={route,width,before,after,faqChanged:expanded};
   results.push(record);console.log('BIOA_TABLET_CONTACTS '+JSON.stringify({route,width,faqCount:before.faqCount,faqChanged:expanded,answerBefore:before.answerState,answerAfter:after.answerState,mapPresent:!!before.map.src}));
  }catch(e){addIssue(route,width,String(e));results.push({route,width,error:String(e)});console.log('BIOA_TABLET_CONTACTS_ERROR '+route+' '+width+' '+String(e))}
  finally{await page.close()}
 }
 // 404 visual is OWNER PASS/FROZEN. Check only image/CTA presence and Cloudflare middleware status propagation.
 for(const page404 of ['/404.html','/en/404.html']){
  const html=await readFile(resolve(root,'.'+page404),'utf8');
  assert.match(html,/src="\/assets\/bioa-404-original.png"/,'Original owner-approved PNG '+page404);
  assert.match(html,/class="btn bioa-404__cta" href="\/"/,'Original CTA '+page404);
  assert.match(html,/noindex,nofollow,noarchive/,'404 SEO lock '+page404);
 }
 const preview='https://tablet-audit.bioagroup.pages.dev';
 const forward404=()=>new Response('Owner-approved Merywood 404',{status:404,headers:{'Content-Type':'text/html'}});
 for(const pathname of ['/bioa-qa-unknown/', '/en/bioa-qa-unknown/']){
  const request=new Request(preview+pathname,{headers:{Accept:'text/html'}});
  const received=await onRequest({request,env:{BIOA_SITE_MODE:'maintenance'},next:async()=>forward404()});
  assert.equal(received.status,404,'Preview middleware must preserve upstream 404 at '+pathname);
  assert.match(received.headers.get('X-Robots-Tag')||'',/noindex/);
  const requestProduction=new Request('https://bioagroup.vn'+pathname,{headers:{Accept:'text/html'}});
  const denied=await onRequest({request:requestProduction,env:{BIOA_SITE_MODE:'maintenance'},next:async()=>forward404()});
  assert.equal(denied.status,503,'Unauthenticated Production unknown route must remain private');
  console.log('BIOA_TABLET_404 '+JSON.stringify({pathname,previewStatus:received.status,guestProductionStatus:denied.status,visualOwnerPass:true,livePagesResponseNotChecked:true}));
 }
}finally{
 await mkdir('audit-artifacts/tablet-phase2',{recursive:true});
 await writeFile('audit-artifacts/tablet-phase2/contacts-404-interactions.json',JSON.stringify({visualOwnerPass:false,contactFormSubmitted:false,live404NotVerified:true,results,failures},null,2));
 await browser.close();
 await new Promise(done=>server.close(done));
}
assert.equal(failures.length,0,'Contacts Accordion VI/EN interaction must change state safely: '+JSON.stringify(failures));
