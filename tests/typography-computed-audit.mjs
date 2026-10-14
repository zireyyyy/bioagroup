import {chromium} from 'playwright';
import {createServer} from 'node:http';
import {readFile,mkdir,writeFile} from 'node:fs/promises';
import {resolve,sep,extname} from 'node:path';
const root=resolve('dist');
const types={'.html':'text/html','.css':'text/css','.js':'text/javascript','.woff2':'font/woff2','.png':'image/png','.webp':'image/webp','.svg':'image/svg+xml'};
const server=createServer(async(req,res)=>{const u=new URL(req.url,'http://localhost'),file=resolve(root,'.'+(u.pathname.endsWith('/')?u.pathname+'index.html':u.pathname));if(!file.startsWith(root+sep)){res.writeHead(403).end();return;}try{const payload=await readFile(file);res.writeHead(200,{'Content-Type':types[extname(file)]||'application/octet-stream'}).end(payload);}catch{if(!res.headersSent)res.writeHead(404).end('Not found');else res.end();}});
await new Promise(done=>server.listen(0,'127.0.0.1',done));
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const output=[];try{
 for(const route of ['/blog/','/en/blog/','/','/about/'])for(const width of [390,834,1280,1440]){
  const page=await browser.newPage({viewport:{width,height:900}});
  try{await page.goto('http://127.0.0.1:'+server.address().port+route,{waitUntil:'domcontentloaded',timeout:30000});await page.evaluate(()=>document.fonts?.ready);
  const result=await page.evaluate(()=>{
   const sels=['.blog-hero .title','.blog-hero .text-large','.post-feature__title','.post-feature__title a','.post-feature__subtitle','.post-card .post-feature__title a','.block-title .content h1','.block-title .content .text-large','#mw-consent .mw-actions .mw-btn','#mw-card-title','.header__btn .btn__text','.post-feature__actions .btn__text'];
   const obj={};
   for(const q of sels){let e=document.querySelector(q);if(!e)continue;let c=getComputedStyle(e);obj[q]={fontFamily:c.fontFamily,fontWeight:c.fontWeight,fontSize:c.fontSize,fontVariationSettings:c.fontVariationSettings,tag:e.tagName,classes:e.className};}
   const sources={};
   for(const q of ['.blog-hero .title','#mw-card-title']){
     const node=document.querySelector(q);if(!node)continue;
     const hits=[];
     const walk=(rules,url)=>{for(const rule of rules){
       if(rule.cssRules){try{walk(rule.cssRules,url)}catch{}continue;}
       if(!rule.selectorText||!rule.style?.fontWeight)continue;
       try{if(node.matches(rule.selectorText)){hits.push({selector:rule.selectorText.slice(0,160),weight:rule.style.fontWeight,important:rule.style.getPropertyPriority('font-weight'),source:url});}}catch{}
     }};
     for(const sheet of document.styleSheets){
       try{walk(sheet.cssRules,sheet.href?new URL(sheet.href).pathname:'inline')}catch{}
     }
     sources[q]={inlineStyle:node.getAttribute('style'),matches:hits.slice(-24)};
   }
   return {styles:obj,sources,loaded:[...document.fonts].filter(f=>f.status==='loaded').slice(0,8).map(f=>({family:f.family,weight:f.weight}))};
  });const o={route,width,...result};output.push(o);console.log('BIOA_TYPO_AUDIT '+JSON.stringify(o));
  if(route==='/blog/'||route==='/en/blog/'){
    const hero=result.styles['.blog-hero .title'];
    if(hero?.fontWeight!=='350'||/font-weight/i.test(result.sources?.['.blog-hero .title']?.inlineStyle||'')){
      throw Error('Blog hero title still uses inherited inline/bold font instead of canonical 350: '+route+' @'+width+' (computed '+hero?.fontWeight+')');
    }
  }
  const cookieTitle=result.styles['#mw-card-title'];
  const cookieButton=result.styles['#mw-consent .mw-actions .mw-btn'];
  if(cookieTitle?.fontWeight!=='350'||cookieButton?.fontWeight!=='350'){
    throw Error('Cookie title/actions must use owner 350: '+route+' @'+width);
  }
  }catch(e){console.log('BIOA_TYPO_AUDIT_ERROR '+route+' '+width+' '+String(e));process.exitCode=1}finally{await page.close()}
 }
}finally{await mkdir('audit-artifacts/typography',{recursive:true});await writeFile('audit-artifacts/typography/computed.json',JSON.stringify(output,null,2));await browser.close();await new Promise(done=>server.close(done));}
