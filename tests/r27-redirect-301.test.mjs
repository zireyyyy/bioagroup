// R27b REDIRECT-301: static redirect pages (retired Blog index pages, D11 legacy slugs, Careers slugs) are answered by
// the Pages middleware with a real HTTP 301 from dist/_bioa-redirects.json; maintenance, APIs and normal pages unchanged.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { R28C_RENAMES } from "./r28-rewritten-slugs.mjs";

const MAP = { "/blog/page/4/": "/blog/", "/en/blog/page/6/": "/en/blog/", "/lien-he/": "/contacts/" };
const secret = "f".repeat(48);
const load = async () => (await import("../functions/_middleware.js?" + Math.random())).onRequest; // fresh module = fresh map cache
const ASSETS = { calls: 0, async fetch(req){ this.calls++; const u = new URL(req.url ?? req); return u.pathname === "/_bioa-redirects.json" ? new Response(JSON.stringify(MAP), { headers: { "Content-Type": "application/json" } }) : new Response("nf", { status: 404 }); } };
const run = async (onRequest, url, env, opts = {}) => {
  let forwarded = 0;
  const request = new Request(url, { method: opts.method || "GET", headers: { Accept: "text/html", ...(opts.cookie ? { Cookie: opts.cookie } : {}) } });
  const response = await onRequest({ request, env: { ...env, ASSETS }, next: async () => { forwarded++; return new Response("PAGE", { status: 200 }); } });
  return { response, forwarded };
};

test("preview host: listed paths answer 301 (with and without trailing slash, query kept); other pages unchanged", async () => {
  const onRequest = await load();
  const env = {};
  let r = await run(onRequest, "https://cms-preview.bioagroup.pages.dev/blog/page/4/", env);
  assert.equal(r.response.status, 301); assert.equal(r.response.headers.get("Location"), "/blog/"); assert.equal(r.forwarded, 0);
  r = await run(onRequest, "https://cms-preview.bioagroup.pages.dev/en/blog/page/6?x=1", env);
  assert.equal(r.response.status, 301); assert.equal(r.response.headers.get("Location"), "/en/blog/?x=1");
  r = await run(onRequest, "https://cms-preview.bioagroup.pages.dev/blog/page/2/", env);
  assert.equal(r.response.status, 200); assert.equal(r.forwarded, 1);
  r = await run(onRequest, "https://cms-preview.bioagroup.pages.dev/api/lead", env, { method: "POST" });
  assert.equal(r.response.status, 503);
});

test("production maintenance: guests still get 503 (no redirect leak); the owner session gets the 301", async () => {
  const onRequest = await load();
  const env = { BIOA_SITE_MODE: "maintenance", BIOA_PREVIEW_SECRET: secret, BIOA_DEPLOY_ENV: "production" };
  let r = await run(onRequest, "https://bioagroup.vn/blog/page/4/", env);
  assert.equal(r.response.status, 503); assert.equal(r.forwarded, 0);
  const entry = await run(onRequest, "https://bioagroup.vn/_bioa-access?key=" + secret, env);
  const cookie = (entry.response.headers.get("Set-Cookie") || "").split(";")[0];
  r = await run(onRequest, "https://bioagroup.vn/lien-he/", env, { cookie });
  assert.equal(r.response.status, 301); assert.equal(r.response.headers.get("Location"), "/contacts/"); assert.match(r.response.headers.get("X-Robots-Tag") || "", /noindex/);
  r = await run(onRequest, "https://bioagroup.vn/contacts/", env, { cookie });
  assert.equal(r.response.status, 200);
});

test("production public mode: 301 for listed paths; www still goes to the apex first", async () => {
  const onRequest = await load();
  const env = { BIOA_SITE_MODE: "public", BIOA_DEPLOY_ENV: "production" };
  let r = await run(onRequest, "https://bioagroup.vn/blog/page/4/", env);
  assert.equal(r.response.status, 301); assert.equal(r.response.headers.get("Location"), "/blog/");
  r = await run(onRequest, "https://www.bioagroup.vn/blog/page/4/", env);
  assert.equal(r.response.status, 301); assert.equal(r.response.headers.get("Location"), "https://bioagroup.vn/blog/page/4/");
  r = await run(onRequest, "https://bioagroup.vn/about/", env);
  assert.equal(r.response.status, 200);
});

test("the built map lists every redirect page with a site-relative target", () => {
  const f = new URL("../dist/_bioa-redirects.json", import.meta.url);
  if (!fs.existsSync(f)) return; // unit run without a build
  const map = JSON.parse(fs.readFileSync(f, "utf8"));
  // R28c (owner 2026-11-20): with the 29 rewritten articles published, /blog/page/2-6/ are real list pages again, so a
  // built list page must never be redirected; the 13 renamed articles map old slug -> new slug (VI/EN).
  for (const pre of ["", "/en"]) for (const n of [2, 3, 4, 5, 6]) {
    const route = pre + "/blog/page/" + n + "/";
    if (fs.existsSync(new URL("../dist" + route + "index.html", import.meta.url)) && !/bioa-legacy-redirect/.test(fs.readFileSync(new URL("../dist" + route + "index.html", import.meta.url), "utf8"))) assert.equal(map[route], undefined, route + " is a real list page");
    else assert.equal(map[route], pre + "/blog/", route);
  }
  for (const [o, n] of Object.entries(R28C_RENAMES)) for (const pre of ["", "/en"]) assert.equal(map[pre + "/blog/" + o + "/"], pre + "/blog/" + n + "/");
  for (const [from, to] of Object.entries(map)) { assert.match(from, /^\/[a-z0-9/-]*\/$/); assert.match(to, /^\/(?!\/)/); }
});
