// Evidence tool (ROADMAP-R5): real headed Chrome window, CDP window resize 1000 -> 1680 like a user maximizing,
// then Next. Prints slider height vs card, CTA overlap and step opacities; saves a screenshot.
// Usage: node tests/home-roadmap-headed-resize.mjs <distDir> <outDir> <tag> [route]
import { chromium } from "playwright";
import { createDistServer } from "../tools/serve-dist.mjs";
const dist=process.argv[2]; const out=process.argv[3]; const tag=process.argv[4]||"x";
const server=createDistServer(dist); await new Promise(r=>server.listen(0,"127.0.0.1",r)); const base="http://127.0.0.1:"+server.address().port;
const browser=await chromium.launch({headless:false,executablePath:process.env.BIOA_CHROME_PATH,args:["--window-size=1000,850","--window-position=0,0"]});
const ctx=await browser.newContext({viewport:null}); const page=await ctx.newPage();
await page.route("**/*",r=>r.request().method()!=="GET"||/googletagmanager|yandex|dashly|geojs/.test(r.request().url())?r.abort():r.fallback());
await page.goto(base+(process.argv[5]||"/"),{waitUntil:"load",timeout:70000}); await page.waitForTimeout(2500);
const cdp=await ctx.newCDPSession(page); const {windowId}=await cdp.send("Browser.getWindowForTarget");
await page.evaluate(()=>{const s=document.querySelector('.block-roadmap');window.__cls=0;window.__rz=0;const sw=s.querySelector('.swiper').swiper;sw.on('resize',()=>window.__rz++);new MutationObserver(m=>window.__cls+=m.length).observe(s.querySelector('.swiper-wrapper'),{subtree:true,attributes:true,attributeFilter:['class']});});
await cdp.send("Browser.setWindowBounds",{windowId,bounds:{width:1680,height:900}}); await page.waitForTimeout(2500);
await page.evaluate(()=>{const s=document.querySelector('.block-roadmap');const sb=window.Scrollbar.getAll()[0];sb.setPosition(0,s.getBoundingClientRect().top+sb.offset.y+150);}); await page.waitForTimeout(800);
await page.evaluate(()=>[...document.querySelectorAll('.block-roadmap .swiper-button_right')].find(x=>x.offsetParent).click()); await page.waitForTimeout(2500);
const m=await page.evaluate(()=>{const s=document.querySelector('.block-roadmap');const sw=s.querySelector('.swiper').swiper;const st=s.querySelector('.swiper-slide-active .step');const cta=s.querySelector('.button-wrapper').getBoundingClientRect();const r=st.getBoundingClientRect();
 return {inner:innerWidth,rz:window.__rz,cls:window.__cls,swW:sw.width,wrapH:s.querySelector('.swiper-wrapper').style.height,step:[Math.round(r.y),Math.round(r.height)],ctaY:Math.round(cta.y),overlap:Math.round(r.bottom-cta.y),ops:[...s.querySelectorAll('.step')].map(x=>getComputedStyle(x).opacity).join(',')}});
console.log(tag, JSON.stringify(m));
await page.screenshot({path:out+`/headed-${tag}.png`});
await browser.close(); server.close();
