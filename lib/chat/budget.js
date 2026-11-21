// R28d Workers AI cost guard (fail closed). Every model call reserves its WORST-CASE Neurons first; the reservation is one
// atomic D1 statement (upsert with a WHERE on the running total), so concurrent requests cannot overshoot the daily cap.
// Workers AI free allocation: 10,000 Neurons/day per account, reset 00:00 UTC (developers.cloudflare.com/workers-ai/
// platform/pricing, checked 2026-11-21). Caps per flow (chat / i18n) are clamped in code so their sum stays below it:
// chat <= 3,000, i18n <= 6,000. Other Workers AI usage on the same account also draws on the allocation, so the cost
// gate (env BIOA_AI_COST_GATE) must be set by the owner only after checking the plan (docs/r28d/COST_AND_SECURITY.md).
// Unknown model => no rate => refused (no guessing).

// Neurons per 1M tokens [input, output] — Cloudflare pricing table 2026-11-21.
export const NEURON_RATES = Object.freeze({
  "@cf/google/gemma-4-26b-a4b-it": [9091, 27273],
  "@cf/zai-org/glm-4.7-flash": [5500, 36400],
  "@cf/meta/llama-3.1-8b-instruct": [25608, 75147],
  "@cf/meta/llama-3.2-3b-instruct": [4625, 30475],
});
export const FLOW_MAX = Object.freeze({ chat: 3000, i18n: 6000 });

// Conservative token estimate: 1 token per 2 characters (Vietnamese diacritics tokenise poorly) + 16 per message.
export const estimateTokens = (text) => Math.ceil(String(text || "").length / 2) + 16;

export function worstCaseNeurons(model, inputText, maxOutputTokens) {
  const r = NEURON_RATES[model];
  if (!r) return null;
  return Math.ceil((estimateTokens(inputText) * r[0] + maxOutputTokens * r[1]) / 1e6);
}

export const utcDay = (now = Date.now()) => new Date(now).toISOString().slice(0, 10);

const ready = new WeakSet();
export function d1Budget(db, { flow = "chat", cap = FLOW_MAX.chat, now = () => Date.now() } = {}) {
  const limit = Math.max(0, Math.min(Number(cap) || 0, FLOW_MAX[flow] ?? 0));
  return {
    flow, limit,
    async reserve(neurons) {
      const n = Math.ceil(Number(neurons));
      if (!db || !Number.isFinite(n) || n <= 0 || n > limit) return false;
      if (!ready.has(db)) {
        await db.prepare("CREATE TABLE IF NOT EXISTS bioa_ai_budget (day TEXT NOT NULL, flow TEXT NOT NULL, neurons INTEGER NOT NULL, calls INTEGER NOT NULL, PRIMARY KEY (day, flow))").run();
        ready.add(db);
      }
      const row = await db.prepare(
        "INSERT INTO bioa_ai_budget (day, flow, neurons, calls) VALUES (?1, ?2, ?3, 1) " +
        "ON CONFLICT (day, flow) DO UPDATE SET neurons = neurons + excluded.neurons, calls = calls + 1 " +
        "WHERE bioa_ai_budget.neurons + excluded.neurons <= ?4 RETURNING neurons"
      ).bind(utcDay(now()), flow, n, limit).first();
      return !!(row && Number(row.neurons) <= limit);
    },
  };
}
