# R28d-D0 — VI/EN parity & content-truth audit (one row per issue)

**Scope and method:** read-only.
- Text was extracted from the served CMS Preview `6889ec9`, Sanity snapshot `97d6dcb9621d54a1`.
- VI and EN pages were paired by DOM position. All pairs had identical item counts; the only path difference was the active VI/EN switch.
- Scripts and raw data: `evidence/r28d-d0/` (`pages/pairs.json`, `flags.tsv`, `blog-flags.json`).

**Source legend:**
- **SLOT** = CMS text slot (`cms/registry.json`).
  - The published Sanity value is **identical** to the repo value for all 393 slots.
  - Changing it means: repo change + regenerate registry + Sanity slot sync. That is a **published Sanity write and needs separate Owner approval**.
- **CODE** = repo only (`bioa-*.mjs`).
- **BLOG** = Sanity `blogPost`.
- **LEGAL** = OWNER PASS policy.

**Status values:**
- `OWNER FACT CHECK` = needs proof (see `OWNER_FACTORY_FACT_CHECK.md` §B).
- `OWNER CONTENT APPROVAL PENDING` = safe copy fix awaiting the Owner's yes (§C).
- `OWNER DECISION` = optional (§E).
- Nothing in this table has been changed on the website yet.

**Severity:**
- **H** = misleading claim, or the Owner-flagged parity break;
- **M** = visible mismatch or mistranslation;
- **L** = style, accessibility, or a design decision.

## 1. Issue table

| ID | Route | Field / section | Source (edit target) | Current VI | Current EN | Category | Owner proof | VI recommendation | EN recommendation | Sev | Owner action | Status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| D-01 | `/` ↔ `/en/` | Hero description | SLOT `t_6b1244ef` (`bioa-transform.mjs` / home refine) | "Bio-A Group đồng hành cùng thương hiệu từ R&D công thức, lựa chọn nguyên liệu, sản xuất OEM/ODM đến bao bì và hoàn thiện sản phẩm theo định hướng riêng." | "From formula R&D and OEM/ODM manufacturing to packaging and finished products." | VI/EN semantic mismatch (EN abridged: no ingredient selection, no brand direction) | — | keep | §2 D-01 | M | C1 yes | OWNER CONTENT APPROVAL PENDING |
| D-02 | `/` ↔ `/en/` | Why Choose, 4 card bodies (desktop grid + mobile slider) | SLOT `t_425311a5` `t_2ad9edb5` `t_d7eb5acc` `t_fdaf9a70` (`bioa-transform.mjs` `resetHomeEN` `why`) | 4 full paragraphs (~330 chars each) | 4 one-line summaries (55–65 chars), e.g. "Consulting around product goals, customers and brand positioning." | VI/EN semantic mismatch (EN abridged); EN card 3 adds "notifications" not in VI | — | keep | §2 D-02 | **H** (Owner screenshot) | C1 yes | OWNER CONTENT APPROVAL PENDING |
| D-03 | `/` ↔ `/en/` | We Produce: desktop `block-we-produce` + mobile `bioa-produce-mobile-clean` | CODE `bioa-transform.mjs` `localizeWeProduceSourceText`; CODE `bioa-home-refine.mjs` ~4365–4390 (mobile copy); SLOT `t_ccd5a801` `t_9193309c` (mobile titles) | Desktop H2 "Danh Mục Sản Xuất", cards "Dược mỹ phẩm"/"Mỹ phẩm". Mobile H2 "Danh Mục Gia Công", cards "Gia Công Dược Mỹ Phẩm"/"Bao Bì & Hoàn Thiện". Same 2 bodies on both; mobile card 2 title ≠ its body | Desktop "Formula R&D, sampling and OEM/ODM manufacturing for your brand." / "From formula and ingredients to packaging and finished products."; mobile "Formula R&D and OEM/ODM production for your brand direction." / "Bottles, filling, packing and finished-product preparation." | VI internal inconsistency (desktop ≠ mobile, title ≠ body) + EN abridged + EN differs per surface | — | Desktop heading and card titles on both surfaces | §2 D-03 | **H** (Owner screenshot) | C2 + C1 yes | OWNER CONTENT APPROVAL PENDING |
| D-04 | `/` ↔ `/en/` | How We Work, 5 step bodies (slider) | SLOT `t_6be5e218` `t_d6108fdc` `t_73672340` `t_503d0ab5` `t_c0d136fc` (`resetHomeEN` `steps`) | 5 full paragraphs | 5 one-liners, e.g. "Align product goals, budget and timeline." | VI/EN semantic mismatch (EN abridged) | — | keep | §2 D-04 | **H** (Owner screenshot) | C1 yes | OWNER CONTENT APPROVAL PENDING |
| D-05 | `/` ↔ `/en/` | Built For (`block-right-choice`), 3 × 3 bullets | SLOT `t_4778889c` … `t_b788a037` (`bioa-transform.mjs` `setRightChoiceCopy`) | "Thương Hiệu Mới" holds distributor-type bullets ("Mở rộng danh mục…", "Bổ sung sản phẩm thương hiệu riêng…"); "Đơn Vị Phân Phối" holds new-brand bullets ("Bắt đầu thương hiệu với lộ trình…") | New brands: roadmap / budget / sampling; Cosmetic businesses: range / OEM-ODM / R&D-documentation; Distributors: own brand / formats / scale SKUs | **VI factual-logic error (bullet lists swapped)** + EN semantic mismatch | — | Swap VI lists 1 ↔ 3 | §2 D-05 | **H** | C3 yes | OWNER CONTENT APPROVAL PENDING |
| D-06 | `/` ↔ `/en/` | Product lines intro paragraph | SLOT `t_1e56a053` | "Kết cấu, nguyên liệu, màu sắc, mùi hương, hoạt chất và quy cách bao bì có thể điều chỉnh… nhiều phiên bản công thức hoặc dung tích cho từng kênh bán." | "Texture, ingredients, color, fragrance and format can be customized for your brand." | EN abridged (no actives, versions, channels) | — | keep | §2 D-06 | M | C1 yes | OWNER CONTENT APPROVAL PENDING |
| D-07 | `/` ↔ `/en/` (mobile) | We Produce card 1 title + image alt | SLOT `t_ccd5a801`; CODE home refine (alt) | "Gia Công Dược Mỹ Phẩm" | "Cosmetic manufacturing" | Mistranslation (cosmeceutical → cosmetic) | — | see D-03 | "Cosmeceuticals" (title), "Cosmeceutical manufacturing" (alt) | M | C4 yes | OWNER CONTENT APPROVAL PENDING |
| D-08 | `/about/`, `/contract-manufacturing-cosmetics/` | Hair-care card body | SLOT (about, cosmetics) | "Dầu gội, dầu xả, tinh chất và các giải pháp chăm sóc tóc…" | "Shampoo, conditioner, treatments and hair-care solutions…" | Mistranslation with medical connotation | — | keep | "Shampoo, conditioner, hair serums and hair-care solutions…" | M | C4 yes | OWNER CONTENT APPROVAL PENDING |
| D-09 | `/contract-manufacturing-cosmetics/` | QC "Kiểm Soát Trong Sản Xuất" body | SLOT | "…theo dõi trong quá trình sản xuất để hạn chế sai lệch so với mẫu đã duyệt." | "Product parameters and sensory characteristics are monitored during manufacturing." | EN abridged | — | keep | "…monitored during manufacturing to limit deviation from the approved sample." | L | C4 yes | OWNER CONTENT APPROVAL PENDING |
| D-10 | `/contract-manufacturing-cosmetics/` (intro desktop + mobile, GMP card), `/about/` (value "An Toàn & Tuân Thủ") | GMP claim | SLOT (cosmetics intro, cert card, about value) | Intro: "…tại Việt Nam, **đạt chuẩn GMP Bộ Y Tế**; …". Card: "Bio-A Group đạt chuẩn GMP Bộ Y Tế…". About: "…**nội dung nguồn Bio-A ghi nhận** năng lực GMP và HACCP." | Intro: no GMP. Card: "operates to GMP requirements **recorded in the legacy Bio-A source**…". About: "**the legacy Bio-A source records** GMP and HACCP capabilities." | Unverified factory/certification claim; VI/EN mismatch; developer wording visible to visitors | Certificate: exact name, issuer, number, date, validity, scope | §2 D-10 (2 options) | §2 D-10 | **H** | B1 answer | OWNER FACT CHECK |
| D-11 | `/contract-manufacturing-cosmetics/`, `/about/` | HACCP card | SLOT | "HACCP — Hệ thống quản lý an toàn thực phẩm…" | "A food-safety management system…" | Unverified claim; food-safety standard on a cosmetics page | HACCP certificate + scope; does BIO-A run a food line? | Remove card, or keep with exact certified scope | same | **H** | B2 answer | OWNER FACT CHECK |
| D-12 | `/`, `/en/`, `/about/`, `/en/about/` | Hero stats | SLOT (stats) / CODE `setHomeStats` | 2.000+ Mẫu R&D · 5+ Năm kinh nghiệm · 10.000.000 Sản phẩm / năm · 1.000 m² Quy mô nhà máy | 2,000+ · 5+ · 10,000,000 · 1,000 m² (labels match) | Unverified factory figures (previously approved; **kept**) | Confirmation per figure; meaning of "5+ năm" (company vs team) and "10.000.000" (capacity vs output) | Optional label precision: "Năm kinh nghiệm đội ngũ", "Công suất / năm" | "Years of team experience", "Annual capacity" | **H** | B3 answer | OWNER FACT CHECK |
| D-13 | Menus on every page, `/about/`, `/contract-manufacturing-cosmetics/` (+ SEO description), chatbot | "Mẹ & Bé" category | CODE (menus, `bioa-legacy-redirects.mjs` / about / cosmetics refine), SLOT (cards), CODE `lib/chat/knowledge.js` | "Sản Phẩm Mẹ & Bé" | "Mother & Baby Products" | Unsupported product category until confirmed (VI = EN) | Confirmation that BIO-A manufactures mother-and-baby products | Keep if confirmed; otherwise remove (separate patch) | same | M | B4 answer | OWNER FACT CHECK (chatbot: fact **withheld from the model** until confirmed) |
| D-14 | `/contract-manufacturing-cosmetics/` | Testing scope (heavy metals, microbiology, stability) | SLOT | "Kiểm Nghiệm Chất Lượng Sản Phẩm… Kiểm Tra Kim Loại Nặng… Vi Sinh" | "Product Quality Testing… Heavy-Metal Testing… Microbiological Testing" | Unverified capability (in-house lab vs external) | In-house or external accredited lab | If external: "Phối hợp kiểm nghiệm…" | "Testing coordinated with accredited laboratories as required" | M | B5 answer | OWNER FACT CHECK |
| D-15 | `/dich-vu-khac/` (+ SEO description) | "Đăng Ký Thương Hiệu & Công Bố" service | SLOT, SEO | "Đăng Ký Thương Hiệu & Công Bố" | "Trademark & Product Notification Support" | VI states the service; EN says "support" (scope mismatch) | Files trademarks itself, or advises only | If support only: "Hỗ Trợ Đăng Ký Nhãn Hiệu & Công Bố" | keep | M | B6 answer | OWNER FACT CHECK (chatbot: withheld from model) |
| D-16 | `/en/` H1 + SEO title, `/en/contacts/` H1 + SEO title, `/en/privacy-policy/` §1.1 (LEGAL), `bioa-business.mjs` `tradeNameEn` | Official EN trade name | SLOT, SEO, CODE, LEGAL | "Nhà Máy Sản Xuất Dược Mỹ Phẩm Bio-A Group" | 3 variants: "Cosmetic & Cosmeceutical Manufacturing Factory" / "Pharmaceutical & Cosmetic Manufacturing" / "Cosmetic Manufacturing Factory" | Inconsistent official identity; "Pharmaceutical" may imply a drug licence | Owner choice of one official EN name | keep | Recommended "Bio-A Group Cosmetic & Cosmeceutical Manufacturing Factory" | **H** | B7 answer (Legal change approved separately) | OWNER FACT CHECK |
| D-17 | `/about/` | Vision | SLOT | "…trở thành nhà sản xuất dược mỹ phẩm OEM/ODM hàng đầu khu vực Đông Nam Á…" | "…to become a leading … manufacturer in Southeast Asia…" | Aspirational absolute ("leading"); consistent VI/EN | — | keep or "uy tín trong khu vực" | keep or "trusted … in the region" | L | E5 | OWNER DECISION |
| D-18 | `/about/`, `/contract-manufacturing-cosmetics/`, `/dich-vu-khac/` | Hero CTA "Nhận Tư Vấn" | CODE / SLOT | "Nhận Tư Vấn" | "Get a Quote" (hero), "Get Started" (About CTA) | Terminology drift (Header CTA "Get a quote" is canonical PASS) | — | keep | Pick one ("Get a quote" or "Get advice") outside the locked Header | L | E1 | OWNER DECISION |
| D-19 | `/`, `/dich-vu-khac/` | How-works CTA text | CODE / SLOT | "Liên hệ Zalo 0779 399 379 để được tư vấn…" | "Contact Bio-A Group on Zalo for formula, MOQ and production timeline consultation." | EN channel vs EN → Telegram policy | — | keep | Optional "…on Telegram or Zalo…" | L | E2 | OWNER DECISION |
| D-20 | All VI pages | Accessibility labels in English ("Open main menu", "Prev/Next slide", "Toggle content", "Product formats we produce", "Cookie consent banner", "Consent preferences", "Cookie icon") | CODE (Header / Cookie / Swiper: locked components) | — | — | Language leak (screen-reader only, not visible) | — | VI labels in a separate accessibility patch | — | L | E4 | OWNER DECISION |
| D-21 | `/<vi path>/` 404 | 404 page | CODE `bioa-404.mjs` (Merywood English by design, visual PASS) | "Ooops! / We can't find the page…" | same | Language leak on VI routes (by design) | — | Optional VI 404 | — | L | E3 | OWNER DECISION |
| D-22 | `/`, `/contract-manufacturing-cosmetics/` | Packaging formats (tube, airless, jar, sachet, doypack, bottle) and product forms (lip, foundation, powder, mascara, eyeliner, blush, pad, spray, balm) | SLOT | listed | listed (consistent) | Unverified capability (carry-over of R27 item 10) | Formats BIO-A cannot make | remove unsupported | same | M | B8 answer | OWNER FACT CHECK |
| D-23 | `/` | Roadmap step 1 / 5 lines | SLOT | "…ngân sách và tiến độ mong muốn để xây dựng lộ trình…" / "…giúp khách hàng chủ động thời điểm ra mắt…" | adds "defines the formula, quantity and milestones"; "keep launch timing predictable… with confidence" | Slight EN drift (adds scope, stronger tone) | — | keep | "…to build a suitable roadmap for R&D and production from the start." / "…so the brand can plan its launch timing and distribution." | L | C1 yes | OWNER CONTENT APPROVAL PENDING |

| D-24 | `/en/dich-vu-khac/` | Hero H1 + intro markup | CODE (`bioa-services-refine.mjs` EN output) | `<h1>…</h1>`, `<div>…</div>` | `<h1><p>…</p></h1>`, `<div><p>…</p></div>` (a `<p>` inside `<h1>` is invalid HTML) | Markup divergence VI vs EN (copy identical in meaning; visual Owner PASS) | — | — | Remove the inner `<p>` in a separate markup patch after checking the visual on Desktop / Tablet / Mobile | L | none (developer) | NOTED, not changed |

**Checked with no issue:**
- `/dich-vu-khac/` body (except D-15, D-19).
- `/contacts/` (all text, FAQ VI/EN).
- `/tuyen-dung/` + 3 detail pages (only date format differences).
- `/blog/` index (6 pages).
- 38 Blog articles: 995 paired fields. 0 missing EN, 0 language leak, 0 abridged. 6 "number" flags are digits written as words. 46 medical-term hits, all cautionary disclaimers.
- Header / Footer / chat shell: the address and the avatar name are proper nouns.
- Legal: not reviewed for rewrite (OWNER PASS); only identity variant D-16 is noted.

## 2. Proposed copy (VI first, EN from that VI)

**Glossary used:**

| VI | EN |
|---|---|
| dược mỹ phẩm | cosmeceutical(s) |
| mỹ phẩm | cosmetic(s) |
| gia công | manufacturing / contract manufacturing |
| sang chiết | filling |
| công bố sản phẩm | product notification |
| hồ sơ | documentation |
| mẫu thử | sample |
| cảm quan | sensory profile |
| theo dự án | per project / subject to project confirmation |

No guarantees, figures or certification words are added.

**Layout note:**
- The proposed EN is about as long as the VI that already renders in the same boxes on Desktop, Tablet and Mobile.
- Registry `maxEn` limits are recomputed when the registry is regenerated.
- After the Owner's yes, each section is checked at 390 / 834 / 1024 / 1440 before Preview.
- If a box overflows, the copy is shortened. No CSS change is planned.

**D-01 Hero description (EN):**
"From formula R&D and ingredient selection to OEM/ODM manufacturing, packaging and finished products tailored to your brand direction."

**D-02 Why Choose (VI unchanged; EN):**
1. *Tailored solutions*: "Bio-A Group builds each solution around your product goals, target customers and brand positioning. From the first idea, formula, ingredients and packaging to the production plan, our team coordinates every stage so your project has a clear roadmap, can be adjusted flexibly and is easy to extend with new products."
2. *R&D & formulation*: "Our R&D team supports formula development, ingredient selection, sampling and sensory adjustments to each project's requirements. You can choose a suitable formula base and fine-tune ingredients, texture, fragrance, colour and intended benefits before the sample is approved and moves on to packaging and production."
3. *Documentation support*: "Bio-A Group helps prepare product information, label content and the documentation required for each product category. This runs in parallel with R&D and packaging to cut waiting time between steps, limit repeated revisions and get the project ready before it enters the production plan."
4. *Quality control*: "From sample to finished product, criteria for ingredients, sensory profile, texture, fragrance, packing specifications and stability are monitored at each stage. The aim is consistent quality, minimal deviation between the approved sample and the actual production batch, and a product that matches the brand direction."

**D-03 We Produce (VI: one version for Desktop and Mobile).**

Heading **"Danh Mục Sản Xuất"** / EN **"We Produce"**.

Card 1: **"Dược Mỹ Phẩm"** / **"Cosmeceuticals"**.
- VI body unchanged.
- EN: "Bio-A Group provides R&D and OEM/ODM manufacturing for cosmeceutical lines built around your brand direction. A project can start from a base formula or a custom formula, with ingredients, samples, packaging and production planning coordinated into one consistent finished product."

Card 2: **"Mỹ Phẩm"** / **"Cosmetics"**.
- VI body unchanged.
- EN: "Cosmetic lines are developed around usage needs, customer segments and brand positioning. Bio-A Group supports you from formula, texture and fragrance to container selection, filling, packing and finishing before delivery."

Mobile images keep their alt text in line with the titles: "Dược mỹ phẩm" / "Cosmeceuticals", "Mỹ phẩm" / "Cosmetics".

**D-04 How We Work (VI unchanged; EN):**
1. "We start by clarifying your idea, product category, target customers, budget and desired timeline. Bio-A Group then builds a suitable roadmap with you, whether for a ready formula, a custom formula or a range expansion, with R&D, packaging and production milestones set from the start."
2. "The R&D team develops the formula, selects ingredients, prepares samples and refines them based on your feedback. Each round focuses on sensory profile, texture, fragrance, colour, intended benefits and stable manufacturability when moving from sample to the factory's actual production scale."
3. "Once the formula is stable, the project moves on to bottles, packing specifications, labels and brand identity elements. Bio-A Group helps make sure the packaging suits the product, is practical to fill and produce, and keeps a consistent image when the product reaches the market."
4. "Bio-A Group reviews product information, label content and the documentation needed for each product category. This runs in parallel with the final R&D and packaging steps to limit repeated revisions and keep the planned production schedule."
5. "Once everything is confirmed, the factory carries out production, filling, packing and finished-goods control according to plan. Delivery progress is tracked clearly so you can plan your launch, distribution, restocking and next SKUs."

**D-05 Built For (VI: swap lists 1 ↔ 3; EN from the corrected VI).**

**Thương Hiệu Mới / New brands:**
- "Bắt đầu thương hiệu với lộ trình sản phẩm rõ ràng và ngân sách được phân bổ theo từng giai đoạn" / "Launch your brand with a clear product roadmap and a budget planned stage by stage"
- "Tiếp cận quy trình R&D, bao bì và sản xuất mà không cần tự xây dựng toàn bộ hệ thống vận hành" / "Access R&D, packaging and production without building the whole operation yourself"
- "Giảm tải công việc triển khai bằng cách phối hợp các hạng mục phát triển sản phẩm với Bio-A Group" / "Lighten your workload by coordinating product development with Bio-A Group"

**Doanh Nghiệp Mỹ Phẩm / Cosmetic businesses** (VI unchanged):
- "Stand out with formulas, textures and formats suited to your target market"
- "Rely less on mainstream categories by adding new product lines and segments"
- "Coordinate R&D, packaging and production on one clear roadmap to make better use of rollout time"

**Đơn Vị Phân Phối / Distributors:**
- "Mở rộng danh mục sản phẩm theo từng phân khúc và nhu cầu của nhóm khách hàng mục tiêu" / "Expand your range by segment and by the needs of your target customers"
- "Bổ sung sản phẩm thương hiệu riêng với mức giá và quy cách phù hợp chiến lược phân phối" / "Add private-label products with pricing and formats that fit your distribution strategy"
- "Duy trì trải nghiệm đồng nhất để tăng mức độ tin cậy và khả năng mua lại của khách hàng" / "Keep a consistent experience that builds customer trust and repeat purchases"

**D-06 Product lines intro (EN):**
"Texture, ingredients, colour, fragrance, actives and packaging format can be adjusted to your brand direction. Some lines can be developed in several formula versions or sizes for different sales channels."

**D-10 GMP (depends on B1).**

*Option 1: certificate confirmed.* Use the exact name and issuer on the document, e.g. "[Tên giấy chứng nhận] do [cơ quan cấp] cấp".
- Cosmetics intro VI: "…tại Việt Nam, [được cấp {tên giấy chứng nhận}]; …".
- EN: "…in Vietnam, [holding {certificate name} issued by {issuer}], …".
- Card title: the certificate name.
- About value:
  - VI "Bio-A Group chú trọng quy trình sản xuất, hồ sơ và các tiêu chuẩn liên quan; nhà máy được cấp {tên giấy chứng nhận}."
  - EN "Bio-A Group focuses on manufacturing processes, documentation and relevant standards; the factory holds {certificate name}."

*Option 2: not confirmed.*
- Cosmetics intro VI: remove "đạt chuẩn GMP Bộ Y Tế;".
- Card **"Quy Trình Sản Xuất Có Kiểm Soát" / "Controlled Manufacturing Process"**:
  - VI "Bio-A Group kiểm soát quy trình sản xuất dược mỹ phẩm theo các yêu cầu chất lượng đã xác định cho từng dự án."
  - EN "Bio-A Group controls its cosmeceutical manufacturing process against the quality requirements defined for each project."
- About value:
  - VI "Bio-A Group chú trọng quy trình sản xuất, hồ sơ sản phẩm và các yêu cầu chất lượng liên quan."
  - EN "Bio-A Group focuses on manufacturing processes, product documentation and the relevant quality requirements."

*Both options remove the developer wording* "nội dung nguồn" / "legacy Bio-A source".

## 3. Counts per route family

| Route family | VI/EN pairs | Items compared | H | M | L | No-issue |
|---|---|---|---|---|---|---|
| Home | 1 | 505 | 5 (D-02, D-03, D-04, D-05, D-12) | 3 (D-01, D-06, D-07) | 2 (D-19, D-23) | Hero stats labels, packaging carousel, product lists (pending B8), Roadmap |
| About | 1 | 253 | 2 (D-10, D-12) | 2 (D-08, D-13) | 2 (D-17, D-18) | Story, Team, Activities, Process, CTA |
| Cosmetic Manufacturing | 1 | 474 | 2 (D-10, D-11) | 3 (D-08, D-13, D-14) | 1 (D-09) | Why Choose, Process, Collaboration paths, Roadmap |
| Other Services | 1 | 283 | 0 | 1 (D-15) | 1 (D-19) | everything else |
| Contacts | 1 | 188 | 1 (D-16) | 0 | 0 | info, FAQ |
| Careers (list + 3 details) | 4 | 770 | 0 | 0 | 0 | PASS |
| Blog index + 38 articles | 1 + 38 | 204 + 995 fields | 0 | 0 | 0 | PASS (Owner PASS kept) |
| Legal (Privacy, Cookie) | 2 | 375 | (D-16 identity only) | 0 | 0 | OWNER PASS, not reworded |
| 404 | 1 | 4 | 0 | 0 | 1 (D-21) | — |
| Shared shell (Header / Footer / Cookie / chat) | all | ~25 per page | 0 | 0 | 1 (D-20) | PASS |
