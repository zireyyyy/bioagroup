# BIO-A GROUP — START HERE

Status: **CURRENT PROJECT STATE**
Updated: 2026-10-08

## Current runtime state

Production-confirmed baseline before current candidate:
`47aee83936e3d32a0145d915d365ed283946b378` — CONSULT-POPUP-COLOR1.

Current candidate:
**LEAD-FORM-SHORT1 — Short Consultation Lead Form**
— **PENDING OWNER TEST**

Visible consultation fields:
- Họ tên / Full name — required;
- Số điện thoại / Zalo / Telegram — required;
- Loại sản phẩm / dịch vụ — optional;
- compact privacy consent.

Removed from visible UI:
- Email;
- expected quantity;
- Request textarea.

Product/service choices combine six Bio-A manufacturing categories with R&D, filling/packing, containers, packaging design, documentation/product notification and Bio-A advice.

Lead capture now requires Name + Contact + Consent instead of the old 5-field/email gate.

Send button is restored to source-like light-grey surface with green text and protected from global .btn styling.

## PASS / FROZEN

Mobile Header/Menu, Header directional behavior, Cookie, Chat, paused bottom bar, Blog PATCH-G8, Contacts CONTACT-C1 and accepted Home sections.

## Next test

Desktop + Mobile:
1. exactly 3 visible field blocks;
2. Name required;
3. Phone/Zalo/Telegram required;
4. optional Product/Service choices correct;
5. compact Consent;
6. source-like Send button;
7. successful lead capture after Name + Contact + Consent;
8. no Email / Quantity / Request visible.


## LEAD-FORM-SHORT1-HF1 — Cheerio Build Hotfix (2026-10-08)

- Deployment of `9e30c7c6b27fe567132ff026a999a5cdacb84ace` FAILED at `npm run build`.
- Root cause: `cheerio@1.0.0` does not provide `.detach()` in `simplifyConsultationModal()`, causing a TypeError while generating pages.
- Hotfix: use `.clone()` to retain the Consent checkbox node when replacing the text; no change to markup structure, field requirements, capture conditions, or Send button presentation.
- Status: **PENDING CLOUDFLARE BUILD / OWNER TEST** until a new Cloudflare build succeeds and short-form behavior is checked.
- Previous failed commit is **NOT A ROLLBACK TARGET**. Keep all approved Mobile Header/Menu, Cookie, Chat, Blog and Contact components locked.
