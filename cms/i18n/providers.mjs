// R28 VI-FIRST — translation providers. Every provider takes an array of Vietnamese strings (names/links already
// replaced by ⟦n⟧ placeholders) and returns an array of English strings of the same length.
//
//   none        default. Translation not activated (owner decision pending): every run fails with a clear message,
//               the website keeps the previous valid EN.
//   test        deterministic, for automated tests and the R28 end-to-end run only. Output is marked "[EN-TEST]".
//               Refused unless the runtime explicitly allows it (allowTest).
//   workers-ai  Cloudflare Workers AI binding (server-side, no key in code). R28d: fail closed unless the owner-set cost
//               gate I18N_COST_GATE === "verified" and a budget guard (lib/chat/budget.js, D1, flow "i18n") are present;
//               items are sent in chunks of <= CHUNK_CHARS characters, each chunk reserves its worst-case Neurons first.
//               Default model @cf/google/gemma-4-26b-a4b-it (Workers Free eligible, checked 2026-11-21).
//   anthropic   Claude API over HTTPS with a server-side secret. NOT activated: paid API, needs owner approval.
//
// Network providers: per-request timeout, at most 2 retries with backoff on 429/5xx/timeouts, a character cap.
import { GLOSSARY, TRANSLATION_RULES } from "./glossary.mjs";
import { worstCaseNeurons, NEURON_RATES } from "../../lib/chat/budget.js";

export const DEFAULT_I18N_MODEL = "@cf/google/gemma-4-26b-a4b-it";
export const CHUNK_CHARS = 2500;
// Split strings into consecutive groups of at most CHUNK_CHARS characters (a longer single string is its own group).
export function chunkItems(items, max = CHUNK_CHARS) {
  const groups = []; let cur = [], n = 0;
  for (const s of items) { if (cur.length && n + s.length > max) { groups.push(cur); cur = []; n = 0; } cur.push(s); n += s.length; }
  if (cur.length) groups.push(cur);
  return groups;
}

export class TranslationError extends Error {
  constructor(message, { retryable = false, code = "ERROR" } = {}) { super(message); this.retryable = retryable; this.code = code; }
}

const prompt = (items) => [
  ...TRANSLATION_RULES,
  "Glossary (Vietnamese => English): " + GLOSSARY.map((g) => `${g.vi} => ${g.en}`).join("; "),
  "Return ONLY a JSON array of " + items.length + " English strings.",
  "Input JSON array:",
  JSON.stringify(items),
].join("\n");

function parseArray(text, n) {
  const m = String(text || "").match(/\[[\s\S]*\]/);
  let a;
  try { a = JSON.parse(m ? m[0] : text); } catch { throw new TranslationError("bản dịch trả về sai định dạng", { code: "FORMAT" }); }
  if (!Array.isArray(a) || a.length !== n || a.some((x) => typeof x !== "string")) throw new TranslationError("bản dịch trả về sai số đoạn", { code: "FORMAT" });
  return a;
}

async function withRetry(fn, { retries = 2, baseMs = 800, sleep = (ms) => new Promise((r) => setTimeout(r, ms)) } = {}) {
  let last;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try { return await fn(attempt); } catch (e) {
      last = e;
      if (!(e instanceof TranslationError) || !e.retryable || attempt === retries) break;
      await sleep(baseMs * 2 ** attempt);
    }
  }
  throw last;
}

async function fetchJson(fetchImpl, url, init, timeoutMs) {
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), timeoutMs);
  try {
    const r = await fetchImpl(url, { ...init, signal: ctl.signal });
    if (r.status === 429 || r.status >= 500) throw new TranslationError("dịch vụ dịch tạm thời không phản hồi (" + r.status + ")", { retryable: true, code: "HTTP" });
    if (!r.ok) throw new TranslationError("dịch vụ dịch từ chối yêu cầu (" + r.status + ")", { code: "HTTP" });
    return await r.json();
  } catch (e) {
    if (e?.name === "AbortError") throw new TranslationError("dịch vụ dịch quá thời gian chờ", { retryable: true, code: "TIMEOUT" });
    throw e;
  } finally { clearTimeout(timer); }
}

export function createProvider(name = "none", opts = {}) {
  const { allowTest = false, env = {}, fetchImpl = globalThis.fetch, timeoutMs = 25000, sleep, budget = null } = opts;
  if (name === "none" || !name) return { name: "none", async translate() { throw new TranslationError("Chưa kích hoạt dịch vụ dịch tự động (chờ Owner chọn và duyệt chi phí)", { code: "NOT_CONFIGURED" }); } };
  if (name === "test") {
    if (!allowTest) throw new TranslationError("provider \"test\" chỉ dùng cho kiểm thử", { code: "NOT_ALLOWED" });
    const words = [...GLOSSARY].sort((a, b) => b.vi.length - a.vi.length);
    return {
      name: "test",
      calls: 0,
      async translate(items) {
        this.calls++;
        if (opts.failNext) { opts.failNext--; throw new TranslationError("lỗi giả lập của dịch vụ dịch", { retryable: false, code: "SIMULATED" }); }
        return items.map((s) => { let o = s; for (const g of words) o = o.replace(new RegExp(g.vi, "gi"), g.en); return "[EN-TEST] " + o; });
      },
    };
  }
  if (name === "workers-ai") {
    if (!env.AI) throw new TranslationError("thiếu binding Workers AI", { code: "NOT_CONFIGURED" });
    if (String(env.I18N_COST_GATE || "").trim() !== "verified") throw new TranslationError("chưa xác nhận cổng chi phí $0 (I18N_COST_GATE)", { code: "NOT_CONFIGURED" });
    if (!budget || typeof budget.reserve !== "function") throw new TranslationError("thiếu bộ giới hạn chi phí hằng ngày (BIOA_AI_BUDGET_DB)", { code: "NOT_CONFIGURED" });
    const model = env.I18N_MODEL || DEFAULT_I18N_MODEL;
    if (!NEURON_RATES[model]) throw new TranslationError("model chưa có trong bảng chi phí: " + model, { code: "NOT_CONFIGURED" });
    return {
      name: "workers-ai:" + model,
      async translate(items) {
        const out = [];
        for (const group of chunkItems(items)) {
          const p = prompt(group);
          const maxOut = Math.min(4096, Math.ceil(group.reduce((n, s) => n + s.length, 0) / 2) * 2 + 64 * group.length);
          if (!await budget.reserve(worstCaseNeurons(model, p, maxOut))) throw new TranslationError("đã đạt giới hạn chi phí dịch trong ngày; bản EN cũ được giữ nguyên", { code: "QUOTA" });
          const part = await withRetry(async () => {
            const res = await Promise.race([
              env.AI.run(model, { messages: [{ role: "user", content: p }], max_tokens: maxOut, temperature: 0 }),
              new Promise((_, rej) => setTimeout(() => rej(new TranslationError("dịch vụ dịch quá thời gian chờ", { retryable: true, code: "TIMEOUT" })), timeoutMs)),
            ]);
            return parseArray(typeof res?.response === "string" ? res.response : res?.choices?.[0]?.message?.content, group.length);
          }, { sleep, retries: 0 });
          out.push(...part);
        }
        return out;
      },
    };
  }
  if (name === "anthropic") {
    if (!env.ANTHROPIC_API_KEY) throw new TranslationError("thiếu secret ANTHROPIC_API_KEY", { code: "NOT_CONFIGURED" });
    const model = env.I18N_MODEL || "claude-haiku-5-5";
    return {
      name: "anthropic:" + model,
      async translate(items) {
        return withRetry(async () => {
          const j = await fetchJson(fetchImpl, "https://api.anthropic.com/v1/messages", {
            method: "POST",
            headers: { "x-api-key": env.ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01", "content-type": "application/json" },
            body: JSON.stringify({ model, max_tokens: 8192, temperature: 0, messages: [{ role: "user", content: prompt(items) }] }),
          }, timeoutMs);
          return parseArray((j.content || []).map((c) => c.text || "").join(""), items.length);
        }, { sleep });
      },
    };
  }
  throw new TranslationError("provider không hỗ trợ: " + name, { code: "NOT_CONFIGURED" });
}
