# BIO-A Group — Lead capture backend setup

**Candidate: LEAD-BACKEND1 / PENDING CONFIGURATION + LIVE SUBMISSION TEST.**
The source code is ready, but GitHub access alone cannot create your Cloudflare D1 database or Google/Resend credentials.
Never put secrets or service-account JSON into GitHub, JS bundles or screenshots.

## Data flow
`#get-a-quote` (VI + EN, all devices) → `POST /api/lead` (same-origin Cloudflare Pages Function) → D1 `BIOA_LEADS_DB` (authoritative). After D1 save, best-effort append to Google Sheets and send email via Resend. If secondary services fail, the saved lead stays in D1 with the failed/pending status. The visitor is only told success after D1 persisted.

## Cloudflare D1
1. In Cloudflare, create a D1 database named `bioa-leads`.
2. Apply the SQL in `migrations/0001_bioa_leads.sql` to that database via D1 Console (or Wrangler D1 execute). Do this **before** enabling live submissions.
3. Open **Workers & Pages → bioagroup (Pages) → Settings → Bindings → Add → D1 database**. Set **Variable name** exactly `BIOA_LEADS_DB`, select your database. Configure Production; use a separate Preview database/binding for testing if preview builds are public. Redeploy after binding.
4. Under Pages → Settings → Variables and Secrets, add secret `LEAD_RATE_SECRET` (random strong string, >=32 characters). The endpoint returns 503 until both D1 and this secret exist. **Never commit these values.**

## Google Sheets
1. Create a **private Google spreadsheet** and a worksheet named exactly `Leads`.
2. Row 1 headers in order: `Mã lead | UTC | Họ tên | Số liên hệ | Sản phẩm/Dịch vụ | Trang nguồn | Ngôn ngữ | Trạng thái | Nhân viên | Ghi chú | CSKH`.
3. Create a **Google Cloud service account**, enable **Google Sheets API**, and share only that spreadsheet with the service account's `client_email` as Editor.
4. In Cloudflare Pages secrets, add `GOOGLE_SERVICE_ACCOUNT_JSON` (complete private service account JSON). Add `GOOGLE_SHEET_ID` as an environment variable (ID from sheet URL). Do not publish the JSON.
5. This backend uses Google OAuth service account JWT and the Sheets `values.append` API; no Apps Script or public webhook.

## New-lead email
1. Create a Resend account and verify the sending domain/subdomain. Configure DNS per Resend before going live.
2. Add secret `RESEND_API_KEY`, variables `LEAD_FROM` (verified from address, e.g. `Bio-A Group <leads@bioagroup.vn>`) and `LEAD_NOTIFY_TO` (your approved internal recipient, or up to 5 comma-separated emails).
3. Do not assume `contact@bioagroup.vn` is the desired internal notification mailbox without confirming it.

## Safety / QA
- Client does not contain API credentials. Same-origin only; JSON validation; consent mandatory; honeypot; rate limit (5/IP/hour, HMAC hash); idempotent submission ID; no direct public lead listing.
- D1 is the primary authority; never infer Sheets/email completion from a form success alone.
- The endpoint returns 503 if D1 binding/migration/secret is missing. Configure first, then test with fake details.
- Production and Preview bindings/secrets are separate; keep Preview test leads isolated.
- Google/email providers can fail after a D1 write: check `sheet_status` and `email_status` in D1. Current patch records failures for manual reconciliation; it does not implement a scheduled retry worker.
- Restrict Google Sheet sharing and access to D1. Update public Privacy Policy for chosen processors, retention and user rights before collecting live PII; owner must approve legal copy.
- Test VI/EN, Desktop/Tablet/Mobile; checkbox required; server failure messages; double submit; D1 record; Sheet row; email notification. **Owner PASS only after end-to-end test.**

## Operational status query (restricted to D1 console only)
```sql
SELECT id,created_at,name,contact,interest,sheet_status,email_status
FROM bioa_leads ORDER BY created_at DESC LIMIT 20;
```
