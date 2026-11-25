# R28d-D1 — Sanity dry run (published dataset `production`): APPROVAL PENDING

**Nothing has been written to Sanity.**
- The dry run read the 3 page documents and their drafts only.
- Tool: `node tools/cms-sync-slots.mjs --from bbf21b3`. It authenticates with the Owner's Sanity CLI login, and the token is never printed.

## 1. Documents and revisions (read 2026-11-23)

| Document | `_rev` (pinned as `ifRevisionID`) | Last published | Text slots now | Draft | Slots added | Orphans removed |
|---|---|---|---|---|---|---|
| `page-home` | `ehgitTyVwN7DzeQ1YVw1Ap` | 2026-11-21T03:42:31Z | 119 | none | +28 | −26 |
| `page-about` | `WIhnXGDtfVOQnknZsfaoqQ` | 2026-11-13T03:03:39Z | 64 | none | +1 | −1 |
| `page-cosmetics` | `WIhnXGDtfVOQnknZsfaoqQ` | 2026-11-19T04:38:42Z | 146 | none | +2 | −2 |

`page-services`, `page-contacts` and `page-careers`: **no change**.

**Dry-run output:**
```
page-home: +28 slot(s), -26 unedited orphan(s)
page-about: +1 slot(s), -1 unedited orphan(s)
page-cosmetics: +2 slot(s), -2 unedited orphan(s)
page-services: +0 slot(s), -0 unedited orphan(s)
page-contacts: +0 slot(s), -0 unedited orphan(s)
page-careers: +0 slot(s), -0 unedited orphan(s)
dry run: 0 conflict(s); add --apply to write
```

**What the write does**, one transaction per document, pinned to the `_rev` above:
- **set** each new slot `{ vi, en }`, where `vi` is the unchanged Vietnamese and `en` is the new English;
- **unset** each old slot whose published value is still exactly the old repository text.
  - All 29 qualify: **0 conflicts**, meaning no Owner edit is overwritten.
  - An edited one would be reported as CONFLICT and kept.

**Not touched:** the 38 Blog posts, Careers, SEO, legal pages, images, `page-services`, `page-contacts`, `page-careers`.

## 2. Field-by-field (slot ids are content hashes of page + VI + EN)

| Doc | Old slot (unset) | New slot (set) | VI (unchanged) | EN old (published today) | EN new |
|---|---|---|---|---|---|
| page-home | `t_6b1244ef` | `t_9f8286e1` | Bio-A Group đồng hành cùng thương hiệu từ R&D công thức, lựa chọn nguyên liệu, sản xuất OE… | From formula R&D and OEM/ODM manufacturing to packaging and finished products. | Bio-A Group partners with brands from formula R&D and ingredient selection through OEM/ODM manufacturing to packaging and finished products, following each brand’s own direction. |
| page-home | `t_425311a5` | `t_5247c8d8` | Bio-A Group phát triển giải pháp theo mục tiêu sản phẩm, nhóm khách hàng và định vị thương… | Consulting around product goals, customers and brand positioning. | Bio-A Group builds solutions around your product goals, target customers and brand positioning. From the first idea, formula, ingredients and packaging to the production plan, our team coordinates each stage for a clear roadmap, flexible adjustments and easy expansion with new products when needed. |
| page-home | `t_2ad9edb5` | `t_930785d3` | Đội ngũ R&D hỗ trợ phát triển công thức, lựa chọn nguyên liệu, làm mẫu thử và điều chỉnh c… | Formula development, sampling and refinement for each project. | Our R&D team supports formula development, ingredient selection, sampling and sensory adjustments to project requirements. Clients can choose a suitable formula base and fine-tune ingredients, texture, fragrance, color and intended benefits before approving the sample for packaging and production. |
| page-home | `t_d7eb5acc` | `t_6314217b` | Bio-A Group đồng hành chuẩn bị thông tin sản phẩm, nội dung nhãn và các hạng mục hồ sơ cần… | Support for dossiers, notifications and label information. | Bio-A Group helps prepare product information, label content and the documentation required for each product category. This runs in parallel with R&D and packaging to reduce waiting time between steps, limit repeated revisions and get the project better prepared before it enters the production plan. |
| page-home | `t_fdaf9a70` | `t_ee6fbf5d` | Từ mẫu thử đến thành phẩm, các tiêu chí về nguyên liệu, cảm quan, kết cấu, mùi hương, quy … | Quality monitoring throughout development and production. | From sample to finished product, ingredients, sensory profile, texture, fragrance, packing specifications and stability are monitored at each stage, to keep quality consistent, limit deviation between the approved sample and the actual production batch, and ensure the product matches the brand direction. |
| page-home | `t_ccd5a801` | `t_eead0765` | Gia Công Dược Mỹ Phẩm… | Cosmetic manufacturing | Cosmeceutical manufacturing |
| page-home | `t_6be5e218` | `t_cb7299e7` | Bắt đầu bằng việc làm rõ ý tưởng, nhóm sản phẩm, khách hàng mục tiêu, ngân sách và tiến độ… | Align product goals, budget and timeline. | We start by clarifying the idea, product category, target customers, budget and desired timeline. Bio-A Group then builds a suitable roadmap with you for a ready formula, a custom formula or a range expansion, with R&D, packaging and production milestones set upfront. |
| page-home | `t_d6108fdc` | `t_07c33a75` | Đội ngũ R&D triển khai công thức, lựa chọn nguyên liệu, làm mẫu và tinh chỉnh theo phản hồ… | Develop formulas, ingredients and samples for your brand direction. | The R&D team develops the formula, selects ingredients, makes samples and refines them from feedback. Each trial round focuses on sensory profile, texture, fragrance, color, intended benefits and stable production when moving from sample to actual factory scale. |
| page-home | `t_73672340` | `t_b1c29fad` | Sau khi công thức ổn định, dự án tiếp tục với lựa chọn chai lọ, quy cách đóng gói, nhãn và… | Select packaging, labels and required brand assets. | Once the formula is stable, the project moves on to bottles, packing specifications, labels and brand identity. Bio-A Group coordinates packaging that suits the product’s characteristics, is easy to fill and produce, and keeps a consistent image when it goes to market. |
| page-home | `t_503d0ab5` | `t_26ae80f0` | Bio-A Group phối hợp rà soát thông tin sản phẩm, nội dung nhãn và tài liệu cần chuẩn bị th… | Prepare the documentation and product information required. | Bio-A Group reviews product information, label content and the documents to prepare for each product category. This runs in parallel with the final R&D and packaging steps to limit repeated revisions and keep the planned production schedule. |
| page-home | `t_c0d136fc` | `t_c9bedd3a` | Khi các hạng mục đã được xác nhận, nhà máy triển khai sản xuất, sang chiết, đóng gói và ki… | Manufacture, pack and deliver to the agreed plan. | Once all items are confirmed, the factory carries out production, filling, packing and finished-goods control according to plan. Delivery progress is tracked clearly so clients can plan their launch, distribution, restocking and the development of further SKUs. |
| page-home | `t_1e56a053` | `t_4632a519` | Kết cấu, nguyên liệu, màu sắc, mùi hương, hoạt chất và quy cách bao bì có thể điều chỉnh t… | Texture, ingredients, color, fragrance and format can be customized for your brand. | Texture, ingredients, color, fragrance, actives and packaging format can be adjusted to your brand direction. Some lines can be developed in several formula versions or sizes for each sales channel. |
| page-home | `t_4778889c` | `t_0a004dd6` | Mở rộng danh mục sản phẩm theo từng phân khúc và nhu cầu của nhóm khách hàng mục tiêu… | Start with a clear product-development roadmap. | Expand your product range by segment and the needs of your target customers |
| page-home | `t_3c761d64` | `t_6bb9aa2d` | Bổ sung sản phẩm thương hiệu riêng với mức giá và quy cách phù hợp chiến lược phân phối… | Optimize budget by development stage. | Add private-label products with pricing and formats that fit your distribution strategy |
| page-home | `t_57934a90` | `t_5d6d4cea` | Duy trì trải nghiệm đồng nhất để tăng mức độ tin cậy và khả năng mua lại của khách hàng… | Get support from sampling through production. | Keep a consistent experience that builds customer trust and repeat purchases |
| page-home | `t_558aaadf` | `t_5fb7812a` | Tạo khác biệt bằng công thức, kết cấu và quy cách sản phẩm phù hợp với thị trường mục tiêu… | Expand your range with new formulas and packaging. | Stand out with formulas, textures and product formats suited to your target market |
| page-home | `t_16c84862` | `t_95c5500c` | Giảm phụ thuộc vào danh mục phổ biến bằng cách phát triển thêm dòng sản phẩm và phân khúc … | Flexible OEM/ODM development for your positioning. | Rely less on mainstream categories by developing new product lines and segments |
| page-home | `t_d4d28e47` | `t_a3137771` | Phối hợp R&D, bao bì và sản xuất theo một lộ trình rõ để tối ưu thời gian triển khai dự án… | Align R&D, documentation and production planning. | Coordinate R&D, packaging and production on one clear roadmap to optimize rollout time |
| page-home | `t_2d37f331` | `t_6eb3199f` | Bắt đầu thương hiệu với lộ trình sản phẩm rõ ràng và ngân sách được phân bổ theo từng giai… | Develop products under your own brand. | Start your brand with a clear product roadmap and a budget allocated stage by stage |
| page-home | `t_5189564e` | `t_b1b7843c` | Tiếp cận quy trình R&D, bao bì và sản xuất mà không cần tự xây dựng toàn bộ hệ thống vận h… | Choose formats and positioning independently. | Access R&D, packaging and production without building the whole operation yourself |
| page-home | `t_b788a037` | `t_32dd941d` | Giảm tải công việc triển khai bằng cách phối hợp các hạng mục phát triển sản phẩm với Bio-… | Scale with additional SKUs as demand grows. | Lighten your rollout workload by coordinating product development with Bio-A Group |
| page-home | `t_dc1ec5be` | `t_d08a0572` | Bio-A Group cùng khách hàng làm rõ ý tưởng, / nhóm sản phẩm, khách hàng mục tiêu, ngân sác… | Bio-A Group aligns the product idea, target customer, / budget and expected timeline with your team, / then defines the formula, quantity and milestones / before R&D and production planning begin. | Bio-A Group works with you to clarify the idea, / product category, target customers, budget / and desired timeline to build a suitable roadmap / for R&D and production from the very start. |
| page-home | `t_5e3fe5f4` | `t_557e9322` | Đội ngũ R&D lựa chọn nền công thức, nguyên liệu, / làm mẫu thử và tinh chỉnh cảm quan theo… | Our R&D team selects formula directions and ingredients, / prepares samples and refines sensory details, / while checking production feasibility / before the final sample is approved. | Our R&D team selects formula bases and ingredients, / prepares samples and refines sensory details from feedback, / while reviewing practical production feasibility / before the sample is finalized for production. |
| page-home | `t_e7475ad7` | `t_0019f083` | Sau khi công thức ổn định, dự án tiếp tục với / lựa chọn chai lọ, quy cách đóng gói và nhã… | Once the formula is stable, the project moves to / bottles, filling format, labels and brand assets, / so packaging fits the product characteristics / and remains consistent with the brand direction. | Once the formula is stable, the project moves to / bottles, packing specifications and labels, / so packaging fits the product characteristics / and remains consistent with the brand direction. |
| page-home | `t_993d0615` | `t_cc50b1ce` | Bio-A Group phối hợp rà soát thông tin sản phẩm, / nội dung nhãn và các tài liệu cần chuẩn… | Bio-A Group reviews product information, label content / and the documentation required for each category, / alongside final packaging preparation / to reduce later-stage revisions. | Bio-A Group reviews product information, / label content and the documents to prepare, / in parallel with final packaging preparation / to limit later-stage revisions. |
| page-home | `t_c66cd6ee` | `t_2e6d5b9d` | Nhà máy triển khai sản xuất, sang chiết, đóng gói / và kiểm soát thành phẩm theo kế hoạch … | The factory manufactures, fills, packs and controls / finished goods according to the agreed production plan, / helping the brand keep launch timing predictable / and prepare distribution with confidence. | The factory manufactures, fills, packs and controls / finished goods according to the agreed plan, / so the brand stays in control of launch timing / and product distribution plans. |
| page-about | `t_5c3eed19` | `t_3ed13f05` | Dầu gội, dầu xả, tinh chất và các giải pháp chăm sóc tóc theo yêu cầu.… | Shampoo, conditioner, treatments and hair-care solutions developed to your brief. | Shampoo, conditioner, hair serums and hair-care solutions developed to your brief. |
| page-cosmetics | `t_808d4fc2` | `t_e4bb3318` | Dầu gội, dầu xả, tinh chất và các giải pháp chăm sóc tóc được phát triển theo yêu cầu dự á… | Shampoo, conditioner, treatments and hair-care solutions developed to the project brief. | Shampoo, conditioner, hair serums and hair-care solutions developed to the project brief. |
| page-cosmetics | `t_e81c428a` | `t_377beddb` | Các thông số và đặc tính cảm quan được theo dõi trong quá trình sản xuất để hạn chế sai lệ… | Product parameters and sensory characteristics are monitored during manufacturing. | Parameters and sensory characteristics are monitored during production to limit deviation from the approved sample. |
| page-home | — (new) | `t_69160827` | Bio-A Group nhận R&D và sản xuất OEM/ODM các dòng dược mỹ phẩm theo định hướng thương hiệu… | — (repo-only text until now) | Bio-A Group provides R&D and OEM/ODM manufacturing for cosmeceutical lines based on each brand’s direction. A project can start from a base formula or a custom formula, coordinating ingredients, samples, packaging and production planning into a consistent finished product. |
| page-home | — (new) | `t_c50e8e5d` | Các dòng mỹ phẩm được phát triển theo nhu cầu sử dụng, phân khúc khách hàng và định vị thư… | — (repo-only text until now) | Cosmetic lines are developed around usage needs, customer segments and brand positioning. Bio-A Group supports everything from formula, texture, fragrance and container selection to filling, packing and finishing before handover. |

## 3. Backup

**File:** `D:\BIOA_WORKSPACE\_private\sanity\backups\r28d-d1-before-2026-11-23T083849639Z.json`
- Private; **not** in the ZIP; contains no secrets, only the 3 published documents.
- sha256 `625251cea9dd4f75d5128843e01d7bcc0a7028e53a0bf892f62daa3302494b96`.
- A fresh backup is taken again immediately before the write.

## 4. Preview impact (CMS Preview `cms-preview`)

**Code only, without Sanity:**
- The CMS Preview would show the new EN at once, because the new slot ids have no Sanity value and the repository text is used.
- But the Studio and Sanity would still hold the old fields.
- That is why the code is **not** on `cms-preview` yet.
- It is only on branch `r28d/d1-en-parity`, which Cloudflare builds as its own preview: `r28d-d1-en-parity.bioagroup.pages.dev`.

**After approval, in order:**
1. Fast-forward `r28/blog-icon-cms` and `cms-preview` to the D1 head.
2. Re-read the revisions, take a fresh backup, run `cms-sync-slots --apply`.
3. The Sanity webhook rebuilds the Preview. Check `/_bioa-cms.json`: `waitingEn = []` and the new snapshot sha.
4. Re-run the layout QA on the served Preview.

The Preview text is the same before and after step 2 (Sanity values = repository values).

**Studio gap (separate gate):**
- The deployed Studio (R27) builds its form from the registry of that time. It does **not** know the 31 new slot ids, so the Studio shows them as unknown fields, and these texts cannot be edited in the Studio until it is redeployed.
- The branch Studio code carries the R28 VI-first labels ("Tự động dịch…"), which must **not** be deployed. A Studio redeploy therefore needs a small manual-mode label change first, plus its own approval.
- Until then, these 31 texts change only through the repository.

## 5. Rollback (Sanity first, then code)

**A. Symmetric:**
1. `git revert` the D1 commits on the branch.
2. `node tools/cms-sync-slots.mjs --from <D1 head> --apply`: it re-adds the old slots with the old repository text and removes the unedited new ones.
3. Fast-forward `cms-preview`.

**B. Last resort:** restore the 3 documents from the backup with `createOrReplace` pinned to the current `_rev`.

**Production:** `main` is not involved; nothing to roll back.

## 6. APPLIED: Owner approval "Duyệt D1" (25/11/2026)

**Trước khi ghi** (đọc lại 25/11):
- `_rev` của cả 3 tài liệu **không đổi** so với 23/11;
- không có bản nháp;
- bản sao lưu mới `r28d-d1-before-2026-11-25T014218577Z.json` có nội dung giống hệt bản 23/11 (sha256 `625251ce…`);
- dry run trùng khớp: +28 / −26, +1 / −1, +2 / −2, 0 xung đột.

**Code:** fast-forward `r28/blog-icon-cms` và `cms-preview` `bbf21b3` → `676a668`, không force.

**Ghi Sanity:** `node tools/cms-sync-slots.mjs --from bbf21b3 --apply`.

| Tài liệu | `_rev` trước → sau | Transaction | Ghi lúc |
|---|---|---|---|
| `page-home` | `ehgitTyVwN7DzeQ1YVw1Ap` → `rDjQeA2teu1HkTJ2oipWU0` | `rDjQeA2teu1HkTJ2oipWU0` | 01:42:43Z |
| `page-about` | `WIhnXGDtfVOQnknZsfaoqQ` → `rDjQeA2teu1HkTJ2oipWWH` | `rDjQeA2teu1HkTJ2oipWWH` | 01:42:45Z |
| `page-cosmetics` | `WIhnXGDtfVOQnknZsfaoqQ` → `GsTwF7O1T30fo6QWvQSm7d` | `GsTwF7O1T30fo6QWvQSm7d` | 01:42:47Z |

**Kiểm tra sau khi ghi** (so với bản sao lưu và registry):
- 31 ô mới đúng VI + EN của registry;
- 29 ô cũ đã gỡ;
- **0 trường khác bị đổi**;
- mọi ô trong registry đều có giá trị;
- dry run mới: +0 / −0.

Bản sau khi ghi được lưu riêng tại `_private/sanity/backups/r28d-d1-after-*.json`.
