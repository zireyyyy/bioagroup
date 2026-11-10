// BIO-A chat API gateway — contract v1 (docs/CHAT_AI_INTEGRATION.md).
// POST /api/chat  {session_id, locale: "vi"|"en", message, website: "" (honeypot)}
//  200 {ok:true, mode:"demo"|"live", reply, handoff, session_id, lead_created:false}
//  4xx/5xx {ok:false, status, handoff_channels}
// Feature flag BIOA_CHAT_ENABLED must be exactly "true"; default is OFF (503 disabled).
// The gateway never creates a lead, never stores message text and never logs it.
import { createAdapter } from "./adapters.js";
import { BUSINESS } from "../../bioa-business.mjs";

export const LIMITS = Object.freeze({ maxBodyBytes: 4096, maxMessageChars: 1000, perMinute: 10, perSessionMinute: 6, defaultTimeoutMs: 8000, maxTimeoutMs: 15000 });
const SESSION_RE = /^[A-Za-z0-9_-]{16,64}$/;
const CHANNELS = Object.freeze({ zalo: BUSINESS.zalo, phone: BUSINESS.phoneHref, email: "mailto:" + BUSINESS.email });
const HEADERS = { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff", "X-Robots-Tag": "noindex" };
const out = (status, body) => new Response(JSON.stringify(body), { status, headers: HEADERS });
const fail = (status, code) => out(status, { ok: false, status: code, handoff_channels: CHANNELS, lead_created: false });

// Best-effort per-isolate limiter; a Cloudflare Rate Limiting binding (BIOA_CHAT_RATE_LIMITER)
// is used when present for a durable, cross-isolate limit.
export function memoryLimiter(now = () => Date.now()){
  const hits = new Map();
  return { async allow(key, max){
    const t = now(), w = (hits.get(key) || []).filter(x => t - x < 60000);
    if (w.length >= max){ hits.set(key, w); return false; }
    w.push(t); hits.set(key, w);
    if (hits.size > 5000) for (const k of hits.keys()){ hits.delete(k); if (hits.size <= 4000) break; }
    return true;
  } };
}
const defaultLimiter = memoryLimiter();

async function ipKey(ip){
  const d = await crypto.subtle.digest("SHA-256", new TextEncoder().encode("bioa-chat|" + ip));
  return Array.from(new Uint8Array(d).slice(0, 12), b => b.toString(16).padStart(2, "0")).join("");
}
const cleanText = s => s.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "").replace(/\s+/g, " ").trim();

export async function handleChat(request, env = {}, deps = {}){
  if (request.method !== "POST") return fail(405, "method_not_allowed");
  const url = new URL(request.url);
  const origin = request.headers.get("Origin");
  if (!origin || origin !== url.origin) return fail(403, "forbidden_origin");
  if (String(env.BIOA_CHAT_ENABLED || "").trim() !== "true") return fail(503, "disabled");

  const adapter = (deps.createAdapter || createAdapter)(env, deps);
  if (adapter.name === "disabled" || !adapter.configured) return fail(503, adapter.name === "disabled" ? "disabled" : "misconfigured");

  if (!/^application\/json\b/i.test(request.headers.get("Content-Type") || "")) return fail(415, "unsupported_media_type");
  const len = Number(request.headers.get("Content-Length") || 0);
  if (len > LIMITS.maxBodyBytes) return fail(413, "payload_too_large");
  const raw = await request.text();
  if (new TextEncoder().encode(raw).length > LIMITS.maxBodyBytes) return fail(413, "payload_too_large");
  let data; try { data = JSON.parse(raw); } catch { return fail(400, "invalid_json"); }
  if (!data || typeof data !== "object" || Array.isArray(data)) return fail(400, "invalid_body");

  if (typeof data.website === "string" && data.website.trim() !== "") return fail(400, "rejected");
  const sessionId = typeof data.session_id === "string" ? data.session_id : "";
  if (!SESSION_RE.test(sessionId)) return fail(400, "invalid_session");
  const locale = data.locale === "en" ? "en" : data.locale === "vi" ? "vi" : null;
  if (!locale) return fail(400, "invalid_locale");
  if (typeof data.message !== "string") return fail(400, "invalid_message");
  const message = cleanText(data.message);
  if (!message) return fail(400, "empty_message");
  if (message.length > LIMITS.maxMessageChars) return fail(413, "message_too_long");

  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  const key = await ipKey(ip);
  const binding = env.BIOA_CHAT_RATE_LIMITER;
  if (binding && typeof binding.limit === "function"){
    const r = await binding.limit({ key: "chat:" + key });
    if (!r || !r.success) return fail(429, "rate_limited");
  }
  const limiter = deps.limiter || defaultLimiter;
  if (!await limiter.allow("ip:" + key, LIMITS.perMinute) || !await limiter.allow("s:" + sessionId, LIMITS.perSessionMinute))
    return fail(429, "rate_limited");

  const ms = Math.min(Math.max(Number(env.BIOA_CHAT_TIMEOUT_MS) || LIMITS.defaultTimeoutMs, 1000), LIMITS.maxTimeoutMs);
  const signal = (deps.timeoutSignal || (t => AbortSignal.timeout(t)))(ms);
  try {
    const r = await adapter.reply({ message, locale, sessionId, signal });
    return out(200, { ok: true, mode: adapter.mode, reply: r.reply, handoff: r.handoff === true, handoff_channels: CHANNELS, session_id: sessionId, lead_created: false });
  } catch (e){
    if (e && (e.name === "TimeoutError" || e.name === "AbortError")) return fail(504, "timeout");
    console.error("bioa-chat provider failure:", e && e.code || "error");
    return fail(502, "provider_error");
  }
}
