// Chat API gateway (AI-READY) — no network: global fetch is replaced by a tripwire.
import test from "node:test";
import assert from "node:assert/strict";
import { webcrypto } from "node:crypto";
import { readFileSync } from "node:fs";
import { handleChat, memoryLimiter, LIMITS } from "../lib/chat/gateway.js";
import { createAdapter } from "../lib/chat/adapters.js";
import { onRequest } from "../functions/api/chat.js";

if (!globalThis.crypto) globalThis.crypto = webcrypto;
let networkCalls = 0;
globalThis.fetch = async () => { networkCalls++; throw new Error("network forbidden in tests"); };

const ORIGIN = "https://bioagroup.vn";
const SID = "s_0123456789abcdef";
const req = (body, { method = "POST", origin = ORIGIN, type = "application/json", ip = "203.0.113.7" } = {}) =>
  new Request(ORIGIN + "/api/chat", { method, headers: { ...(origin ? { Origin: origin } : {}), ...(type ? { "Content-Type": type } : {}), "CF-Connecting-IP": ip },
    body: method === "POST" ? (typeof body === "string" ? body : JSON.stringify(body)) : undefined });
const MOCK = { BIOA_CHAT_ENABLED: "true", BIOA_CHAT_PROVIDER: "mock" };
const call = async (r, env, deps = {}) => { const res = await handleChat(r, env, { limiter: memoryLimiter(), ...deps }); return { status: res.status, body: await res.json(), headers: res.headers }; };

test("default: feature flag OFF -> 503 disabled, no adapter, no network", async () => {
  const r = await call(req({ session_id: SID, locale: "vi", message: "Xin chào" }), {});
  assert.equal(r.status, 503); assert.equal(r.body.status, "disabled"); assert.equal(r.body.lead_created, false);
  assert.ok(r.body.handoff_channels.zalo.startsWith("https://zalo.me/"));
  const p = await onRequest({ request: req({ session_id: SID, locale: "vi", message: "x" }), env: {} });
  assert.equal(p.status, 503);
  const flagOnly = await call(req({ session_id: SID, locale: "vi", message: "x" }), { BIOA_CHAT_ENABLED: "true" });
  assert.equal(flagOnly.body.status, "disabled", "enabled flag without a provider stays disabled");
  assert.equal(networkCalls, 0);
});

test("method, origin, content type", async () => {
  assert.equal((await call(req(null, { method: "GET" }), MOCK)).status, 405);
  assert.equal((await call(req({}, { origin: null }), MOCK)).status, 403);
  assert.equal((await call(req({}, { origin: "https://evil.example" }), MOCK)).status, 403);
  assert.equal((await call(req("message=x", { type: "application/x-www-form-urlencoded" }), MOCK)).status, 415);
});

test("input validation and spam honeypot", async () => {
  const cases = [
    ["{bad", 400, "invalid_json"], [[], 400, "invalid_body"],
    [{ session_id: "short", locale: "vi", message: "x" }, 400, "invalid_session"],
    [{ session_id: SID, locale: "fr", message: "x" }, 400, "invalid_locale"],
    [{ session_id: SID, locale: "vi", message: 5 }, 400, "invalid_message"],
    [{ session_id: SID, locale: "vi", message: " \u0000 " }, 400, "empty_message"],
    [{ session_id: SID, locale: "vi", message: "a".repeat(LIMITS.maxMessageChars + 1) }, 413, "message_too_long"],
    [{ session_id: SID, locale: "vi", message: "x", website: "http://spam" }, 400, "rejected"],
    ["x".repeat(LIMITS.maxBodyBytes + 10), 413, "payload_too_large"]
  ];
  for (const [body, status, code] of cases){
    const r = await call(req(body), MOCK);
    assert.equal(r.status, status, code); assert.equal(r.body.status, code); assert.equal(r.body.ok, false);
  }
});

test("mock adapter = DEMO replies in VI and EN, never a lead", async () => {
  for (const locale of ["vi", "en"]){
    const r = await call(req({ session_id: SID, locale, message: "Tư vấn gia công serum" }), MOCK);
    assert.equal(r.status, 200); assert.equal(r.body.mode, "demo"); assert.equal(r.body.lead_created, false);
    assert.match(r.body.reply, /^\[DEMO\]/); assert.equal(r.headers.get("Cache-Control"), "no-store");
  }
  assert.equal(networkCalls, 0);
});

test("rate limit per IP and per session", async () => {
  const limiter = memoryLimiter();
  let last;
  for (let i = 0; i < LIMITS.perSessionMinute + 1; i++) last = await call(req({ session_id: SID, locale: "vi", message: "m" + i }), MOCK, { limiter });
  assert.equal(last.status, 429); assert.equal(last.body.status, "rate_limited");
  const limiter2 = memoryLimiter(); let s;
  for (let i = 0; i < LIMITS.perMinute + 1; i++) s = await call(req({ session_id: "s_" + String(i).padStart(16, "0"), locale: "en", message: "m" }), MOCK, { limiter: limiter2 });
  assert.equal(s.status, 429);
  const blocked = await call(req({ session_id: SID, locale: "vi", message: "m" }), { ...MOCK, BIOA_CHAT_RATE_LIMITER: { limit: async () => ({ success: false }) } });
  assert.equal(blocked.status, 429);
});

test("provider errors, timeout and misconfiguration", async () => {
  const body = { session_id: SID, locale: "vi", message: "x" };
  const throwing = code => () => ({ name: "fake", mode: "live", configured: true, async reply(){ throw code; } });
  assert.equal((await call(req(body), MOCK, { createAdapter: throwing(Object.assign(new Error("t"), { name: "TimeoutError" })) })).body.status, "timeout");
  assert.equal((await call(req(body), MOCK, { createAdapter: throwing(new Error("boom")) })).status, 502);
  const mis = await call(req(body), { BIOA_CHAT_ENABLED: "true", BIOA_CHAT_PROVIDER: "http" });
  assert.equal(mis.status, 503); assert.equal(mis.body.status, "misconfigured");
  const insecure = await call(req(body), { BIOA_CHAT_ENABLED: "true", BIOA_CHAT_PROVIDER: "http", BIOA_CHAT_ENDPOINT: "http://x.example/", BIOA_CHAT_API_KEY: "k".repeat(20) });
  assert.equal(insecure.body.status, "misconfigured", "http endpoint must be https");
  assert.equal(networkCalls, 0);
});

test("generic http adapter sends only session/locale/message to the configured endpoint", async () => {
  const seen = [];
  const env = { BIOA_CHAT_ENABLED: "true", BIOA_CHAT_PROVIDER: "http", BIOA_CHAT_ENDPOINT: "https://bot.example/v1/chat", BIOA_CHAT_API_KEY: "k".repeat(24) };
  const fakeFetch = async (url, init) => { seen.push({ url, init }); return new Response(JSON.stringify({ reply: "Xin chào", handoff: false }), { status: 200 }); };
  const r = await call(req({ session_id: SID, locale: "vi", message: "hello", extra: "dropped" }), env, { createAdapter: (e) => createAdapter(e, { fetch: fakeFetch }) });
  assert.equal(r.status, 200); assert.equal(r.body.mode, "live"); assert.equal(r.body.reply, "Xin chào");
  assert.deepEqual(JSON.parse(seen[0].init.body), { session_id: SID, locale: "vi", message: "hello" });
  assert.equal(seen[0].init.headers.Authorization, "Bearer " + "k".repeat(24));
  assert.equal(networkCalls, 0);
});

test("gateway is isolated from the lead pipeline", () => {
  const src = readFileSync(new URL("../lib/chat/gateway.js", import.meta.url), "utf8") + readFileSync(new URL("../lib/chat/adapters.js", import.meta.url), "utf8");
  for (const forbidden of ["bioa_leads", "env.DB", "GOOGLE_", "RESEND", "/api/lead", "console.log("]) assert.ok(!src.includes(forbidden), forbidden);
});
