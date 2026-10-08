# Bio-A lead Turnstile and Resend activation

**OWNER PASS/FROZEN:** popup auto-close, compact IDs, D1, Google Sheets, CRM dropdowns/colors, VI/EN, Consent and Merywood layout.

## Turnstile
The new code is inactive while neither `TURNSTILE_SITE_KEY` nor `TURNSTILE_SECRET_KEY` is set. A partial key setup fails closed. With both keys configured, client requests an invisible Turnstile token and backend checks Cloudflare Siteverify success, action `bioa_lead`, and matching hostname **before D1 insert**.

1. Cloudflare → Turnstile → Add widget, configure Invisible widget and hostnames `bioagroup.pages.dev`, `bioagroup.vn`, `www.bioagroup.vn` as needed.
2. Cloudflare Pages project `bioagroup` → Settings → Production → Variables and secrets: `TURNSTILE_SITE_KEY` as Text and `TURNSTILE_SECRET_KEY` as Secret. Add together; redeploy. Never reveal or commit the secret.
3. Check `GET /api/lead/config` is enabled. Submit one fake test lead; verify D1 and Sheets. Posting without a token should return 403 with no new D1 record. Test Desktop, Tablet, Mobile and VI/EN.
4. Obtain approval for privacy disclosure about Cloudflare Turnstile before activating. This patch does not change legal terms.

## Resend
Email code already exists in `functions/api/lead.js`; no new email logic required.
1. In Resend, Add domain `notify.bioagroup.vn` (sending subdomain recommended to protect corporate inbox records). Copy exact DNS verification records into Cloudflare DNS and verify Resend domain. Preserve existing root MX/SPF/DKIM/DMARC and website records.
2. Create a sending API key. On Cloudflare Pages Production, set `RESEND_API_KEY` as Secret, `LEAD_FROM` as Text (for example `Bio-A Group <leads@notify.bioagroup.vn>` once verified), and `LEAD_NOTIFY_TO` as Text (approved internal mailbox).
3. Redeploy and submit one fake test lead. In D1 query `SELECT id,sheet_status,email_status FROM bioa_leads ORDER BY created_at DESC LIMIT 5;`. Expect `sheet_status=sent`, `email_status=sent`, and real delivery to the inbox. No automatic retry currently exists on email failure.

Current status: code candidate only. Turnstile and Resend **PENDING KEYS / RUNTIME TEST**.
Rollback source: `88a3a651b4d186460d6b020ff79f69f235e5db0e`.
