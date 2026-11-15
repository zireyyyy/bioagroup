// R26 PROD-HASH-GATE: Production deployments must not be readable through their <hash>.bioagroup.pages.dev URL while the
// site is in maintenance; Preview deployments (no BIOA_DEPLOY_ENV) keep today's public static preview behaviour.
import test from "node:test";
import assert from "node:assert/strict";
import { onRequest } from "../functions/_middleware.js";

const secret = "f".repeat(48);
const prod = { BIOA_SITE_MODE: "maintenance", BIOA_PREVIEW_SECRET: secret, BIOA_DEPLOY_ENV: "production" };
const preview = { BIOA_SOURCE_URL: "x" }; // the real Preview environment has no BIOA_SITE_MODE / BIOA_DEPLOY_ENV
const run = async (url, env, opts = {}) => {
  let forwarded = 0;
  const req = new Request(url, { method: opts.method || "GET", headers: { Accept: "text/html", ...(opts.cookie ? { Cookie: opts.cookie } : {}) } });
  const response = await onRequest({ request: req, env, next: async () => { forwarded++; return new Response("OK", { status: 200, headers: { "Content-Type": "text/html" } }); } });
  return { response, forwarded, text: await response.text() };
};

test("production deployment hash URL is behind maintenance (pages, assets, robots, APIs)", async () => {
  const host = "3045c564.bioagroup.pages.dev";
  for (const p of ["/", "/en/", "/about/", "/assets/bioa-full.svg", "/api/lead", "/api/chat"]){
    const r = await run(`https://${host}${p}`, prod);
    assert.equal(r.response.status, 503, p);
    assert.equal(r.forwarded, 0, p);
    assert.match(r.response.headers.get("X-Robots-Tag") || "", /noindex/);
  }
  const robots = await run(`https://${host}/robots.txt`, prod);
  assert.match(robots.text, /Disallow: \//);
});

test("owner access works on a production hash URL with the host-bound cookie", async () => {
  const host = "3045c564.bioagroup.pages.dev";
  const entry = await run(`https://${host}/_bioa-access?key=${secret}`, prod);
  assert.equal(entry.response.status, 303);
  const cookie = (entry.response.headers.get("Set-Cookie") || "").split(";")[0];
  const page = await run(`https://${host}/`, prod, { cookie });
  assert.equal(page.response.status, 200);
  assert.equal(page.forwarded, 1);
  const other = await run(`https://bioagroup.vn/`, prod, { cookie });
  assert.equal(other.response.status, 503, "cookie is bound to its host");
});

test("preview deployments and branch aliases stay public static previews; their APIs stay locked", async () => {
  for (const host of ["2c38577d.bioagroup.pages.dev", "cms-preview.bioagroup.pages.dev"]){
    const r = await run(`https://${host}/`, preview);
    assert.equal(r.response.status, 200, host);
    assert.equal(r.forwarded, 1);
    const api = await run(`https://${host}/api/lead`, preview, { method: "POST" });
    assert.equal(api.response.status, 503);
    assert.equal(api.forwarded, 0);
  }
});

test("production exact hosts unchanged; public mode opens hash URLs only when the owner switches the site public", async () => {
  assert.equal((await run("https://bioagroup.vn/", prod)).response.status, 503);
  const pub = { ...prod, BIOA_SITE_MODE: "public" };
  assert.equal((await run("https://3045c564.bioagroup.pages.dev/", pub)).response.status, 200);
});
