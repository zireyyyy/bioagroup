// BIO-A chat provider adapters (AI-READY, not AI-LIVE).
// The gateway never talks to a model vendor directly: it talks to one adapter.
//   disabled  default; nothing is sent anywhere.
//   mock      DEMO only: fixed local replies, clearly marked mode "demo".
//   http      generic JSON endpoint chosen by the owner later (trained bot / knowledge-base
//             service / vendor proxy). Needs BIOA_CHAT_ENDPOINT (https) + BIOA_CHAT_API_KEY,
//             both server-side Pages secrets. Request: {session_id, locale, message};
//             expected response: {reply: string, handoff?: boolean}.
//   faq       R28d: deterministic answers from lib/chat/knowledge.js (no model, no cost), mode "faq".
//   workers-ai  R28d: Cloudflare Workers AI binding (env.AI). Sensitive topics / injection / known FAQ are answered by
//             the deterministic router first; only other questions reach the model, after the cost gate
//             (BIOA_AI_COST_GATE="verified"), a D1 budget reservation (BIOA_AI_BUDGET_DB) and with a server-side
//             validation of the answer. Model: BIOA_CHAT_MODEL (default gemma-4-26b-a4b-it), rate table in budget.js.
// No adapter persists conversations; storing or forwarding chats needs an owner-approved
// privacy policy and configuration first (docs/CHAT_AI_INTEGRATION.md).

const DEMO_REPLY = {
  vi: "[DEMO] Đây là phản hồi thử nghiệm, chưa có trợ lý AI thật. Để được tư vấn ngay, vui lòng nhắn Zalo hoặc gọi hotline Bio-A Group.",
  en: "[DEMO] This is a test reply; no real AI assistant is connected yet. For immediate help, please message Bio-A Group on Zalo or call our hotline."
};

import { route, validateModelReply, systemPrompt, REPLIES } from "./knowledge.js";
import { d1Budget, worstCaseNeurons, NEURON_RATES } from "./budget.js";

export const DEFAULT_CHAT_MODEL = "@cf/google/gemma-4-26b-a4b-it";
export const CHAT_MAX_OUTPUT_TOKENS = 220;
const err = (m, code) => Object.assign(new Error(m), { code });

export function createAdapter(env = {}, deps = {}){
  const provider = String(env.BIOA_CHAT_PROVIDER || "disabled").trim().toLowerCase();
  if (provider === "mock") return {
    name: "mock", mode: "demo", configured: true,
    async reply({ locale }){ return { reply: DEMO_REPLY[locale] || DEMO_REPLY.vi, handoff: true }; }
  };
  if (provider === "http"){
    const endpoint = String(env.BIOA_CHAT_ENDPOINT || "");
    const key = String(env.BIOA_CHAT_API_KEY || "");
    const configured = /^https:\/\/[^\s/]+\//.test(endpoint + "/") && key.length >= 16;
    const doFetch = deps.fetch || ((...a) => fetch(...a));
    return {
      name: "http", mode: "live", configured,
      async reply({ message, locale, sessionId, signal }){
        const res = await doFetch(endpoint, {
          method: "POST", signal,
          headers: { "Content-Type": "application/json", "Authorization": "Bearer " + key },
          body: JSON.stringify({ session_id: sessionId, locale, message })
        });
        if (!res.ok) throw Object.assign(new Error("provider_http_" + res.status), { code: "provider_error" });
        const data = await res.json().catch(() => null);
        if (!data || typeof data.reply !== "string" || !data.reply.trim())
          throw Object.assign(new Error("provider_bad_response"), { code: "provider_error" });
        return { reply: data.reply.trim().slice(0, 4000), handoff: data.handoff === true };
      }
    };
  }
  if (provider === "faq") return {
    name: "faq", mode: "faq", configured: true,
    async reply({ message, locale }){
      const r = route(message, locale);
      return r ? { reply: r.reply, handoff: true } : { reply: REPLIES[locale === "en" ? "en" : "vi"].unknown, handoff: true };
    }
  };
  if (provider === "workers-ai"){
    const model = String(env.BIOA_CHAT_MODEL || DEFAULT_CHAT_MODEL).trim();
    const budget = deps.budget || d1Budget(env.BIOA_AI_BUDGET_DB, { flow: "chat", cap: Number(env.BIOA_CHAT_DAILY_NEURONS) || 1500 });
    const configured = !!(env.AI && typeof env.AI.run === "function") && String(env.BIOA_AI_COST_GATE || "").trim() === "verified"
      && !!NEURON_RATES[model] && (!!deps.budget || !!env.BIOA_AI_BUDGET_DB);
    return {
      name: "workers-ai", mode: "live", configured, model,
      async reply({ message, locale, signal }){
        const L = locale === "en" ? "en" : "vi";
        const fixed = route(message, L);
        if (fixed) return { reply: fixed.reply, handoff: true };
        const sys = systemPrompt(L);
        const need = worstCaseNeurons(model, sys + message, CHAT_MAX_OUTPUT_TOKENS);
        if (!need || !await budget.reserve(need)) throw err("daily AI budget reached", "quota");
        const run = env.AI.run(model, { messages: [{ role: "system", content: sys }, { role: "user", content: message }], max_tokens: CHAT_MAX_OUTPUT_TOKENS, temperature: 0.2 }, signal ? { signal } : undefined);
        const aborted = signal ? new Promise((_, rej) => signal.addEventListener("abort", () => rej(Object.assign(new Error("timeout"), { name: "TimeoutError" })), { once: true })) : null;
        const res = await (aborted ? Promise.race([run, aborted]) : run);
        const text = typeof res?.response === "string" ? res.response : res?.choices?.[0]?.message?.content;
        if (typeof text !== "string") throw err("provider_bad_response", "provider_error");
        const clean = validateModelReply(text, L);
        return { reply: clean || REPLIES[L].unknown, handoff: true };
      }
    };
  }
  return { name: "disabled", mode: "off", configured: false, async reply(){ throw Object.assign(new Error("disabled"), { code: "disabled" }); } };
}
