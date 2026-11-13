# BIO-A — CMS-R25b Technical Review Corrections — 2026-11-13

**Base:** `cms/sanity-r25` @ `2aefbea` (verified = `origin/cms/sanity-r25`; `main` = `a062d59`, untouched). Commits `cc1f821`, `b36c2ee`, `b92c910` + this docs commit pushed to `cms/sanity-r25` with owner confirmation ("Yes, push branch"); `main` not pushed.
**Protected and unchanged:** R24RC2 owner PASS (CMS disabled → dist byte-identical), Production `main`, maintenance, Form/Lead, VI/EN, responsive, icons, CTA, all approved UI.

## 1. Closed

| # | Item | Fix | Evidence (`D:\BIOA_WORKSPACE\_reports\cms-r25b\`) |
|---|---|---|---|
| A (P0) | A Production build could pull Preview-only CMS content | Pinned content release: `main` never reads Sanity (live mode refused on `CF_PAGES_BRANCH=main`); builds extract only `cms/release/current.json` → sha256-verified archive; no pin = repository content. Release/rollback tool `tools/cms-release.mjs`. Plan for approval: `docs/CMS_RELEASE_PLAN.md` | `qa/release-isolation.txt` (network blocked: A = Preview build of approved content; Sanity changed → main unchanged; B = R24RC2; re-pin A = A; tampered archive and live-on-main refused); `qa/cloudflare-sanity-triggers.txt` |
| B (P1) | URL-keyed image slots: `image-1_mobile.webp` merged two products; `<picture>` mobile sources not replaced; SVG uploads | Registry v2: 41 position slots / 67 targets; reviewed desktop↔mobile pairs (`cms/slot-groups.json`, 20); `<picture>` sources join their `<img>`; per-target cuts; 123 references locked with reasons; JPEG/PNG/WebP only | `qa/edit-html-diff.txt`, `qa/visual/` (12 checks PASS: same boxes 1440/834/390, expected file shown, Sachet untouched), `qa/fail-closed.txt` (SVG refused), `docs/CMS_IMAGE_SOURCES.md` |
| B | Shared files | `produce-1.webp` = one position (desktop + mobile-clean + `<picture>` source); `produce-2.webp` = two positions ("Mỹ phẩm" desktop vs "Bao Bì & Hoàn Thiện" mobile); `image-1_mobile.webp` = two positions ("Tuýp & chai chân không" desktop paired with mobile slide 3; "Gói Sachet" mobile) | `cms/registry.json`, test "registry v2" |
| C (P1) | Any bioagroup.vn canonical accepted | Only the page's own approved canonical (Studio, fetch, build); current values untouched | tests "SEO canonical", `qa/fail-closed.txt` |
| D | Time-window approval stamp | Content-hash stamp; verified in Studio on a QA-only document: approve → valid; publish without approval → invalid (repository text kept); restore approved revision from history → valid; draft edit after approval → published approved version stays, edit not live | `qa/legal-approval.txt`, `qa/legal-approve-dialog.jpg` |
| E | Regression | CMS disabled → byte-identical; live seeded → byte-identical; image/text VI/EN edits exact; Blog draft hidden / publish shown / rollback identical; Careers sample/open/closed; offline tests 14/14; repo gates PASS; no secrets in repo/dist/Studio bundle; Preview `/api/lead` 503; Production 503 | `gates/summary.txt`, `qa/blog-careers.txt`, `qa/blog/`, `qa/careers/`, `qa/secrets-and-triggers.txt` |

**Sanity state after QA:** 41 `imageSlot` documents (the 96 v1 documents were removed after checking none held an upload or draft), 0 drafts, 0 test documents, 0 uploaded assets. Studio redeployed (raster-only uploads, per-cut frame info, canonical rule, content-hash approval).

## 2. Not verified / open

1. ~~Cloudflare Preview with the R25b code~~ — **verified after the push**:
   - **Defect found on the first R25b Preview build (`80466aa5`, b36c2ee):** on the Linux build image `tools/fetch-cms.mjs` did nothing. Its main-module check built `file:////opt/...`, so the Preview was built without CMS content and without an error.
   - **Fixed in `b92c910`:** `pathToFileURL`, also applied to `tools/cms-registry.mjs`. In addition the build now stops when a Preview branch has Sanity configured, or a release is pinned, but no snapshot exists. A regression test was added (15/15).
   - **Preview `497cb187` (b92c910):** log shows `CMS mode: live (preview branch "cms/sanity-r25")` and snapshot `8aae98c8` (= local), with no secret in the log.
   - **Publish:** hero + tube + About image + H1 → webhook → builds `21641b28`/`2c38577d` showed the hero desktop cut + `<picture>` mobile cut, the tube on desktop and mobile, the Sachet image unchanged and the About image; image served 200 WebP.
   - **Rollback:** builds `133620d7`/`85d25f80` made /, /en/, /about/, /en/about/, /blog/, /tuyen-dung/, /contract-manufacturing-cosmetics/ and /dich-vu-khac/ byte-identical to the R24RC2 PASS build.
   - Preview `/api/lead` 503; Production 503. Evidence: `qa/preview-r25b-buildlog.txt`, `qa/preview-r25b-flow.txt`.
2. **`CF_PAGES_BRANCH=main` on a real Production build:** simulated locally. The variable is confirmed present on Cloudflare builds (the Preview log names the branch); on `main` it will be observed at the first Production build after an approved merge. With no pin, Production stays on repository content whatever the variable.
3. **Locked icon-size graphics** (GMP/HACCP marks shown at 60–70 px): locked by rule. Unlocking needs an owner decision; the change is one line in `tools/cms-registry.mjs` plus a registry regeneration.
4. **404 page image** (`bioa-404-original.png`): outside CMS scope (owner-PASS 404 page).
5. Studio legal approval was exercised on a QA document only; Privacy and Cookie were **not** approved. The website keeps the repository text until the owner approves them.

## 3. Owner actions

1. Review `docs/CMS_RELEASE_PLAN.md` and approve (or reject) the pinned-release model.
2. Preview acceptance on https://cms-sanity-r25.bioagroup.pages.dev (R25b is live there; content = current site).
3. Test in Studio (checklist below).
4. Later, separately: approve merging to `main` (Production stays byte-identical until the first release), then the first content release.

## 4. Owner checklist (BẠN CẦN TEST GÌ)

Studio https://bioagroup.sanity.studio/ (đăng nhập GitHub `bioagroupsale`):

1. **Ảnh website → Trang chủ** có 19 vị trí.
   - Mở "Ảnh 1 — Nhà Máy Sản Xuất…": phần khung ghi 2 bản (máy tính/tablet 1.90:1 và điện thoại 0.83:1).
   - "Tuýp & chai chân không" và "Gói Sachet" là hai vị trí riêng.
2. Ô "Ảnh mới" chỉ cho chọn JPEG/PNG/WebP.
3. **SEO → Về chúng tôi → Tiếng Anh → Canonical:** nhập `https://bioagroup.vn/contacts/` → báo đỏ, không cho xuất bản. Xóa ô để trở lại bình thường (không bấm Publish).
4. **Pháp lý:** chỉ có nút "Duyệt & xuất bản"; tab "Phê duyệt" có trường "Mã nội dung đã duyệt".

**Đạt:** đúng như mô tả. **Không đạt:** gửi ảnh chụp màn hình kèm tên vị trí.

## 5. Rollback

- **Code:** these commits are local on `cms/sanity-r25`; `origin/cms/sanity-r25` stays at `2aefbea`; `main` stays at `a062d59`.
- **Sanity:** v1 slots can be re-seeded from the R25 registry (`git show 2aefbea:cms/registry.json` + `tools/cms-seed.mjs` at `2aefbea`). No editor content existed.
- **Studio:** redeploy from `2aefbea` (`cd studio && npx sanity deploy`).
