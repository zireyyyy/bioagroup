export function onRequestGet({env}){
 const site=Boolean(env.TURNSTILE_SITE_KEY),secret=Boolean(env.TURNSTILE_SECRET_KEY);
 return Response.json({enabled:site&&secret,misconfigured:site!==secret,sitekey:site&&secret?env.TURNSTILE_SITE_KEY:null},
 {headers:{"Cache-Control":"no-store","X-Content-Type-Options":"nosniff"}});
}
