# BIO-A GROUP WEBSITE — FULL HANDOFF

Updated: 2026-10-04
Repository: https://github.com/zireyyyy/bioagroup

## 1. SOURCE-OF-TRUTH RULE — LOCKED

**Merywood source supplied by the owner is the visual/runtime reference.**

Future work MUST follow this rule:

- Preserve Merywood's original DOM/layout/positioning/hover/animation/responsive mechanics wherever they already work.
- Apply only the exact requested Bio-A changes: content, language, brand colors, Bio-A logos/watermarks, contact channels, and explicitly approved UX changes.
- Do **not** redraw, restructure, or invent replacement layout/interaction code when the source already provides the required behavior.
- Do **not** change a PASS component while fixing another component unless the change is technically unavoidable and explicitly called out.
- Desktop and mobile are separate regression surfaces. Every patch must verify both.
- If a source rule conflicts with a new requirement, first preserve source structure and override the smallest possible property.
- Prefer source selector/DOM parity over broad CSS patches or guessed selectors.
- Never replace a source component wholesale simply to solve one visual defect.
- At each PASS checkpoint, treat the approved behavior as locked regression baseline.

This rule was explicitly requested by the project owner after the We Produce regression cycle and is mandatory for all later patches.

## 2. CURRENT PRODUCTION / VISUAL BASELINE

Current locked checkpoint before Patch C:
- Main commit: `3c88798b52222aa2e6c4baa1ab4a8b827c169279`
- We Produce desktop: PASS
- We Produce mobile: PASS
- Desktop footer email/background: PASS
- Header desktop spacing/transparency/logo: PASS
- Mobile header/menu latest accepted visual state remains protected
- Hero/stats previous approved state remains protected

## 3. BRAND / CONTACT AUTHORITY

- Domain: bioagroup.vn
- Email: contact@bioagroup.vn
- Phone: 0779 399 379
- WhatsApp: +84 779 399 379
- Telegram: https://t.me/bioagroup
- Facebook: https://www.facebook.com/nhamaysanxuatduocmypham.BioA
- Zalo: +84 779 399 379

Header nav:
- Về BIOA Group
- Gia Công Mỹ Phẩm
- Dịch Vụ Khác
- Kiến Thức
- Liên Hệ

## 4. BRANDING RULE

Only replace **Merywood brand traces**:
- logo
- watermark/background logo
- brand accent colors
- Merywood-specific contact identity

Do not replace ordinary product imagery, neutral icons, layout decorations, or source UI artwork unless explicitly requested.

Bio-A logo must remain uncropped and keep its original proportions. Use the light logo on dark backgrounds.

## 5. PATCH DISCIPLINE

Every patch should:
1. Start from the last PASS checkpoint.
2. Compare against the supplied Merywood source before changing layout/interaction behavior.
3. Make the smallest scoped change.
4. Keep desktop/mobile parity.
5. Avoid touching already-PASS components.
6. Push one focused commit that is easy to roll back.
7. Record the new PASS checkpoint here after user runtime confirmation.

## 6. NEXT PHASE

Patch C — Chat/contact widget.

Owner requirement:
- Follow the Merywood chat shell/structure closely.
- Preserve the Merywood interaction feel rather than designing a new chat UI.
- Replace Merywood identity/avatar/content with BIO-A information.
- Prefer Zalo as the primary social/chat handoff; Facebook, Email, Telegram and WhatsApp remain contact channels.
- Chat response mechanism may be replaced later, but the shell should remain source-parity.
- Do not reconnect or reuse Merywood's Dashly account/credentials.
