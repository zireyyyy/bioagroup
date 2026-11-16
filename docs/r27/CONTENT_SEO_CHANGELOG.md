# R27 — Content and SEO changelog

**Baseline:** R26 `main` `a9333f7` (build `QA_EVIDENCE\dist-final-r26`).

**Guidance followed:** Google Search Central:
- *Creating helpful, reliable, people-first content*: no scaled or templated content in the index, no keyword stuffing;
- *SEO Starter Guide*: unique titles and descriptions, one canonical, descriptive alts;
- *Structured data policies*: no ratings or reviews that are not real and on the page.

No ranking outcome is claimed.

## 1. Visible content (old → new)

| Route (VI · EN) | Element | Old | New | Why |
|---|---|---|---|---|
| `/` · `/en/` | Reviews block (desktop + mobile swiper, 12 cards) | invented client quotes, "Khách hàng Bio-A Group" / "Sample testimonial — to be updated" | removed; the sections before and after now touch (no gap added) | F03: no real testimonial |
| `/` · `/en/` | Packaging MOQ (4 product types × desktop/mobile) | "2500 sản phẩm / 5000 sản phẩm — Công thức có sẵn / độc quyền — số lượng tối thiểu từ" | "Theo dự án — Công thức có sẵn / độc quyền — số lượng tối thiểu (MOQ)"; EN "Per project … minimum order quantity (MOQ)" | Merywood figures, not BIO-A data |
| all | Chat panel | "Tôi có thể hỗ trợ về…" + message box with a fixed local reply | "Khung chat này chưa nhận tin nhắn trực tuyến…" + **Nhắn Zalo** / **Gọi 0779 399 379** | no simulated conversation |
| `/about/` · EN | 2 image alts | "Nhà máy và năng lực Bio-A Group", "Đội ngũ Bio-A Group" | "Ảnh minh họa sản xuất mỹ phẩm", "Ảnh minh họa làm việc nhóm" | temporary images |
| all | 6 decorative source-icon alts | "icon", "talk", "hands", "blank", "cert", "whiteboxes" | `alt=""` | decorative |
| `/contract-manufacturing-cosmetics/` · EN | scenario tags | "• Nội dung mẫu" / "• Sample scenario" | "• Tình huống minh họa" / "• Illustrative scenario" | honest label |
| `/dich-vu-khac/` · EN | solution tags | "Giải pháp mẫu" / "Sample solution" | "Gói dịch vụ gợi ý" / "Suggested service mix" | honest label |
| `/tuyen-dung/` · `/en/careers/` (+3 details) | eyebrow, subline, status pill, scroll link | "Vị trí công việc", "…sẽ được cập nhật khi vị trí được mở", "Chi tiết đang cập nhật", "Xem các vị trí" | "Nhóm công việc", "Hiện Bio-A Group chưa mở đợt tuyển dụng chính thức…", "**Chưa mở tuyển**", "Xem các nhóm công việc" (EN: Teams / Not currently hiring) | sample roles are not openings |
| `/blog/dia-chi-gia-cong-cac-loai-serum-dac-tri-dat-chuan/` | VI title, SEO title, H1, image alt, JSON-LD headline, share subject | "Gia Công Serum **Đặc Trị**: …" | "Gia Công Serum **Chuyên Biệt**: …" | "đặc trị" (treatment) is not a cosmetic claim; URL kept |

## 2. Head / SEO

| Route | Field | Old | New |
|---|---|---|---|
| `/contract-manufacturing-cosmetics/` | description (+ og/twitter) | Home's shared text "Bio-A Group cung cấp giải pháp R&D, gia công mỹ phẩm OEM/ODM…" | "Gia công mỹ phẩm trọn gói OEM/ODM tại Bio-A Group: R&D công thức, mẫu thử, sản xuất, bao bì và hồ sơ cho sản phẩm chăm sóc da, tóc, body, trang điểm và mẹ & bé." |
| `/en/contract-manufacturing-cosmetics/` | description | shared EN text | "Turnkey OEM/ODM cosmetic manufacturing at Bio-A Group: formula R&D, samples, production, packaging and documentation for skin, hair, body, makeup and baby care products." |
| `/dich-vu-khac/` | description | shared VI text | "Dịch vụ hỗ trợ thương hiệu mỹ phẩm của Bio-A Group: sản xuất gia công, chai lọ, sang chiết và đóng gói, thiết kế bao bì, đăng ký thương hiệu và hồ sơ công bố sản phẩm." |
| `/en/dich-vu-khac/` | description | shared EN text | "Bio-A Group services for cosmetic brands: contract manufacturing, containers, filling and packing, packaging design, and brand registration and product notification support." |
| `/blog/page/2/` · `/en/blog/page/2/` | description | same as `/blog/` | "… — Trang 2." / "… — Page 2." |
| 29 pending articles × VI/EN (58 URLs) | robots | `index, follow, …` | `noindex, follow` |
| `sitemap.xml` | URLs | 106 | 40: −58 pending articles, −8 retired index pages |

The same description and title changes were written to the Sanity `seoPage` / `blogPost` documents. Otherwise the CMS Preview would put the old text back.

**Unchanged and checked** (`tests/r26-seo-content-audit.mjs` + `tests/r27-content-audit.mjs`, 0 failures):
- canonical self on the apex `https://bioagroup.vn`;
- hreflang vi/en/x-default reciprocal (R26);
- og:locale;
- unique titles and descriptions on all 40 indexable pages;
- no broken internal links;
- no Merywood/Estonia/Cyrillic leaks;
- Production stays `noindex` behind maintenance until the owner's public launch.

**Not changed (source structure):** Cosmetics, Dịch Vụ Khác and the article pages carry two `<h1>` with the same text, one for desktop and one for mobile, from the Merywood source. Only one is displayed at a time (the other is `display:none`), and the texts are identical. The R27 audit fails if they ever differ.

## 3. Structured data

| Check | Result |
|---|---|
| `Review`, `AggregateRating`, `Rating`, `ratingValue` | **none** on any page (before and after) |
| Blog `BlogPosting` JSON-LD | headline follows the page title (serum title updated) |
| Organization / FAQ | no FAQ schema; no organization attributes beyond what the pages show |

## 4. Redirects and retired URLs

No URL was deleted.

| Old URL | Now | Type |
|---|---|---|
| `/blog/page/3/` … `/blog/page/6/` | → `/blog/` | redirect page (meta refresh + `location.replace`, noindex, canonical to the target, out of the sitemap). Same mechanism as the D11 legacy slugs |
| `/en/blog/page/3/` … `/en/blog/page/6/` | → `/en/blog/` | same |
| 29 pending articles (VI/EN) | still **200**, `noindex, follow` | not redirected: links from outside keep working; owner decides rewrite or 301 (OWNER_CONTENT_INPUTS #6) |
| `https://www.bioagroup.vn/*` | → `https://bioagroup.vn/*` | **HTTP 301** (path + query kept), F04 |

## 5. Needs owner approval before public launch

- Titles/descriptions above: they describe only what the pages already contain.
- Pending Blog decision (#6).
- MOQ (#3).
- Document proof (#4).
- Legal (#1).
