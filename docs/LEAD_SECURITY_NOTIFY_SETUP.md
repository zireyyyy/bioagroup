# BIO-A GROUP — LEAD SECURITY & RESEND EMAIL ACTIVATION

**Checkpoint 2026-10-09 — RESEND-ACTIVATION1 OWNER LIVE PASS / FROZEN (NO CODE REWRITE).**

### Owner-confirmed PASS/FROZEN
- Website bioagroup.vn maintenance + exact Bio-A logo + owner preview session 14 days: owner confirmed PASS at commit `0c0f3b8f55b6675701a79f01fb979e85759a71ed`.
- D1 durable leads; Google Sheets CRM H/I/K dropdown/colors; short `bioa_` IDs; form native Merywood DOM/Consent VI/EN, success close; Cloudflare production custom-domain HTTPS confirmed earlier. Do not reopen these.
- `TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY` are owner-configured, and `/api/lead/config` previously returned `enabled:true,misconfigured:false`. **Still PENDING** real server-side rejection of missing/invalid challenge tokens; do not call anti-spam fully verified.

### Owner LIVE acceptance — 2026-10-09
- **PASS**: Cloudflare D1 test returned `sheet_status = sent` and `email_status = sent`.
- **PASS**: Email notification actually arrived at `contact@bioagroup.vn` and also reached the owner's configured personal-mail forwarding recipient.
- **PASS**: Resend DNS and Production configuration successfully supported real email delivery; maintenance/private-preview stays enabled.
- **LOCKED**: form, backend, D1, Sheets and Resend code/config should not be changed without a concrete defect. A newly observed future failure warrants status/log inspection, not speculative refactoring.
- **NEXT PENDING**: runtime negative Turnstile verification; configured keys and endpoint alone do not demonstrate enforced anti-spam.

### Resend source owner and exact behavior
- `functions/api/lead.js > sendEmail()` uses `POST https://api.resend.com/emails` after durable D1 insert, concurrently with Google Sheets append. It generates VI internal notification: name, contact, interest, source page, UTC time, ID. `escapeHtml` is used for safe HTML output.
- `email_status = not_configured | sent | failed` in D1. `sent` means Resend API accepted the request (HTTP 2xx), **not proof of inbox delivery**. Verify actual inbox and Resend event dashboard separately.
- Existing retry protection: duplicate `submission_id` returns early and does not send another message. There is **no automated delivery retry** if Resend fails. This milestone activates and tests existing integration; adding retries is a separate future patch, not in scope.
- The D1/Sheets/CRM and form remain unchanged. Public anonymous forms stay locked by MAINTENANCE-PRIVATE1 until owner expressly authorizes PUBLIC. Authenticate with owner preview cookie for one test.

### Step 1 — DNS for outgoing sender (Cloudflare DNS authority)
1. In Resend Dashboard → Domains → `notify.bioagroup.vn` (owner previously added this sending subdomain), enable **Sending** only; leave Receiving disabled.
2. Copy Resend's actual current **DKIM**, **SPF**, and any optional **DMARC** verification records exactly (type, name, target/value). Do **not** infer complete values from truncated screenshots. Current dashboard may display TXT/CNAME/MX depending on selected sending configuration.
3. In Cloudflare → bioagroup.vn → DNS → Records add the prescribed records under the **sending subdomain**, exactly as Resend specifies. For a CNAME associated with mail verification, set **DNS only** (grey cloud); TXT/MX are DNS-only by nature.
4. Preserve the corporate mailbox service **iNET/OneMail**: NEVER delete/change existing root-domain MX `mx.inet.vn`, `mx1.onemail.vn`, `mx2.onemail.vn`, `mx3.onemail.vn`, SPF root, DKIM or `mail` A record. If Resend supplies a dedicated bounce MX, its hostname should be the sending/bounce subdomain, NOT root `@`. No receiving migration.
5. Return to Resend → Domains and click **Verify / I've added the records**; wait until **Sending verified**. Verification must succeed before production email activation.

### Step 2 — Resend API Key and Cloudflare Pages Production vars
1. Resend → API Keys → Create API Key, name e.g. `Bio-A Website Leads`; use **Sending access** and restrict it to `notify.bioagroup.vn` when available. Do not use an overprivileged full-access key if sending-only is sufficient.
2. Cloudflare → Workers & Pages → project `bioagroup` → Settings → Production → Variables and secrets:
   - Secret: `RESEND_API_KEY` = new private Resend sending key (`re_...`), never share or commit.
   - Text: `LEAD_FROM` = `Bio-A Group <leads@notify.bioagroup.vn>` (sending identity on verified subdomain; no separate mailbox required).
   - Text: `LEAD_NOTIFY_TO` = `contact@bioagroup.vn` (only if the existing iNET/OneMail inbox can actually receive email; otherwise use a verified working internal test recipient temporarily).
3. Save all three values. Confirm D1 binding `BIOA_LEADS_DB` and existing Google Sheets/Turnstile/maintenance variables are **untouched**. Do not set `BIOA_SITE_MODE=public`.
4. Redeploy **latest main** to apply Production variables.

### Step 3 — Acceptance test (1 lead only)
1. While maintenance is active, owner first logs into `https://bioagroup.vn/_bioa-access?key=...` using **PRIVATE rotated Secret locally**; do not put it in chat or screenshots.
2. Submit ONE clearly labelled synthetic lead via the existing consultation popup. After successful response, the popup should close as before.
3. Cloudflare D1 Console:
```sql
SELECT id, created_at, sheet_status, email_status
FROM bioa_leads ORDER BY created_at DESC LIMIT 5;
```
4. Expect latest test row `sheet_status='sent'` and `email_status='sent'`; Google Sheets should contain exactly the same short lead ID. If email_status is `failed`, inspect Resend Logs for errors and Cloudflare Pages Functions logs (avoid exposing PII). If `not_configured`, check all three Production values and redeploy.
5. Finally check `contact@bioagroup.vn` Inbox/Spam and Resend Emails/Logs for delivery state. Do not equate `sent` database status with delivered email.
6. Check Desktop / Tablet / Mobile existing form is unchanged (no visual code touched), and VI/EN templates unaffected.

### Rollback / guardrails
- **Zero application-code changes** for RESEND-ACTIVATION1. If configuration or sender validation fails, do not touch frozen form/API; revert/remove **only Resend vars** to return email_status to `not_configured` for later leads while D1/Sheets continue. Review failures before changing server code.
- Previous owner-approved site & maintenance release: `0c0f3b8f55b6675701a79f01fb979e85759a71ed`. Never revert to a no-maintenance-gate commit; Cloudflare Pages Runtime must remain Fail closed.
- Never send API keys/private owner login URLs by chat. Full public launch still awaits explicit owner approval.

### Supersession note
The setup steps above document the historical activation process and are **already completed** as of the owner-confirmed PASS date. Do not treat them as new instructions to recreate keys, DNS records, or resend leads. Do not expose company/personal mailbox configuration secrets. No code modifications to Resend were made during PASS promotion.

## LEAD-TURNSTILE-NEGATIVE-LIVE1 — Safe private production rejection QA (PENDING OWNER EXECUTION)

**Goal:** prove that production Pages Function refuses a syntactically valid lead with a missing or deliberately invalid Turnstile token, and makes NO writes/notifications. This is a test procedure, NOT authorization to disable Turnstile or reopen frozen code.

**Prerequisites:**
- Use `https://bioagroup.vn` in your already-authorized 14-day preview browser session. Never paste `_bioa-access?key=...` or preview secret into logs, chat, or source control.
- Open browser DevTools Console on that domain, and run the following only in your own session. It checks `/api/lead/config` first; **stops if Turnstile is not fully enabled**, avoiding an accidental accepted synthetic lead. Existing frontend form must remain untouched.
- A production API that returns anything other than 403 needs investigation before a second attempt. Do NOT run the snippet repeatedly.

```js
(async () => {
  const configResponse = await fetch('/api/lead/config', {
    credentials: 'same-origin', cache: 'no-store'
  });
  if (!configResponse.ok) {
    console.warn('STOP: config HTTP', configResponse.status); return;
  }
  const cfg = await configResponse.json();
  if (cfg.enabled !== true || cfg.misconfigured === true) {
    console.warn('STOP: Turnstile not configured/enabled'); return;
  }
  const raw = crypto.getRandomValues(new Uint8Array(9));
  const suffix = btoa(String.fromCharCode(...raw))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
  const id = 'bioa_' + suffix;
  const response = await fetch('/api/lead', {
    method: 'POST', credentials: 'same-origin',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      submission_id: id, name: 'BIOA Negative Security QA',
      contact: 'QA-INVALID-TOKEN', interest: 'Security QA, reject only',
      consent: true, locale: 'vi', page_path: '/contacts/',
      website: '', turnstile_token: 'intentional-invalid-test-token'
    })
  });
  const result = await response.json().catch(() => ({}));
  console.log({test_id: id, status: response.status, result});
  if (response.status !== 403 || result.error !== 'turnstile_failed') {
    console.warn('NOT PASS: stop, inspect backend/config; do not retry.');
  }
})();
```

**Acceptance:** one valid-shaped synthetic request => HTTP **403** and `{ok:false,error:"turnstile_failed"}`. Check D1 Console for the printed `test_id`: `SELECT id FROM bioa_leads WHERE id='bioa_...';` must return 0 rows. No corresponding Google Sheets row or Resend email should exist. This rejects the token before D1 INSERT. A 503 maintenance error means the private session was not active or API was blocked; it does NOT prove Turnstile works. HTTP 429 means prior rate-limit activity masks the test; do not retry until controlled window.
**Scope:** no new credentials, no real lead contact details, no global middleware/rate limit changes. Desktop/Tablet/Mobile form visuals protected, no UI patch. After PASS update START_HERE, NEW_CHAT_CONTINUATION_PROMPT and FULL_HANDOFF, then begin full Tablet phase.
