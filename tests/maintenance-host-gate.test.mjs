import test from "node:test";
import assert from "node:assert/strict";
import {onRequest} from "../functions/_middleware.js";

const secret="f".repeat(48);
const env={BIOA_SITE_MODE:"maintenance",BIOA_PREVIEW_SECRET:secret};
const run=async (url,opts={})=>{
  let forwarded=0;
  const req=new Request(url,{method:opts.method||"GET",headers:{Accept:opts.accept||"text/html",...(opts.cookie?{Cookie:opts.cookie}:{})}});
  const response=await onRequest({request:req,env:opts.env||env,next:async()=>{forwarded++;return new Response("OK",{status:200,headers:{"Content-Type":"text/html"}});}});
  return {response,forwarded,text:await response.text()};
};

test("Production exact domains and www remain private without owner cookie",async()=>{
  for(const host of ["bioagroup.vn","www.bioagroup.vn","bioagroup.pages.dev"]){
    const r=await run("https://"+host+"/");
    assert.equal(r.response.status,503,host);
    assert.equal(r.forwarded,0);
    assert.match(r.response.headers.get("X-Robots-Tag")||"","noindex");
    const api=await run("https://"+host+"/api/lead/config");
    assert.equal(api.response.status,503);
    assert.equal(api.forwarded,0);
  }
});

test("Preview deployments and branch aliases show static UI without a secret",async()=>{
  for(const host of ["83ab482d.bioagroup.pages.dev","7a5f44e1.bioagroup.pages.dev","candidate-first-paint.bioagroup.pages.dev"]){
    for(const path of ["/","/en/","/about/","/assets/bioa-full.svg"]){
      const r=await run("https://"+host+path);
      assert.equal(r.response.status,200,host+path);
      assert.equal(r.forwarded,1);
      assert.match(r.response.headers.get("X-Robots-Tag")||"","noindex");
    }
  }
});

test("Public previews block backend API, owner access and unsafe methods",async()=>{
  const host="83ab482d.bioagroup.pages.dev";
  for(const path of ["/api/lead","/api/lead/config","/_bioa-access","/_bioa-access/exit"]){
    const r=await run("https://"+host+path);
    assert.equal(r.response.status,503,path);
    assert.equal(r.forwarded,0,path);
  }
  const post=await run("https://"+host+"/",{method:"POST"});
  assert.equal(post.response.status,503);
  assert.equal(post.forwarded,0);
});

test("All previews disallow robots indexing, unrelated hosts fail closed",async()=>{
  const robots=await run("https://83ab482d.bioagroup.pages.dev/robots.txt");
  assert.equal(robots.response.status,200);
  assert.equal(robots.forwarded,0);
  assert.match(robots.text,/Disallow: \//);
  for(const host of ["foo.pages.dev","bioagroup.pages.dev.evil.example","x.y.bioagroup.pages.dev","rogue.example"]){
    const r=await run("https://"+host+"/");
    assert.equal(r.response.status,503,host);
    assert.equal(r.forwarded,0);
  }
});

test("Production owner 14-day cookie sign-in remains host-bound",async()=>{
  const access=await run("https://bioagroup.vn/_bioa-access?key="+secret);
  assert.equal(access.response.status,303);
  const cookie=(access.response.headers.get("set-cookie")||"").split(";")[0];
  assert.match(cookie,/^__Host-bioa_preview=/);
  const owner=await run("https://bioagroup.vn/",{cookie});
  assert.equal(owner.response.status,200);
  assert.equal(owner.forwarded,1);
  const wrongHost=await run("https://bioagroup.pages.dev/",{cookie});
  assert.equal(wrongHost.response.status,503);
  const api=await run("https://bioagroup.vn/api/lead/config",{cookie});
  assert.equal(api.response.status,200);
  assert.equal(api.forwarded,1);
});

test("Explicit public switch still publishes main domain but not preview API",async()=>{
  const publicEnv={BIOA_SITE_MODE:"public"};
  assert.equal((await run("https://bioagroup.vn/",{env:publicEnv})).response.status,200);
  assert.equal((await run("https://83ab482d.bioagroup.pages.dev/api/lead/config",{env:publicEnv})).response.status,503);
});
