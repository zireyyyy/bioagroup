// CF7-JS-1 evidence: on a dist that still loads the two Contact Form 7 scripts (e.g. dist-tablet-r25b), open the
// quote modal and submit it with the scripts loaded vs blocked; compare the modal screenshot, the BIO-A status
// message, non-GET requests and page errors. Usage: node tests/cf7-js-removal-proof.mjs <distWithCf7Js>
import { chromium } from "playwright";
import { createDistServer } from "../tools/serve-dist.mjs";
import { createHash } from "node:crypto";
const server=createDistServer(process.argv[2]||"dist"); await new Promise(r=>server.listen(0,"127.0.0.1",r)); const base="http://127.0.0.1:"+server.address().port;
const browser=await chromium.launch({headless:true,executablePath:process.env.BIOA_CHROME_PATH});
const h=b=>createHash("sha256").update(b).digest("hex").slice(0,12);
for (const route of ["/","/en/","/contacts/","/dich-vu-khac/"]) for (const w of [1440,834,390]){
 const res={};
 for (const mode of ["withCF7","noCF7"]){
  const page=await browser.newPage({viewport:{width:w,height:900}});
  const errs=[]; page.on("pageerror",e=>errs.push(String(e.message).slice(0,80)));
  const posts=[];
  await page.route("**/*",r=>{const u=r.request().url(); if(r.request().method()!=="GET"){posts.push(u.slice(0,80)); if(u.includes("/api/lead")) return r.fulfill({status:200,contentType:"application/json",body:'{"ok":true,"id":"bioa_t"}'}); return r.abort();}
   if(/challenges\.cloudflare|geojs|googletag/.test(u)) return r.abort();
   if(mode==="noCF7"&&/contact-form-7\/includes\/(js|swv)\//.test(u)) return r.abort();
   return r.fallback();});
  await page.goto(base+route,{waitUntil:"load",timeout:90000}); await page.waitForTimeout(1500);
  const deny=page.locator("#mw-consent .mw-deny").first(); if(await deny.isVisible().catch(()=>false)) await deny.click();
  await page.evaluate(()=>{const t=document.querySelector('[modal="get-a-quote"]'); t&&t.click();}); await page.waitForTimeout(900);
  const shot=await page.locator("#get-a-quote .cf-modal, #get-a-quote").first().screenshot({path:(process.env.BIOA_REPORTS||".")+"/modal-"+mode+"-"+w+".png"}).catch(()=>Buffer.from(""));
  const cs=await page.evaluate(()=>{const o={};for(const s of ["#get-a-quote .cf-modal","#get-a-quote input[name=your-name]","#get-a-quote .cf-modal__button","#get-a-quote .wpcf7-spinner","#get-a-quote .wpcf7-response-output","#get-a-quote .screen-reader-response"]){const e=document.querySelector(s);if(!e){o[s]="-";continue;}const c=getComputedStyle(e),b=e.getBoundingClientRect();o[s]=[Math.round(b.width),Math.round(b.height),c.display,c.visibility,c.margin,c.padding].join("|");}return o;});
  console.log(mode,w,JSON.stringify(cs));
  const f="#get-a-quote form.wpcf7-form";
  await page.fill(f+' [name="your-name"]',"QA Test"); await page.fill(f+' [name="your-phone"]',"0900000000");
  await page.evaluate(sel=>{const c=document.querySelector(sel+' [name="your-acceptance"]'); if(c&&!c.checked) c.click();},f);
  await page.evaluate(sel=>{const form=document.querySelector(sel);const b=form.querySelector('.cf-modal__button,[type=submit]');form.requestSubmit(b&&b.form===form?b:undefined);},f);
  await page.waitForTimeout(1500);
  const msg=await page.evaluate(sel=>(document.querySelector(sel+" [data-bioa-lead-status]")||{}).textContent||"",f);
  res[mode]={shot:h(shot),msg:msg.slice(0,40),posts:posts.join(" | "),errs:errs.join(" | ").slice(0,160)};
  await page.close();
 }
 const same=res.withCF7.shot===res.noCF7.shot && res.withCF7.msg===res.noCF7.msg;
 console.log((same?"SAME ":"DIFF ")+route+" @"+w, JSON.stringify(res));
}
await browser.close(); server.close();
