// Bio-A Pages Function: D1 is the durable lead source of truth.
// All credentials/bindings live in Cloudflare Pages, never in browser or Git.
const json=(data,status=200)=>Response.json(data,{status,headers:{"Cache-Control":"no-store","X-Content-Type-Options":"nosniff"}});
const clean=(v,max)=>typeof v==="string"?v.trim().replace(/[\u0000-\u001f\u007f]/g," ").slice(0,max):"";
const escapeHtml=(v)=>String(v).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const b64url=(bytes)=>btoa(Array.from(bytes,b=>String.fromCharCode(b)).join("")).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"");
const str64=(v)=>b64url(new TextEncoder().encode(v));
const timeout=()=>AbortSignal.timeout(7000);

async function googleAccessToken(saJson){
  const sa=JSON.parse(saJson);
  if(!sa.client_email||!sa.private_key)throw new Error("google_credentials");
  const pem=sa.private_key.replace(/\\n/g,"\n").replace(/-----BEGIN PRIVATE KEY-----|-----END PRIVATE KEY-----|\s/g,"");
  const raw=Uint8Array.from(atob(pem),c=>c.charCodeAt(0));
  const key=await crypto.subtle.importKey("pkcs8",raw,{name:"RSASSA-PKCS1-v1_5",hash:"SHA-256"},false,["sign"]);
  const now=Math.floor(Date.now()/1000);
  const msg=str64(JSON.stringify({alg:"RS256",typ:"JWT"}))+"."+str64(JSON.stringify({
    iss:sa.client_email,scope:"https://www.googleapis.com/auth/spreadsheets",
    aud:"https://oauth2.googleapis.com/token",iat:now,exp:now+3600
  }));
  const signature=new Uint8Array(await crypto.subtle.sign("RSASSA-PKCS1-v1_5",key,new TextEncoder().encode(msg)));
  const res=await fetch("https://oauth2.googleapis.com/token",{
    method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},
    body:new URLSearchParams({grant_type:"urn:ietf:params:oauth:grant-type:jwt-bearer",assertion:msg+"."+b64url(signature)}),
    signal:timeout()
  });
  if(!res.ok)throw new Error("google_token_"+res.status);
  const data=await res.json();
  if(!data.access_token)throw new Error("google_token_empty");
  return data.access_token;
}

async function appendSheet(env,lead){
  const token=await googleAccessToken(env.GOOGLE_SERVICE_ACCOUNT_JSON);
  const range=encodeURIComponent("Leads!A:K");
  const url="https://sheets.googleapis.com/v4/spreadsheets/"+encodeURIComponent(env.GOOGLE_SHEET_ID)+"/values/"+range+
    ":append?valueInputOption=RAW&insertDataOption=INSERT_ROWS";
  const row=[lead.id,lead.created_at,lead.name,lead.contact,lead.interest,
    lead.page_path,lead.locale,"Mới","","","Chưa liên hệ"];
  const res=await fetch(url,{method:"POST",headers:{
    "Authorization":"Bearer "+token,"Content-Type":"application/json"
  },body:JSON.stringify({majorDimension:"ROWS",values:[row]}),signal:timeout()});
  if(!res.ok)throw new Error("sheets_http_"+res.status);
}

async function sendEmail(env,lead){
  const to=env.LEAD_NOTIFY_TO.split(",").map(x=>x.trim()).filter(Boolean);
  if(!to.length||to.length>5)throw new Error("email_recipients");
  const body=[
    "Khách hàng mới từ form Bio-A Group",
    "Họ tên: "+lead.name,
    "Liên hệ: "+lead.contact,
    "Quan tâm: "+(lead.interest||"Chưa chọn"),
    "Nguồn: "+lead.page_path,
    "Thời gian (UTC): "+lead.created_at,
    "Mã lead: "+lead.id
  ].join("\n");
  const res=await fetch("https://api.resend.com/emails",{
    method:"POST",headers:{"Authorization":"Bearer "+env.RESEND_API_KEY,"Content-Type":"application/json"},
    body:JSON.stringify({
      from:env.LEAD_FROM,to,
      subject:"[Bio-A] Yêu cầu tư vấn mới",
      text:body,
      html:"<p><b>Lead mới từ Bio-A Group</b></p><pre style=\"white-space:pre-wrap;font-family:Arial,sans-serif\">"+escapeHtml(body)+"</pre>"
    }),
    signal:timeout()
  });
  if(!res.ok)throw new Error("email_http_"+res.status);
}

async function fingerprint(ip,secret){
  const key=await crypto.subtle.importKey("raw",new TextEncoder().encode(secret),{name:"HMAC",hash:"SHA-256"},false,["sign"]);
  const signature=await crypto.subtle.sign("HMAC",key,new TextEncoder().encode(ip));
  return b64url(new Uint8Array(signature));
}

export async function onRequestPost({request,env}){
  // Security: never accept a cross-site browser submission.
  const origin=request.headers.get("Origin");
  if(origin&&origin!==new URL(request.url).origin)return json({ok:false,error:"forbidden"},403);
  if(!env.BIOA_LEADS_DB||!env.LEAD_RATE_SECRET)return json({ok:false,error:"not_configured"},503);
  if(!(request.headers.get("Content-Type")||"").toLowerCase().includes("application/json"))
    return json({ok:false,error:"content_type"},415);
  if(Number(request.headers.get("Content-Length")||0)>4096)return json({ok:false,error:"too_large"},413);

  let data;
  try{const text=await request.text();if(text.length>4096)return json({ok:false,error:"too_large"},413);data=JSON.parse(text);}
  catch{return json({ok:false,error:"invalid_json"},400);}
  const id=clean(data.submission_id,48);
  const name=clean(data.name,120),contact=clean(data.contact,90);
  const interest=clean(data.interest,240),locale=data.locale==="en"?"en":"vi";
  const page=clean(data.page_path,300);
  if(data.website)return json({ok:true}); // Honeypot: do not store spam.
  if(!(/^[a-f0-9-]{36}$/i.test(id)||/^bioa_[A-Za-z0-9_-]{12}$/.test(id))||!name||name.length<2||!contact||contact.length<4||
     contact.length>80||data.consent!==true||!page.startsWith("/")||page.startsWith("//"))
     return json({ok:false,error:"validation"},400);

  const db=env.BIOA_LEADS_DB;
  const ip=request.headers.get("CF-Connecting-IP")||"unknown";
  let key;
  try{key=await fingerprint(ip,env.LEAD_RATE_SECRET);}
  catch{return json({ok:false,error:"not_configured"},503);}
  // Same id is idempotent on network retry; no duplicate sales alerts.
  const seen=await db.prepare("SELECT id FROM bioa_leads WHERE id=?1").bind(id).first();
  if(seen)return json({ok:true,id});
  const recent=await db.prepare(
    "SELECT count(*) AS total FROM bioa_leads WHERE ip_hash=?1 AND created_at>=datetime('now','-1 hour')"
  ).bind(key).first();
  if((recent?.total||0)>=5)return json({ok:false,error:"rate_limited"},429);

  const now=new Date().toISOString();
  const lead={id,name,contact,interest,locale,page_path:page,created_at:now};
  try{
    await db.prepare(
      "INSERT INTO bioa_leads (id,created_at,name,contact,interest,locale,page_path,consent_at,ip_hash,sheet_status,email_status)"+
      " VALUES (?1,?2,?3,?4,?5,?6,?7,?8,?9,'pending','pending')"
    ).bind(id,now,name,contact,interest,locale,page,now,key).run();
  }catch{return json({ok:false,error:"storage_failed"},503);}

  // Delivery is secondary: D1 lead survives Google/Resend failures.
  const configuredSheet=!!(env.GOOGLE_SERVICE_ACCOUNT_JSON&&env.GOOGLE_SHEET_ID);
  const configuredEmail=!!(env.RESEND_API_KEY&&env.LEAD_NOTIFY_TO&&env.LEAD_FROM);
  const deliveries=await Promise.allSettled([
    configuredSheet?appendSheet(env,lead):Promise.resolve("unconfigured"),
    configuredEmail?sendEmail(env,lead):Promise.resolve("unconfigured")
  ]);
  const state=(result,configured)=>!configured?"not_configured":result.status==="fulfilled"?"sent":"failed";
  const sheetState=state(deliveries[0],configuredSheet),emailState=state(deliveries[1],configuredEmail);
  try{
    await db.prepare("UPDATE bioa_leads SET sheet_status=?1,email_status=?2 WHERE id=?3")
      .bind(sheetState,emailState,id).run();
  }catch{ /* D1 insert is already durable; do not falsely fail the visitor. */ }
  return json({ok:true,id});
}

export function onRequestGet(){return json({ok:false,error:"method_not_allowed"},405);}
