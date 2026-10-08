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

## Custom domain deployment (after lead E2E + responsive QA)

- The site builds to `dist` via `npm run build` and Pages Functions live at repository root `functions/api/lead.js`. No separate WordPress/PHP hosting is needed to receive new leads.
- In **Workers & Pages → bioagroup → Custom domains → Set up a domain**, add `bioagroup.vn`. Apex requires its Cloudflare DNS zone/nameservers in the same Cloudflare account. Pages normally provisions DNS/HTTPS automatically once verified.
- Consider `www.bioagroup.vn` as well and set a single canonical/redirect. Keep `bioagroup.pages.dev` working for internal preview or redirect its publicly accessible production URL later.
- If the domain previously served WordPress/another site, switching DNS will replace its public website. Export/back up anything you need first; do not delete MX/TXT/SPF/DKIM/DMARC mail records. Check other DNS subdomains and Resend DNS records before moving nameservers.
- Audit canonical, Open Graph, robots.txt, sitemap.xml, favicon and hardcoded absolute URLs for `bioagroup.vn`. The code already refers to `https://bioagroup.vn` in some places; ensure the final domain actually serves those paths.
- Pages binding `BIOA_LEADS_DB` and secret variables are configured per Cloudflare Production/Preview environment, **not per hostname**. Test `POST /api/lead` on the final custom domain only after DNS/SSL is active. Do not assume a successful static page load proves form delivery.
- Full tablet + mobile + desktop regression and at least one fake test lead verified independently in D1/Sheets/inbox remain mandatory before announcing domain launch.


## LEAD-ID-SHORT1 — Short, stable lead identifier (2026-10-08)

Owner confirmed Cloudflare D1 saved a live test lead and Google Sheets now received a new lead in the `Leads` worksheet: **D1 PASS / Google Sheets PASS**.

Small owner-requested patch: change *only* how new lead IDs are generated/validated. The browser now uses 9 cryptographically random bytes (72 bits), Base64URL-encodes them to 12 safe characters, and prefixes `bioa_`. New ID example format: `bioa_A1b2C3d4E5f6`. API also accepts the original UUID format to support old cached deployments and preserve existing records. D1 `id TEXT PRIMARY KEY` is the uniqueness guard; a random ID is not encryption of personal data.

Previously stored UUIDs must remain unchanged (both D1 and Sheets); do not backfill or modify any existing row IDs. No D1 SQL migration; all 11 sheet-column positions and delivery code remain identical.

Google Sheets columns H (`Trạng thái`), I (`Nhân viên`) and K (`CSKH`) will be assigned owner-built dropdowns later; do not add or alter dropdown rules or fields here. Resend delivery remains not configured.

Status: PENDING CLOUDFLARE BUILD / OWNER NEW-LEAD TEST. Protected: full popup and Consent source layout, VI/EN messages, D1/Sheets dispatch, Header/Menu/Cookie/Chat, all page content.
