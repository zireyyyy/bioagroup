# BIO-A — Privacy / Cookie (LEGAL-B2) and Careers: OWNER approval pack — 2026-11-11

The full rendered text (VI + EN) for approval is generated from the built pages with
`node tools/export-approval-content.mjs <dist> <out.md>`; the review ZIP carries it as `CONTENT_FOR_OWNER_APPROVAL.md`.
Nothing here is legal advice. The texts are drafted from the official texts and the verified behaviour of the site;
a lawyer should review them before Production.

## 0. Update R24OY (owner 2026-11-12): shorter public text
The pages now carry only what a visitor in Vietnam needs: who we are, data collected, purposes and consent, sharing (categories of service providers, possible servers outside Vietnam, authorities), retention, rights + how to exercise them, security, contact; cookies in plain words. Removed from the public text: provider-by-provider list (Cloudflare D1/Turnstile/cdnjs, Google Fonts/Maps/Sheets, Resend, GeoJS), the external image host line, recruitment/children/chat clauses, browser-storage names. The detailed inventory below stays as the internal record for counsel (L-1…L-8 unchanged).

## 1. Legal sources read (official Công báo PDFs, 2026-11-11)
| Text | Source | Used for |
|---|---|---|
| Luật Bảo vệ dữ liệu cá nhân **91/2025/QH15** (26/06/2025, in force 01/01/2026) | Công báo số 971+972 ngày 24/7/2025 (congbaocdn.chinhphu.vn) | Đ.2 definitions (controller / processor / "bên kiểm soát và xử lý"), Đ.3 principles (retention "phù hợp với mục đích"), Đ.4 data-subject rights, Đ.9 consent (must know data type, purpose, controller, rights; silence ≠ consent), Đ.10 withdrawal in writing incl. electronic, Đ.14 deletion cases, Đ.17 transfers, Đ.19 no-consent cases, Đ.20 cross-border transfer, Đ.23 breach notification, Đ.25 recruitment data, Đ.37 controller duties, Đ.38 small-business exemptions |
| Nghị định **356/2025/NĐ-CP** (31/12/2025, in force 01/01/2026, replaces NĐ 13/2023) | Công báo số 18 ngày 18/01/2026 | Đ.3 basic data list (name, phone, contact address…), Đ.5 request time limits (reply 02 working days; carry out 10/15/20 days by request type), Đ.6 consent methods (website consent is valid; controller must store the consent; no pre-ticked consent), Đ.12 cloud, Đ.17 cross-border cases |

## 2. What the pages now say (LEGAL-B2) and why
- **Controller:** Bio-A Group with the verified trade name, tax code 0318126597, address, e-mail, hotline (`bioa-business.mjs`). Role stated as *bên kiểm soát và xử lý dữ liệu cá nhân* (Đ.2.9): Bio-A decides purposes/means and processes directly with service providers.
- **Data collected:** exactly the form fields sent by `assets/js/bioa-leads.js`, the consent time, the HMAC IP hash and the Turnstile check; contact-channel conversations; no sensitive data requested; chat is local-only.
- **Consent:** only by ticking the box and submitting (Đ.9.4.d; NĐ 356 Đ.6.3 no default consent). The D1 row stores `consent_at` (NĐ 356 Đ.6.2: controller keeps the consent).
- **Providers:** Cloudflare (hosting, D1 storage, Turnstile, cdnjs), Google (Fonts, Maps, Sheets), Resend, GeoJS, and "an external server" for some images/icons (merywood.com until the images are replaced — kept generic on purpose, see §3).
- **Cross-border:** disclosed (Đ.20) — these providers may store/process data outside Vietnam.
- **Retention:** criteria only (Đ.3.3, Đ.14.1): no number of months was invented.
- **Rights:** the six rights of Đ.4.1 verbatim in substance; request by e-mail/hotline; reply 02 working days and execution per NĐ 356 Đ.5.
- **Security:** HTTPS, restricted access, no raw IP, anti-bot check; no claim of absolute security; breach notification per Đ.23.
- **Recruitment:** no online application; e-mailed CVs used only for recruitment and deleted if not hired (Đ.25.1.c).
- **Cookie Policy:** real inventory from the code and a browser run on the built site (no HTTP cookie set by the site; localStorage after a cookie choice; three sessionStorage keys that never leave the browser; no analytics/ads loaded; third parties listed). The earlier `utm_*` line was wrong (no such keys) and is gone.

## 3. OWNER decisions needed before Production (not invented)
| # | Item | Why it matters | Where |
|---|---|---|---|
| L-1 | **Registered legal name** (and registered office if different from the factory address) | Đ.9.2.b: the data subject must know the controller | Privacy 1.1, 10.2 |
| L-2 | **Retention period** for enquiries (e.g. N months after the last contact) — or approve "criteria only" | Đ.3.3 / Đ.14.1.b | Privacy 6 |
| L-3 | **Providers actually enabled at go-live**: remove Google Sheets and/or Resend lines if they are not configured (OD-9) | the policy must match the real processing | Privacy 5.1–5.2 |
| L-4 | **Cross-border transfer impact assessment** (*hồ sơ đánh giá tác động chuyển dữ liệu cá nhân xuyên biên giới*): Đ.20.2 requires filing within 60 days of the first transfer; check the small/micro-business options of Đ.38.2–3 / NĐ 356 Đ.41 with counsel | legal obligation of the company, not a website change | company / counsel |
| L-5 | **Data-protection contact** (person or mailbox for requests) if not `contact@bioagroup.vn` | Đ.4.5, NĐ 356 Đ.5.1 (procedure must be known) | Privacy 7.2 |
| L-6 | Confirm the **organisational measures** stated in 8.1 ("giới hạn quyền truy cập dữ liệu") are in place for D1 / Sheets / mailbox | no statement may overclaim | Privacy 8.1 |
| L-7 | Name the external image host (merywood.com) or replace those images with BIO-A images (then delete the line) | transparency vs. brand | Privacy 5.1, Cookie 4.1 |
| L-8 | Counsel review of the whole text, VI as the authoritative version | — | both pages |

## 4. Careers (CAREERS-1) — OWNER decisions
The three roles (Nhân viên Kinh doanh B2B · Nhân viên R&D Mỹ phẩm · Nhân viên Sản xuất Mỹ phẩm) are **sample content, not confirmed openings**. Each has VI/EN title, intro, duties, requirements, and four owner-gated parts marked `data-owner-approval="required"` on the page:

| Field | Shown now (neutral, nothing invented) | Owner supplies |
|---|---|---|
| Card / header badge | "Chi tiết đang cập nhật" / "Details to be confirmed" | work type + location (e.g. Toàn thời gian · Hồ Chí Minh) |
| Quyền lợi / What we offer | will be published with the official announcement | salary range, insurance, allowances, benefits |
| Địa điểm & hình thức / Location & work type | will be confirmed when the role opens | address, schedule, hours |
| Cách ứng tuyển / How to apply | "chưa mở nhận hồ sơ trực tuyến" + Contacts CTA | application channel (e-mail/HR contact), deadline, documents; a CV form only after the data-handling decision |

Also for the owner: duties/requirements wording, whether the sample roles should be published at all, and BIO-A photos for the hero (still a temporary stock photo) and the B2B card.
