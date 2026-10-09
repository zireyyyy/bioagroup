// BIO-A TABLET T1 — console-only diagnostics, not shipped with the website.
(async()=>{
 const paths=["/","/about/","/contract-manufacturing-cosmetics/","/dich-vu-khac/","/blog/","/contacts/","/__bioa_tablet_404_probe__/"];
 const widths=[768,820,1024,1180],results=[];
 const iframe=document.createElement("iframe");
 iframe.style.cssText="position:fixed;top:0;left:-200vw;width:820px;height:900px;opacity:0;pointer-events:none;border:0";
 document.body.appendChild(iframe);
 const delay=ms=>new Promise(r=>setTimeout(r,ms));
 async function load(path){return new Promise(resolve=>{let done=false;const timer=setTimeout(()=>finish("timeout"),15000);function finish(status){if(done)return;done=true;clearTimeout(timer);iframe.onload=null;iframe.onerror=null;resolve(status)}iframe.onload=()=>finish("loaded");iframe.onerror=()=>finish("error");iframe.src=new URL(path,location.origin).href;});}
 try {
  for(const path of paths){
   const loaded=await load(path);if(loaded!=="loaded"){results.push({path,status:loaded});continue}
   for(const width of widths){
    iframe.style.width=width+"px";await delay(400);
    try{
     const doc=iframe.contentDocument,win=iframe.contentWindow;
     if(!doc||!doc.body){results.push({path,width,status:"unavailable"});continue}
     if(doc.body.textContent.includes("Website đang được hoàn thiện")){results.push({path,width,status:"maintenance_locked"});break}
     const overflow=Math.max(doc.documentElement.scrollWidth,doc.body.scrollWidth)-win.innerWidth;
     results.push({path,width,overflow_px:Math.max(0,overflow),header:!!doc.querySelector(".header"),footer:!!doc.querySelector("#footer"),status:overflow>4?"investigate_overflow":"layout_probe_ok"});
    }catch(e){results.push({path,width,status:"frame_access_error"})}
   }
  }
  console.table(results);
  const blob=new Blob([JSON.stringify({kind:"BIOA_TABLET_T1",results},null,2)],{type:"application/json"});
  const url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download="bioa-tablet-audit.json";a.click();setTimeout(()=>URL.revokeObjectURL(url),10000);
 }finally{iframe.remove()}
})();
