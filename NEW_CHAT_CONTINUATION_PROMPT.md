# CURRENT STATE — 2026-10-08 — LEAD-BACKEND1

**Owner confirmed popup Consent PASS** at `61d2e8b04c2534ad7a178fdb1313fa918637a3ab`. Protected visual runtime/source Merywood.

**New candidate: LEAD-BACKEND1 — PENDING CLOUDFARE BUILD / D1 BINDING / GOOGLE & RESEND SECRET CONFIG / OWNER E2E TEST.**

- Text-only popup heading: VI `Nhận Tư Vấn Từ Bio-A Group`; EN `Consult Bio-A Group`.
- Form visuals/fields/checks/Consent/Send remain unchanged.
- Old Merywood lead capture disabled for this modal; new JS submit handler posts same-origin to `/api/lead`.
- Pages Function writes D1 first, then best-effort Google Sheets + Resend email notification.
- Code and SQL migration committed, but **resources, credentials, live storage and external delivery have not been provisioned**. Do not claim data currently being collected.
- Setup guide: `docs/LEAD_BACKEND_SETUP.md` (required).
- Relevant owners: `bioa-transform.mjs`, `assets/js/bioa-leads.js`, `functions/api/lead.js`, `migrations/0001_bioa_leads.sql`.
- PASS/FROZEN: Home, Blog, Contacts, Cookie, Chat, Mobile Header/Menu and disabled bottom bar.
- Next: confirm Cloudflare build; provision D1 & binding, run migration, add secrets, verify Google and Resend, run a synthetic test lead (VI/EN) and inspect all 3 destinations.
- Rollback if frontend regression: `61d2e8b` previous owner-confirmed state. Do not deploy new form to production domain before D1 configuration / successful E2E test.

---
## CURRENT STATE — 2026-10-08 — CONSULT-CONSENT-SOURCE1

Candidate: **CONSULT-CONSENT-SOURCE1 — PENDING CLOUDFLARE BUILD / OWNER TEST**.

Owner confirmed shared Mobile Menu + Trang Chủ/Home PASS, FROZEN. Popup consent visuals on 4d3e3da still FAIL on Mobile/Tablet/desktop.

Compared exact original markup in owner ZIP `merywood-export 210-3.zip` / `merywood/pages/index/index.html`: `label.label-check` directly contains source checkbox span, a plain text node with a trailing space, and inline Privacy Policy link. No new layout markup should be introduced.

Correction in `bioa-transform.mjs`:
- Delete the 3 Bio-A-only Consent layout selector overrides (absolute checkbox position and padded layout). Return visual authority to Merywood's original CSS.
- Restore the source trailing whitespace in VI localization before Privacy Policy anchor.

No new CSS or DOM, no change to legal wording, privacy URL, acceptance checkbox behavior, lead form fields, dropdown, capture or Send. All Header/Menu/Cookie/Chat/Blog/Contacts and PAUSED bottom-bar behavior protected.

Historical 4d3e3da did not PASS Consent; do not rollback to it as a visual PASS checkpoint. Next test: Cloudflare build, compare Mobile/Tablet/Desktop Consent with Merywood, then test lead submission/capture separately. **Do not mark PASS before owner verifies.**

---

## CURRENT CANDIDATE — 2026-10-08: CONSULT-CHOICES-MOBILE-HOME1

**PENDING CLOUDFLARE BUILD / OWNER TEST.**
Restores Merywood exclusive checkbox DOM and full original Consent/Privacy Policy agreement in the short consultation form. Bio-A product/service options remain optional and the longer dropdown scrolls internally (max 242px/38dvh). Form keeps required Name, Phone/Zalo/Telegram, consent and existing Send/capture path.

Adds one shared Mobile Menu item Trang Chủ (VI /) or Home (EN /en/) before the five existing entries; preserves source arrow style and all menu runtime. Does not reopen Cookie, Chat, Mobile Header, bottom bar (PAUSED), Blog, Contacts, or Home sections.

Parent 5e56e37 is a candidate after a Cheerio build hotfix, not owner-confirmed PASS. Next: Cloudflare build + Desktop/Tablet/Mobile UI/interaction + real lead submission check.

---
# NEW CHAT CONTINUATION PROMPT — BIO-A GROUP WEBSITE

Repository:
https://github.com/zireyyyy/bioagroup

Read START_HERE.md, CURRENT STATE SNAPSHOT in FULL_HANDOFF.md, AGENTS.md, docs/WORKFLOW.md, docs/SOURCE_MAP.md and exact owner code before editing.

Current candidate:
**LEAD-FORM-SHORT1 — PENDING OWNER TEST**

Popup visible fields:
- Full name — required
- Phone / Zalo / Telegram — required
- Product / service — optional
- compact privacy consent

Email / Quantity / Request are not visible.
Capture requires Name + Contact + Consent.
Product/service choices mirror real Bio-A manufacturing categories and services.
Send stays source-like light grey with green text.

Protected:
Mobile Header/Menu, Header scroll behavior, Cookie, Chat, paused bottom bar, Blog, Contacts, accepted Home.

After PASS:
remaining small fixes -> FULL Tablet -> cleanup -> production package -> domain deploy.


## LEAD-FORM-SHORT1-HF1 — Cheerio Build Hotfix (2026-10-08)

- Deployment of `9e30c7c6b27fe567132ff026a999a5cdacb84ace` FAILED at `npm run build`.
- Root cause: `cheerio@1.0.0` does not provide `.detach()` in `simplifyConsultationModal()`, causing a TypeError while generating pages.
- Hotfix: use `.clone()` to retain the Consent checkbox node when replacing the text; no change to markup structure, field requirements, capture conditions, or Send button presentation.
- Status: **PENDING CLOUDFLARE BUILD / OWNER TEST** until a new Cloudflare build succeeds and short-form behavior is checked.
- Previous failed commit is **NOT A ROLLBACK TARGET**. Keep all approved Mobile Header/Menu, Cookie, Chat, Blog and Contact components locked.
