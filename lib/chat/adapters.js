// BIO-A chat provider adapters (AI-READY, not AI-LIVE).
// The gateway never talks to a model vendor directly: it talks to one adapter.
//   disabled  default; nothing is sent anywhere.
//   mock      DEMO only: fixed local replies, clearly marked mode "demo".
//   http      generic JSON endpoint chosen by the owner later (trained bot / knowledge-base
//             service / vendor proxy). Needs BIOA_CHAT_ENDPOINT (https) + BIOA_CHAT_API_KEY,
//             both server-side Pages secrets. Request: {session_id, locale, message};
//             expected response: {reply: string, handoff?: boolean}.
// No adapter persists conversations; storing or forwarding chats needs an owner-approved
// privacy policy and configuration first (docs/CHAT_AI_INTEGRATION.md).

const DEMO_REPLY = {
  vi: "[DEMO] Đây là phản hồi thử nghiệm, chưa có trợ lý AI thật. Để được tư vấn ngay, vui lòng nhắn Zalo hoặc gọi hotline Bio-A Group.",
  en: "[DEMO] This is a test reply; no real AI assistant is connected yet. For immediate help, please message Bio-A Group on Zalo or call our hotline."
};

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
  return { name: "disabled", mode: "off", configured: false, async reply(){ throw Object.assign(new Error("disabled"), { code: "disabled" }); } };
}
