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
