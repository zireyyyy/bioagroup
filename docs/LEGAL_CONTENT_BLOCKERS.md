# BIO-A — LEGAL / CONTENT RELEASE BLOCKERS — 2026-11-08

Nothing below has been edited: no legal entity, registration number, address or legal term may be invented. Extract: `D:\BIOA_WORKSPACE\_reports\recovery\final-legal-extract.txt`.

## LEGAL-1 — Privacy Policy (`/privacy-policy/`, `/en/privacy-policy/`) and Cookie Policy (`/cookie-policy/`, `/en/cookie-policy/`)
The whole text is Merywood's Estonian/EU policy with the brand name replaced. **The VI pages show the same English text.**

| Clause | Content now (abridged) | Problem |
|---|---|---|
| Privacy 2.1, Cookie 1.1 | "Bio-A Group **OÜ**, **Reg no. 16386898**, legal address: **Narva mnt 7-557 Kesklinna linnaosa, Tallinn Harju maakond 10117, Estonia**" | Merywood's Estonian company data presented as BIO-A |
| Privacy 2.2 | Processing "in accordance with: Public Information Act, Personal Data Protection Act, Electronic Communications Act… Data Protection Ordinance" (Estonian acts) + GDPR | Legal basis of another jurisdiction |
| Privacy 3.1, Cookie 2.1 | "partners… not located in **Estonia or EEA**" | Estonian framing |
| Privacy 6.2 | Withdrawal in writing to the Estonian address above "or email: **info@Merywood.ee**" (Cloudflare-encoded; visible as plain text on the live site) | Merywood contact; data requests would go to Merywood |
| Privacy 10.6 | Supervisory authority: "**Estonian Data Protection Inspectorate** (Andmekaitse Inspektsioon), info@aki.ee" | Wrong authority for a Vietnamese company |
| Privacy 7.1, 9.4.6, 10.3, Cookie 6.1, 8.x, 9.x | GDPR/"Acts" procedures | Need review against BIO-A's actual applicable law |

**Needed from owner:** the BIO-A legal entity name, registration/tax number, registered address, the data-request contact, the applicable law/authority, and approved VI + EN policy text (ideally reviewed by counsel).
**Proposal:** block release until the approved text is supplied. When supplied, the change is content-only inside the existing page structure (no layout change), with a static test that the strings `OÜ`, `16386898`, `Narva`, `Estonia`, `Merywood` never appear (including Cloudflare-encoded emails).

## CAREERS-1 — `/careers/`, `/en/careers/`
Visible at all widths: "We are a **European manufacturer of dietary supplements** and personal care cosmetics…", roles "B2B Sales Manager" and "Regulatory Affairs Specialist (EU)" (Full-time · Remote) linking to 404 pages, heading "Careers" in English on the VI page. Footer "Tuyển Dụng R&D / NV Sales" (BIOA-R1) currently lead to this page.

Options (owner chooses):
1. **Provide BIO-A recruitment content** (roles, location, contact) → content-only update in the existing Careers layout.
2. **Hide until ready:** remove `/careers/` from `sitemap.xml`, add `noindex`, and point the two recruitment legacy slugs to `/contacts/` instead of `/careers/` (one-line change in `bioa-legacy-redirects.mjs`). The page itself stays reachable only by direct URL.
3. Remove the route entirely (also removes the job-card 404s) — a removal, therefore explicit owner decision.
**No recruitment information will be published without owner approval.**

## Smaller content items (not release-blocking)
- Footer "Chính Sách Vận Chuyển / Shipping Policy" → 404 on every page (D11): create the page, change the link, or remove the item.
- Formats toggle labels "+11 more / Show fewer" are English on the VI Home/Cosmetics pages (behaviour correct; the href is a dead Merywood URL seen only by crawlers).
- Quote modal VI label "Loại sản phẩm / dịch vụ (không bắt buộc)" truncated at ≤390 and 769 (same as the approved Preview).
