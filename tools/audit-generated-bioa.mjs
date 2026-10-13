/**
 * Read-only post-build audit. Does not alter dist/, page source or Cloudflare.
 * Run after npm run build. Writes JSON into audit-artifacts/ only.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { load } from "cheerio";

const dist=path.resolve("dist");
const output=path.resolve("audit-artifacts");
const assets=path.join(dist,"assets");
const allFiles=async(dir)=>{
 const result=[];
 for(const entry of await fs.readdir(dir,{withFileTypes:true})){
   const absolute=path.join(dir,entry.name);
   if(entry.isDirectory())result.push(...await allFiles(absolute));
   else result.push(absolute);
 }
 return result;
};
const compact=(s)=>String(s||"").replace(/\s+/g," ").trim();
const normalizeAsset=(src)=>{
 if(!src)return null;
 let value=String(src).trim();
 if(value.startsWith("https://bioagroup.vn/"))value=value.slice("https://bioagroup.vn".length);
 if(!value.startsWith("/assets/"))return null;
 value=value.split(/[?#]/)[0];
 try{return decodeURIComponent(value);}catch{return value;}
};
const localPaths=(text)=>{
 const matches=String(text||"").match(/\/assets\/[A-Za-z0-9_\u00c0-\u024f/.-]+/g)||[];
 return matches.map(normalizeAsset).filter(Boolean);
};
const files=await allFiles(dist);
const htmlFiles=files.filter(f=>f.endsWith(".html"));
if(!htmlFiles.length)throw new Error("No generated HTML present in dist/");
const existingAssets=files.filter(f=>f.startsWith(assets+path.sep)).map(f=>"/"+path.relative(dist,f).replaceAll(path.sep,"/"));
const references=new Map(existingAssets.map(a=>[a,{pages:[],directImages:[],styles:[]}]));
const pageData=[];
const missing=new Set();
for(const filepath of htmlFiles){
 const route="/"+path.relative(dist,filepath).replaceAll(path.sep,"/").replace(/(?:^|\/)index\.html$/,"/");
 const html=await fs.readFile(filepath,"utf8");
 const $=load(html);
 const inlineStyles=$("style").toArray().map(e=>({id:$(e).attr("id")||"(unlabeled)",text:$(e).html()||""}));
 const loadedAssets=new Set();
 const imageAssets=new Set();
 $("img,source,video,link").each((_,el)=>{
   for(const attr of ["src","poster","href"]){
     const value=normalizeAsset($(el).attr(attr));
     if(value){loadedAssets.add(value);if(el.name==="img"||el.tagName==="img")imageAssets.add(value);}
   }
   const srcset=$(el).attr("srcset")||"";
   for(const part of srcset.split(",")){
     const src=normalizeAsset(part.trim().split(/\s+/)[0]);
     if(src){loadedAssets.add(src);if(el.name==="img"||el.tagName==="img")imageAssets.add(src);}
   }
 });
 for(const style of inlineStyles)for(const asset of localPaths(style.text))loadedAssets.add(asset);
 for(const asset of loadedAssets){
   if(references.has(asset)){references.get(asset).pages.push(route);if(imageAssets.has(asset))references.get(asset).directImages.push(route);}
   else missing.add(asset);
 }
 for(const style of inlineStyles)for(const asset of new Set(localPaths(style.text))){
   if(references.has(asset))references.get(asset).styles.push(route);
 }
 pageData.push({
   route,
   lang:$("html").attr("lang")||"",
   title:compact($("title").first().text()).slice(0,150),
   hasHeader:$(".header").length>0,
   hasFooter:$(".footer-top").length>0,
   styles:inlineStyles.map(x=>({id:x.id,chars:x.text.length,important:(x.text.match(/!important/g)||[]).length,media:(x.text.match(/@media/g)||[]).length})),
   imageAssets:[...imageAssets].sort(),
   aboutIconReferences:[...loadedAssets].filter(v=>v.includes("/about-icon-")).sort(),
   missingRefs:[...loadedAssets].filter(a=>!references.has(a)).sort()
 });
}
const report={
 schema:"bioa-render-asset-audit/v1",
 baseline:"c320f2868a46aafd141a7178c03337a1d07b3a82",
 provenance:"Built HTML is fetched from live Merywood by build.mjs. This is NOT a pinned source reproduction.",
 generatedAt:new Date().toISOString(),
 htmlCount:pageData.length,
 assetCount:existingAssets.length,
 assetUsage:[...references].map(([asset,p])=>({asset,
   pageReferences:[...new Set(p.pages)].sort(),
   directImgPages:[...new Set(p.directImages)].sort(),
   cssPages:[...new Set(p.styles)].sort()})).sort((a,b)=>a.asset.localeCompare(b.asset)),
 missingAssetReferences:[...missing].sort(),
 pages:pageData
};
await fs.mkdir(output,{recursive:true});
await fs.writeFile(path.join(output,"generated-html-asset-audit.json"),JSON.stringify(report,null,2)+"\n");
console.log("BIOA_GENERATED_AUDIT "+JSON.stringify({htmlCount:report.htmlCount,assetCount:report.assetCount,missingAssetReferences:report.missingAssetReferences.length,unreferencedAssets:report.assetUsage.filter(v=>!v.pageReferences.length).map(v=>v.asset),homeStyles:pageData.find(v=>v.route==="/")?.styles||[]}));
