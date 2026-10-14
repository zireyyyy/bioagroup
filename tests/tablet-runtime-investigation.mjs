/** Tablet Phase 2 — scoped runtime diagnosis, never a visual PASS or lead test.
 * Captures browser exception provenance without saving form data, cookies or credentials.
 */
import {chromium} from 'playwright';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createServer} from 'node:http';
import {resolve,extname,sep} from 'node:path';

const root=resolve('dist');
const type={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript; charset=utf-8','.png':'image/png','.svg':'image/svg+xml','.webp':'image/webp','.woff2':'font/woff2'};
const server=createServer(async(req,res)=>{
 const url=new URL(req.url,'http://localhost');
 const file=resolve(root,'.'+(url.pathname.endsWith('/')?url.pathname+'index.html':url.pathname));
 if(!file.startsWith(root+sep)){res.writeHead(403).end();return;}
 try{const bytes=await readFile(file);res.writeHead(200,{'Content-Type':type[extname(file)]||'application/octet-stream'}).end(bytes)}
 catch{res.writeHead(404).end('not found')}
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const cases=[['/',834],['/en/about/',1024],['/blog/gia-cong-kem-tri-tham-nhu-hoa-giai-phap-lam-hong-vung-nhay-cam-chuyen-sau/',834]];
const origin='http://127.0.0.1:'+server.address().port;
const compact=(e)=>({name:e?.name||'unknown',message:(e?.message||String(e)||'unknown').slice(0,200),stack:(e?.stack||'').slice(0,500)});
const scrub=(url)=>{
 try{let u=new URL(url);return u.protocol==='http:'&&u.hostname==='127.0.0.1'?u.pathname:u.hostname+u.pathname}
 catch{return String(url||'').slice(0,80)}
};
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const reports=[];
try{
 for(const [route,width] of cases){
  const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1});
  const browserErrors=[],consoleErrors=[],failures=[];
  page.on('pageerror',e=>browserErrors.push(compact(e)));
  page.on('console',m=>{if(m.type()==='error')consoleErrors.push({text:m.text().slice(0,180),location:{url:scrub(m.location().url),line:m.location().lineNumber}})});
  page.on('requestfailed',r=>{if(failures.length<12)failures.push({url:scrub(r.url()),reason:r.failure()?.errorText?.slice(0,100)||null})});
  await page.addInitScript(()=>{
   window.__bioaRuntimeExceptions=[];
   window.addEventListener('error',e=>{
    if(window.__bioaRuntimeExceptions.length>=12)return;
    window.__bioaRuntimeExceptions.push({kind:'error',message:String(e.message||''),file:e.filename?new URL(e.filename,location.href).pathname:'',line:e.lineno||null,errorType:e.error?.constructor?.name||null,stack:String(e.error?.stack||'').slice(0,400)});
   },true);
   window.addEventListener('unhandledrejection',e=>{
    if(window.__bioaRuntimeExceptions.length>=12)return;
    window.__bioaRuntimeExceptions.push({kind:'unhandledrejection',type:e.reason?.constructor?.name||typeof e.reason,message:String(e.reason?.message||e.reason||'').slice(0,180)});
   });
  });
  try{
   const response=await page.goto(origin+route,{waitUntil:'domcontentloaded',timeout:30000});
   await page.waitForTimeout(600);
   const evidence=await page.evaluate(()=>({
    inPageErrors:window.__bioaRuntimeExceptions||[],
    toc:document.querySelector('.bb-toc')?{count:document.querySelectorAll('.bb-toc a[href^="#"]').length}:null,
    visibleNavCount:[...document.querySelectorAll('.header__nav li a')].filter(el=>el.getBoundingClientRect().width>0).length
   }));
   const item={route,width,status:response?.status(),...evidence,browserErrors:browserErrors.slice(0,12),consoleErrors:consoleErrors.slice(0,12),failedRequests:failures};
   reports.push(item);
   console.log('BIOA_TABLET_RUNTIME_DIAG '+JSON.stringify(item));
  }catch(e){reports.push({route,width,diagnosticFailure:compact(e)});console.log('BIOA_TABLET_RUNTIME_DIAG_ERROR '+route+' '+e);}
  finally{await page.close();}
 }
}finally{
 await mkdir('audit-artifacts/tablet-phase2',{recursive:true});
 await writeFile('audit-artifacts/tablet-phase2/runtime-diagnostics.json',JSON.stringify({version:1,visualPass:false,reports},null,2));
 await browser.close();
 await new Promise(done=>server.close(done));
}
// This is evidence collection. Root cause and accepted visual fix require separate gates.
if(reports.some(r=>r.diagnosticFailure))process.exitCode=1;
