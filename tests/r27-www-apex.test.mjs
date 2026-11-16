// R27 F04 WWW-APEX: www.bioagroup.vn answers only with a 301 to the apex (path + query kept), in every site mode of the Production environment,
// for every method, and never forwards to the site or an API (no way around the apex maintenance gate).
import test from "node:test";
import assert from "node:assert/strict";
import { onRequest } from "../functions/_middleware.js";

const secret = "f".repeat(48);
const run = async (url, env, opts = {}) => {
  let forwarded = 0;
  const req = new Request(url, { method: opts.method || "GET", headers: { Accept: "text/html", ...(opts.cookie ? { Cookie: opts.cookie } : {}) } });
  const response = await onRequest({ request: req, env, next: async () => { forwarded++; return new Response("OK", { status: 200 }); } });
  return { response, forwarded };
};
const envs = {
  maintenance: { BIOA_SITE_MODE: "maintenance", BIOA_PREVIEW_SECRET: secret, BIOA_DEPLOY_ENV: "production" },
  public: { BIOA_SITE_MODE: "public", BIOA_PREVIEW_SECRET: secret, BIOA_DEPLOY_ENV: "production" },
};

test("www redirects to the apex with path and query, in every mode and method", async () => {
  for (const [mode, env] of Object.entries(envs)) {
    for (const [path, method] of [["/", "GET"], ["/en/about/?a=1&b=two", "GET"], ["/tuyen-dung/", "HEAD"], ["/api/lead", "POST"], ["/_bioa-access?key=" + secret, "GET"], ["/robots.txt", "GET"]]) {
      const r = await run("https://www.bioagroup.vn" + path, env, { method });
      assert.equal(r.response.status, 301, mode + " " + method + " " + path);
      assert.equal(r.response.headers.get("Location"), "https://bioagroup.vn" + path, mode + " " + path);
      assert.equal(r.forwarded, 0, "www never reaches the site: " + mode + " " + path);
    }
  }
});

test("the apex itself is unchanged: maintenance 503, no redirect loop", async () => {
  const r = await run("https://bioagroup.vn/en/about/", envs.maintenance);
  assert.equal(r.response.status, 503);
  assert.equal(r.response.headers.get("Location"), null);
  assert.equal(r.forwarded, 0);
});

test("an owner cookie for www is useless: www still only redirects", async () => {
  const entry = await run("https://bioagroup.vn/_bioa-access?key=" + secret, envs.maintenance);
  const cookie = (entry.response.headers.get("Set-Cookie") || "").split(";")[0];
  const r = await run("https://www.bioagroup.vn/", envs.maintenance, { cookie });
  assert.equal(r.response.status, 301);
  assert.equal(r.forwarded, 0);
});

test("without BIOA_DEPLOY_ENV=production, www stays a protected exact host (pre-R27 behaviour)", async () => {
  const r = await run("https://www.bioagroup.vn/", { BIOA_SITE_MODE: "maintenance", BIOA_PREVIEW_SECRET: secret });
  assert.equal(r.response.status, 503);
  assert.equal(r.forwarded, 0);
});
