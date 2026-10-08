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
