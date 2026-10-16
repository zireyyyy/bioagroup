/** Phase 2B CSS cascade diagnostics: evidence, not a CSS rewrite.
 * Inspect declared inline-source rules + actual computed styles around the
 * Merywood 768/769 and approved BIO-A Footer 1200/1201 boundaries.
 * No clicks, form submission, runtime mutation, or third-party resource fetch.
 */
import assert from "node:assert/strict";
import {createServer} from "node:http";
import {readFile,mkdir,writeFile} from "node:fs/promises";
import {resolve,extname,sep} from "node:path";
import {chromium} from "playwright";

const root=resolve("dist");
const types={".html":"text/html; charset=utf-8",".js":"text/javascript",".css":"text/css",".svg":"image/svg+xml",".png":"image/png",".webp":"image/webp",".avif":"image/avif",".woff2":"font/woff2"};
const server=createServer(async(req,res)=>{
  const pathname=decodeURIComponent(new URL(req.url,"http://127.0.0.1").pathname);
  const file=resolve(root,"."+(pathname.endsWith("/")?pathname+"index.html":pathname));
  if(!file.startsWith(root+sep)){res.writeHead(403).end();return}
  try{const bytes=await readFile(file);res.writeHead(200,{"Content-Type":types[extname(file)]||"application/octet-stream"}).end(bytes)}
  catch{res.writeHead(404).end("not found")}
});
await new Promise(ok=>server.listen(0,"127.0.0.1",ok));
const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
const origin="http://127.0.0.1:"+server.address().port;
const routes=["/","/en/","/dich-vu-khac/","/en/dich-vu-khac/"];
const widths=[390,768,769,834,1024,1200,1201,1440];
const records=[],failures=[];
try{
  for(const route of routes)for(const width of widths){
    const page=await browser.newPage({viewport:{width,height:860},deviceScaleFactor:1});
    try{
      const response=await page.goto(origin+route,{waitUntil:"domcontentloaded",timeout:30000});
      assert.equal(response?.status(),200,"route "+route);
      const rec=await page.evaluate(()=>{
        const tracked=["display","width","max-width","min-width","grid-template-columns","font-size","font-weight","white-space","overflow-x","flex-basis"];
        const targets={
          nav:".header .header__nav > ul > li > a",
          footerGrid:".footer-top__wrapper",
          footerIdentity:".bioa-footer-company-info--desktop .bioa-footer-company-info__title",
          footerMobile:".bioa-footer-mobile-v2",
          homeStats:".block-title .info .item__number"
        };
        const owners=[...document.querySelectorAll("style#bioa-home-refine,style#bioa-shared-shell")];
        const styles=[...document.querySelectorAll("style")].map((style,i)=>({style,id:style.id||"inline-"+i}));
        const selectors={};
        for(const [key,selector] of Object.entries(targets)){
          const node=document.querySelector(selector);
          if(!node){selectors[key]=null;continue}
          const computed=getComputedStyle(node);
          const values=Object.fromEntries(tracked.map(prop=>[prop,computed.getPropertyValue(prop)]));
          const matched=[];
          for(const owner of styles){
            let rules;
            try{rules=owner.style.sheet?.cssRules||[]}catch{continue}
            function scan(list,media){
              for(const rule of list){
                if(rule.type===CSSRule.MEDIA_RULE){
                  if(matchMedia(rule.conditionText).matches)scan(rule.cssRules,[...media,rule.conditionText]);
                }else if(rule.type===CSSRule.SUPPORTS_RULE){
                  if(CSS.supports(rule.conditionText))scan(rule.cssRules,media);
                }else if(rule.type===CSSRule.STYLE_RULE){
                  let matches=false;
                  try{matches=node.matches(rule.selectorText)}catch{}
                  if(!matches)continue;
                  const declarations=tracked.flatMap(prop=>{
                    const value=rule.style.getPropertyValue(prop);
                    return value?[{property:prop,value:value.trim(),important:rule.style.getPropertyPriority(prop)==="important"}]:[];
                  });
                  if(declarations.length)matched.push({style:owner.id,media,selector:rule.selectorText.slice(0,220),declarations});
                }
              }
            }
            scan(rules,[]);
          }
          const overlap={};
          for(const item of matched)for(const decl of item.declarations){
            const p=decl.property;
            (overlap[p]??=new Set()).add(decl.value+(decl.important?"!important":""));
          }
          const differing=Object.fromEntries(Object.entries(overlap).filter(([,vals])=>vals.size>1).map(([p,vals])=>[p,[...vals]]));
          selectors[key]={selector:selector,computed:values,activeDeclarations:matched.length,overlappingValues:differing,
            // Record the last rules only to make cascade investigation bounded.
            tail:matched.slice(-12)};
        }
        return {route:location.pathname,width:innerWidth,docWidth:document.documentElement.scrollWidth,
          locale:document.documentElement.lang,
          activeOwnerIds:owners.map(x=>x.id),selectors};
      });
      const expected=route==="/"||route==="/en/"?"bioa-home-refine":"bioa-shared-shell";
      assert.deepEqual(rec.activeOwnerIds,[expected],"one correct style owner "+route+" @"+width);
      assert.equal(rec.locale,route.startsWith("/en/")?"en":"vi","locale "+route);
      assert.ok(rec.selectors.footerIdentity,"approved Footer identity "+route);
      assert.ok(rec.selectors.footerGrid,"canonical Footer wrapper "+route);
      assert.ok(rec.selectors.footerMobile,"canonical Footer v2 markup "+route);
      // OWNER-PASS RESPONSIVE CONTRACT: the approved Footer EN exception is
      // scoped to the company's own lang, not the mutable document locale.
      // Tablet/mobile fall back to normal text wrapping; Desktop VI remains
      // nowrap. A future cascade edit that reverses these is a real regression.
      const companyWrap=rec.selectors.footerIdentity.computed["white-space"];
      const english=route.startsWith("/en/");
      const expectedWrap=width>=1201&&!english?"nowrap":"normal";
      assert.equal(companyWrap,expectedWrap,
        "Frozen Footer company wrap "+route+" @"+width);
      if(width>=769&&width<=1200){
        // Nav fluid CSS is a known, accepted responsive cascade override.
        // Conflicting declarations are intentionally collected as evidence,
        // NOT removed or treated as an automatic FAIL.
        assert.ok(rec.selectors.nav,"Original Merywood navigation "+route+" @"+width);
        assert.ok(rec.selectors.nav.computed["font-size"],
          "Fluid nav has a computed size "+route+" @"+width);
      }
      records.push(rec);
      console.log("BIOA_PHASE2B_CASCADE "+JSON.stringify({route,width,activeOwner:rec.activeOwnerIds[0],
        footerTitleWrap:rec.selectors.footerIdentity.computed["white-space"],
        navOverlaps:Object.keys(rec.selectors.nav?.overlappingValues||{}),
        footerOverlaps:Object.keys(rec.selectors.footerIdentity.overlappingValues||{})}));
    }catch(err){
      failures.push({route,width,error:String(err)});
      console.error("BIOA_PHASE2B_CASCADE_FAIL "+route+" "+width+" "+String(err).slice(0,500));
    }finally{await page.close()}
  }
}finally{
  await mkdir("audit-artifacts/phase2b",{recursive:true});
  await writeFile("audit-artifacts/phase2b/css-cascade-boundary-matrix.json",
    JSON.stringify({kind:"computed browser cascade evidence; overlaps are not automatically defects",records,failures},null,2));
  await browser.close();
  await new Promise(done=>server.close(done));
}
assert.equal(records.length,routes.length*widths.length,"All boundary probes completed");
assert.equal(failures.length,0,JSON.stringify(failures.slice(0,5)));
