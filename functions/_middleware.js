// Bio-A GLOBAL Cloudflare Pages maintenance/private-preview gate.
// _routes.json MUST include all paths, including assets and APIs.
const COOKIE="__Host-bioa_preview",ENTRY="/_bioa-access",TTL=28800000,enc=new TextEncoder();
const hex=b=>Array.from(new Uint8Array(b),x=>x.toString(16).padStart(2,"0")).join("");
const unhex=s=>new Uint8Array(s.match(/.{2}/g).map(x=>parseInt(x,16)));
const privateHeaders={"Cache-Control":"private, no-store, max-age=0","X-Robots-Tag":"noindex, nofollow, noarchive","Referrer-Policy":"no-referrer","X-Content-Type-Options":"nosniff"};
const secretOf=env=>typeof env.BIOA_PREVIEW_SECRET==="string"&&/^[A-Za-z0-9_-]{32,128}$/.test(env.BIOA_PREVIEW_SECRET)?env.BIOA_PREVIEW_SECRET:null;
async function macKey(s){return crypto.subtle.importKey("raw",enc.encode(s),{name:"HMAC",hash:"SHA-256"},false,["sign","verify"]);}
async function equalToken(candidate,real){
  if(typeof candidate!=="string"||!/^[A-Za-z0-9_-]{32,128}$/.test(candidate))return false;
  const [a,b]=await Promise.all([crypto.subtle.digest("SHA-256",enc.encode(candidate)),crypto.subtle.digest("SHA-256",enc.encode(real))]);
  const x=new Uint8Array(a),y=new Uint8Array(b);let n=0;for(let i=0;i<32;i++)n|=x[i]^y[i];return n===0;
}
async function makeCookie(secret,host){
  const exp=Date.now()+TTL,nonce=hex(crypto.getRandomValues(new Uint8Array(16))),k=await macKey(secret);
  const sig=hex(await crypto.subtle.sign("HMAC",k,enc.encode(host+"|"+exp+"|"+nonce)));
  return COOKIE+"="+exp+"."+nonce+"."+sig+"; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=28800";
}
async function isOwner(request,secret,host){
  const source=(request.headers.get("Cookie")||"").match(/(?:^|;\s*)__Host-bioa_preview=([0-9a-f.]+)/);
  const m=source&&/^(\d{13})\.([0-9a-f]{32})\.([0-9a-f]{64})$/.exec(source[1]);
  if(!m)return false;
  const exp=Number(m[1]);if(exp<=Date.now()||exp>Date.now()+TTL)return false;
  return crypto.subtle.verify("HMAC",await macKey(secret),unhex(m[3]),enc.encode(host+"|"+m[1]+"|"+m[2]));
}
function maintenancePage(){
  return '<!doctype html><html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow,noarchive"><title>Website đang hoàn thiện | Bio-A Group</title><style>'+
  '*{box-sizing:border-box}html,body{margin:0;min-height:100%}body{min-height:100vh;min-height:100svh;display:grid;place-items:center;background:#F3F0E4;color:#093D26;padding:22px;font-family:Manrope,system-ui,-apple-system,Arial,sans-serif}main{max-width:620px;width:100%;background:#FCFEF1;border:1px solid #dde6d9;border-radius:22px;padding:58px 32px;text-align:center}.logo{font-size:20px;font-weight:750;color:#106E45;letter-spacing:.05em}.icon{display:inline-grid;place-items:center;width:42px;height:42px;border:2px solid #106E45;border-radius:10px;margin-right:10px}hr{width:48px;margin:28px auto;border:0;border-top:3px solid #106E45}h1{font-size:clamp(28px,5vw,42px);font-weight:600;line-height:1.3;margin:0 0 20px}p{color:#426152;font-size:16px;line-height:1.7;max-width:490px;margin:0 auto}.en{font-size:14px;opacity:.85;margin-top:16px}small{display:block;margin-top:40px;color:#688173}@media(max-width:540px){body{padding:14px}main{padding:46px 20px;border-radius:17px}}'+
  '</style></head><body><main><div class="logo"><span class="icon">B</span>BIO-A GROUP</div><hr><h1>Website đang được hoàn thiện</h1><p>Bio-A Group đang cập nhật nội dung và trải nghiệm để phục vụ bạn tốt hơn. Website sẽ sớm trở lại.</p><p class="en" lang="en">We are preparing a better experience. Our website will be available soon.</p><small>© Bio-A Group · All rights reserved</small></main></body></html>';
}
function locked(request,url){
  if(url.pathname==="/robots.txt")return new Response(request.method==="HEAD"?null:"User-agent: *\nDisallow: /\n",{status:200,headers:{...privateHeaders,"Content-Type":"text/plain; charset=utf-8"}});
  const html=(request.method==="GET"||request.method==="HEAD")&&((request.headers.get("Accept")||"").includes("text/html")||url.pathname==="/"||url.pathname.endsWith("/"));
  return new Response(request.method==="HEAD"?null:(html?maintenancePage():"Service temporarily unavailable"),{status:503,headers:{...privateHeaders,"Retry-After":"3600","Content-Type":html?"text/html; charset=utf-8":"text/plain; charset=utf-8"}});
}
export async function onRequest(context){
  const {request,env}=context,url=new URL(request.url);
  if(String(env.BIOA_SITE_MODE||"").trim().toLowerCase()==="public")return context.next();
  const secret=secretOf(env);
  if(url.pathname===ENTRY+"/exit")return new Response(null,{status:303,headers:{...privateHeaders,"Location":"/","Set-Cookie":COOKIE+"=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0"}});
  if(url.pathname===ENTRY){
    if(request.method!=="GET"||!secret||!await equalToken(url.searchParams.get("key"),secret))return locked(request,url);
    return new Response(null,{status:303,headers:{...privateHeaders,"Location":"/","Set-Cookie":await makeCookie(secret,url.hostname)}});
  }
  if(!secret||!await isOwner(request,secret,url.hostname))return locked(request,url);
  const response=await context.next(),out=new Response(response.body,response);
  out.headers.set("Cache-Control","private, no-store, max-age=0");
  out.headers.set("X-Robots-Tag","noindex, nofollow, noarchive");
  out.headers.set("Referrer-Policy","no-referrer");
  return out;
}
