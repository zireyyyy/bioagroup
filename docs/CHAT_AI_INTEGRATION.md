# BIO-A Chat — AI integration readiness (2026-11-10; R28d update 2026-11-21)

> **R28d (2026-11-21) supersedes the rows below where they differ.**
>
> **UI.** The owner-approved CHAT-C4B/C7 form is back (R28b's `tel:` link was an owner FAIL).
> - Without the build flag `BIOA_CHAT_UI_API=1`, the reply stays local and honest. It always says the message was not sent and shows one hand-off link: Zalo on VI pages, Telegram on EN pages.
> - With the flag, the form posts contract v1 to `/api/chat` and shows `reply` as text. Any error shows the honest reply instead.
>
> **Gateway.**
> - `handoff_channels` gains `telegram`.
> - New status `503 quota_exhausted`.
> - New mode `faq`.
>
> **Adapters.**
> - `faq`: deterministic, $0, no model.
> - `workers-ai`: env `AI` binding, plus `BIOA_AI_COST_GATE=verified`, plus D1 `BIOA_AI_BUDGET_DB` (atomic daily Neuron budget, chat ≤ 3,000), plus `BIOA_CHAT_MODEL` (default `@cf/google/gemma-4-26b-a4b-it`). If any is missing: `503 misconfigured`.
>
> **Answer sources.** Sensitive topics (price, MOQ, lead time, contract, certification, medical, contact) and prompt-injection probes never reach the model. Model answers use only `lib/chat/knowledge.js` facts and are validated server-side.
>
> **Status.** Everything is OFF. Live activation is BLOCKED on the owner's plan check, legal notice and Cloudflare bindings.
>
> **Docs and tests.**
> - Docs: `docs/r28d/COST_AND_SECURITY.md`, `docs/r28d/CHAT_FAQ_REVIEW.md`.
> - Tests: `tests/r28d-chat-ai.test.mjs` (in `npm run test:chat`) and `tests/r28d-chat-restore.mjs` (browser).

| Item | Status |
|---|---|
| CHAT UI (bubble, teaser, panel, channels, composer) | Unchanged, OWNER PASS design. **Still a local mock**: a sent message gets a fixed preview reply after 320 ms in the browser; nothing is sent to a server. Since BIOA-R21 the reply says honestly that the chat is not connected and the message was not sent, and points to Zalo/hotline (it previously claimed «đã ghi nhận nhu cầu / has noted your request»). |
| CHAT API GATEWAY `/api/chat` | **READY, flag OFF.** `functions/api/chat.js` → `lib/chat/gateway.js` + `lib/chat/adapters.js`. Tests `tests/chat-gateway.test.mjs` (8/8, no network). |
| TRAINED BOT CONNECTION | **NOT CONNECTED.** No provider chosen, no credentials, no request to any AI service. |
| UI ↔ gateway wiring | **Not done on purpose** (future patch, below). Wiring changes the OWNER PASS chat script and needs its own Desktop/Tablet/Mobile QA. |

## Contract v1
`POST /api/chat`, same origin only (`Origin` must equal the site origin), `Content-Type: application/json`, body ≤ 4 KB:
```json
{ "session_id": "16–64 chars [A-Za-z0-9_-]", "locale": "vi" | "en", "message": "1–1000 chars", "website": "" }
```
`website` is a honeypot and must stay empty.

Success `200`:
```json
{ "ok": true, "mode": "demo" | "live", "reply": "…", "handoff": false,
  "handoff_channels": { "zalo": "…", "phone": "tel:…", "email": "mailto:…" },
  "session_id": "…", "lead_created": false }
```
Errors carry `{ "ok": false, "status": <code>, "handoff_channels": {…}, "lead_created": false }`:

| HTTP | status | Meaning |
|---|---|---|
| 503 | `disabled` | Feature flag OFF (default) or no provider |
| 503 | `misconfigured` | Provider chosen but endpoint/key missing or not https |
| 403 | `forbidden_origin` | Cross-origin or missing Origin |
| 405 / 415 / 413 | `method_not_allowed` / `unsupported_media_type` / `payload_too_large`, `message_too_long` | Request shape |
| 400 | `invalid_json`, `invalid_body`, `invalid_session`, `invalid_locale`, `invalid_message`, `empty_message`, `rejected` (honeypot) | Validation / spam |
| 429 | `rate_limited` | 10/min per IP hash, 6/min per session (in-memory, per isolate); plus the optional `BIOA_CHAT_RATE_LIMITER` binding |
| 504 | `timeout` | Provider slower than `BIOA_CHAT_TIMEOUT_MS` (default 8000, max 15000) |
| 502 | `provider_error` | Provider failed or returned an invalid body |

Guarantees: the gateway never creates a lead or says one was received (`lead_created` is always `false`). It never stores message text and never logs it; errors log only a code. It does not touch `/api/lead`, D1, Google Sheets or Resend. Preview hosts keep `/api` private (`functions/_middleware.js`). Production stays behind maintenance mode until the owner opens it.

## Adapters (provider-independent)
- `disabled`: the default.
- `mock`: DEMO only. Fixed replies prefixed `[DEMO]`, `mode: "demo"`. For QA only, never for public traffic.
- `http`: a generic JSON endpoint run by the owner's chosen bot or knowledge-base service, or by a vendor proxy.
  - Request: `{session_id, locale, message}` with `Authorization: Bearer <BIOA_CHAT_API_KEY>`.
  - Expected response: `{reply, handoff?}`.
  - A vendor SDK (OpenAI/Claude/Gemini/…) would be one more adapter file. The gateway does not change.

## What the owner must provide to turn on AI LIVE
1. **Provider**: which bot or knowledge-base service, and who hosts the endpoint.
2. **Credentials** as Cloudflare Pages *secrets*: `BIOA_CHAT_ENDPOINT` (https) and `BIOA_CHAT_API_KEY`. They are never committed to Git.
3. **Privacy and retention decision**:
   - Are conversations stored, where, for how long, and who can read them?
   - The Privacy/Cookie policy must cover this. That depends on LEGAL-1.
4. **Rate limiting**: optionally a Cloudflare Rate Limiting binding `BIOA_CHAT_RATE_LIMITER`.
5. **Hand-off rule**: when the bot should send the visitor to Zalo or the hotline. The current channels come from `bioa-business.mjs`.
6. **Approval to wire the UI** (future patch FUT-CHAT-1):
   - The chat script posts to `/api/chat` only when the page carries an explicit enable flag.
   - It keeps the current preview reply as the fallback for `disabled` or errors.
   - It shows a real answer only when the server returned `ok: true`.
   - It shows a DEMO badge when `mode` is `demo`.
   - Full chat QA on Desktop/Tablet/Mobile × VI/EN.
7. Set `BIOA_CHAT_ENABLED=true` and `BIOA_CHAT_PROVIDER=http` in the Preview environment first; owner QA follows; Production last.
