// R28 VI-FIRST — translation providers. Every provider takes an array of Vietnamese strings (names/links already
// replaced by ⟦n⟧ placeholders) and returns an array of English strings of the same length.
//
//   none        default. Translation not activated (owner decision pending): every run fails with a clear message,
//               the website keeps the previous valid EN.
//   test        deterministic, for automated tests and the R28 end-to-end run only. Output is marked "[EN-TEST]".
//               Refused unless the runtime explicitly allows it (allowTest).
//   workers-ai  Cloudflare Workers AI binding (server-side, no key in code). NOT activated: needs owner approval.
//   anthropic   Claude API over HTTPS with a server-side secret. NOT activated: paid API, needs owner approval.
//
// Network providers: per-request timeout, at most 2 retries with backoff on 429/5xx/timeouts, a character cap.
import { GLOSSARY, TRANSLATION_RULES } from "./glossary.mjs";

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
  const { allowTest = false, env = {}, fetchImpl = globalThis.fetch, timeoutMs = 25000, sleep } = opts;
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
    const model = env.I18N_MODEL || "@cf/meta/llama-3.1-8b-instruct";
    return {
      name: "workers-ai:" + model,
      async translate(items) {
        return withRetry(async () => {
          const res = await Promise.race([
            env.AI.run(model, { messages: [{ role: "user", content: prompt(items) }], max_tokens: 4096, temperature: 0 }),
            new Promise((_, rej) => setTimeout(() => rej(new TranslationError("dịch vụ dịch quá thời gian chờ", { retryable: true, code: "TIMEOUT" })), timeoutMs)),
          ]);
          return parseArray(res?.response, items.length);
        }, { sleep });
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
