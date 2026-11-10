# BIO-A business identity (2026-11-10)

Canonical source: `bioa-business.mjs` (`BUSINESS`). The following read it:
- Header and Footer (`bioa-transform.mjs` `company`, Home shell);
- Contacts page and its Organization JSON-LD;
- Blog TOC Zalo CTA and share links;
- the chat handoff channels (`lib/chat/gateway.js`).

Gate: `tests/business-identity.mjs` runs inside `npm run test:candidate`. It requires only the canonical e-mail, `tel:`, Zalo, JSON-LD phone/tax ID on all 136 built pages, no Merywood mailbox (also checked behind Cloudflare e-mail obfuscation), no Merywood `meta`/`link` identity and no Merywood share URL.

## Confirmed (already in owner-approved BIO-A surfaces)
| Field | Value |
|---|---|
| Domain | https://bioagroup.vn |
| Trade name | Nhà Máy Sản Xuất Dược Mỹ Phẩm Bio-A Group / Bio-A Group Pharmaceutical & Cosmetic Manufacturing Factory |
| E-mail | contact@bioagroup.vn |
| Hotline / Zalo | 0779 399 379 (+84 779 399 379) |
| Tax ID (MST) | 0318126597 |
| Factory address | 496/63/10H Dương Quảng Hàm, An Nhơn, Hồ Chí Minh, Việt Nam |
| Hours | Thứ 2 – Thứ 7 · 08:30 – 17:30 |
| Social | Facebook nhamaysanxuatduocmypham.BioA, Telegram t.me/bioagroup, WhatsApp/Zalo 84779399379 |

## Merywood identity removed in BIOA-R15 (a valid BIO-A replacement existed)
- careers@merywood.com (Careers, also obfuscated) and info@Merywood.ee (Privacy/Cookie, obfuscated) → contact@bioagroup.vn.
- Blog detail Facebook and e-mail share of a Merywood article → the post's own bioagroup.vn URL.
- `og:url` on all 104 pages, legal `meta url` → BIO-A canonical.
- WordPress oEmbed/REST/shortlink links, Merywood apple-touch-icon / Windows tile, Cosmetics Merywood `og:image` → removed.

## OWNER DECISIONS (not in any approved source — not invented)
| # | Needed | Blocks |
|---|---|---|
| BI-1 | Registered legal entity name (VI/EN) and registered office, if it differs from the factory address | Privacy, Cookie, Terms (LEGAL-1) |
| BI-2 | Privacy contact / data-request mailbox (default proposal: contact@bioagroup.vn) | LEGAL-1 |
| BI-3 | Actual cookie and third-party inventory with legal basis (Google Fonts, cdnjs intl-tel-input, geojs IP lookup, Turnstile, Google Maps) | Cookie policy |
| BI-4 | BIO-A app icon PNG 180×180 (apple-touch-icon) and a default share image (og:image) | SEO polish; currently omitted |
| BI-5 | Shipping Policy: content, or remove the Footer link | D11 |
| BI-6 | Careers: real openings, or hide/remove the page and its links | CAREERS-1 |
