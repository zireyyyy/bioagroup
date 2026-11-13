# BIO-A — Sanity CMS integration (CMS-R25) — 2026-11-13

**Owner directive:** "BIO-A GROUP — SANITY CMS INTEGRATION / ONE IMPLEMENTATION, NO WEBSITE REDESIGN" (2026-11-13), after the owner confirmed R24RC2 PASS.
**Base:** `main` `a062d59`. **Branch:** `cms/sanity-r25`.
**Status:** CODE/BUILD/AUTOMATED PASS · PREVIEW publish→rebuild→rollback PASS · OWNER CMS REVIEW PENDING. Branch `cms/sanity-r25` pushed with owner approval (Preview only). Production untouched: `main` and Production config are unchanged, and maintenance stays ON.

Read with `docs/CMS_CONTENT_RESPONSIVE_CONTRACT.md` (permanent contract), `docs/CMS_CONTENT_MAP.md` (every slot) and `docs/CMS_OWNER_GUIDE_VI.md` (owner guide).

## 1. Architecture: data only, static build kept

```
Sanity Studio (bioagroup.sanity.studio, owner login)
   │  Publish (drafts never leave Sanity)
   ▼
Sanity dataset hfmu7ifg/production (PRIVATE)
   │  webhook on published changes → Cloudflare Pages deploy hook (Preview branch only)
   ▼
Cloudflare Pages build:
   node tools/fetch-source-bundle.mjs && npm run build
      prebuild = tools/fetch-cms.mjs ──► .cms/snapshot.json + .cms/assets/*.webp   (network, viewer token)
      build    = net-guard + build.mjs ──► bioa-cms.mjs applies the snapshot     (no network, deterministic)
   ▼
dist/  (CMS images self-hosted under /assets/cms/; no CMS host, token or script in the browser)
```

- **No new framework.** The site is still the pinned-source static build: no Next/Astro/WordPress, and no Sanity package in the website. `fetch-cms` uses plain HTTPS.
- **Studio is separate.** `studio/` has its own `package.json` (Sanity 6.21.0, Node ≥ 22.12, which is local or the Sanity host). Cloudflare installs only the root `package.json`, so the website build keeps Node 20.
- **Data only.** CMS values replace text nodes, image sources/alt, SEO tags and the data arrays of the existing Blog, Careers and Legal renderers. DOM, classes, CSS, scripts, breakpoints, slider/animation and every owner-PASS component stay in code.

## 2. Slots: what can be edited (`cms/registry.json`)

- Generated from the **built owner-PASS site** by `tools/cms-registry.mjs <dist> --measure`. Every slot exists today, VI/EN paired.
- **Images:** 96 slots. Pages: Home 32, About 12, Cosmetics 38, Other Services 11, Careers list 1. Site-wide: cookie icon and chat avatar. For each slot the registry stores the original URL, natural size, rendered frame at 1440/834/390 and object-fit/background-size.
  - Protected and never a slot: BIO-A logos and monogram, Zalo mark.
  - Job card images belong to the Careers documents.
- **Texts:** 410 slots (VI+EN). Each slot's id is the content hash of its original.
  - Excluded: CTA/buttons, forms, nav, cookie banner, chat, owner-gated Careers blocks, Careers grid/filter, business identity strings.
  - A text shown in both the desktop and mobile variants of a section is one slot.
  - Envelope: max = max(1.25 × original, original + 12) characters.
- **Locating a slot:** by its registered original value (URL, or exact text and tag) inside the page `<main>` or the site shell.
  - If a slot with a CMS value is no longer found, the build **fails**: the registry is out of date after a code change. Regenerate it, re-seed and redeploy the Studio.
  - If code text changes, the slot id changes and an old CMS value is simply not applied (no stale override).

## 3. Content model (Studio)

| Type | Documents | Notes |
|---|---|---|
| `imageSlot` | 96, fixed | Current-image preview, frame info, upload with crop/hotspot, alt VI/EN (required with an image). Cannot be created, deleted, duplicated or unpublished. |
| `page_<key>` | 6 singletons | Text slots grouped by page section (collapsible), prefilled with the current VI/EN text, envelope validation, no `<` or `>`. |
| `blogPost` | 38 imported + new | Same shape as the approved Blog template. Existing slugs are read-only, so URLs are preserved. `category` is internal only: the site has no category UI, and adding one is a new component needing owner approval. |
| `career` | 3 imported (status `sample`) + new | Status `draft`, `sample`, `open` or `closed`. `open` requires the official badge, benefits, place and apply fields (VI/EN). Filter categories are fixed (sales, R&D, production). |
| `seoPage` | 9 singletons | Title, description, OG image, canonical (only `https://bioagroup.vn/...`), prefilled with today's values. |
| `legalPage` | 2 singletons | Paragraphs and links only (`mailto:`, `tel:`, internal paths). Publishing is only possible through the **Duyệt & xuất bản** action, which stamps the approver and time. |

Seeding (`tools/cms-seed.mjs <dist>`) uses `createIfNotExists`: it never overwrites an editor's change. **No image was uploaded** (owner rule); images keep the current file as fallback.

## 4. Build integration

- `package.json` `prebuild` runs `tools/fetch-cms.mjs`. The Cloudflare build command is unchanged.
- **CMS disabled** (no `SANITY_PROJECT_ID`, as in Production, CI and local tests): `.cms/` is removed and the build is **byte-identical** to the R24RC2 PASS build (`dist-final-rc2`, 195 files; `diff -r` empty).
- **CMS enabled:** published documents only (`perspective=published`, viewer token).
  - Validation fails the build: lengths, `<` or `>`, slugs, duplicates, required fields, Careers official fields, link targets and SVG scripts.
  - Images are cut to the slot's current ratio, centred on the hotspot. They are 2× the frame, capped at 2400 px and the source size; slots with an intrinsic-size frame get exactly the original size. Files are saved under `/assets/cms/`.
  - A legal document without a valid approval stamp is ignored, so the repository text stays.
- `bioa-cms.mjs` `applyCms` runs last on every page (images, texts, SEO). It writes only values that differ from the page.
  - Merges: `mergeCmsBlogPosts` (same slug replaced in place; new posts by date), `mergeCmsCareers` (by route, `draft` removed, CMS order), `cmsLegal`.
- Careers rendering for `open`: the official texts replace the neutral gated texts, and `data-owner-approval` is removed. The `.mwc-talk` block ("not open yet" wording) is removed for that role only. `closed`: hidden from the list, and the detail pill reads "Đã ngừng tuyển".

## 5. Security

- Dataset `production` switched **public → private**. Sanity assets remain public by URL; this is a Sanity property, and only owner-uploaded images are affected.
- Build token: **viewer** role, label "bioa-build-read (Cloudflare Pages build)". It is stored only as the Cloudflare Preview secret `SANITY_READ_TOKEN` and the private file `D:\BIOA_WORKSPACE\_private\sanity\build-read.token`. It is never in the repo, `dist/` or the browser.
- Seeding and QA used the owner's Sanity CLI login. Its token is read from the CLI config and never printed.
- No write token exists outside the owner's own login.
- The Studio (`bioagroup.sanity.studio`) requires a Sanity login with a role on the project. Only the owner account `bioagroupsale` is a member.

## 6. Cloudflare state (scope of changes)

| Item | Before | After |
|---|---|---|
| Production env vars, bindings, D1, Functions | — | **unchanged** (BIOA_SITE_MODE=maintenance) |
| Preview env vars | BIOA_SOURCE_URL, BIOA_SOURCE_TOKEN | + `SANITY_PROJECT_ID=hfmu7ifg`, `SANITY_DATASET=production`, `SANITY_READ_TOKEN` (secret) |
| Build command | `node tools/fetch-source-bundle.mjs && npm run build` | unchanged (`prebuild` is inside `npm run build`) |
| Deploy hook | none | `sanity-preview-rebuild` → branch `cms/sanity-r25` only (URL in `D:\BIOA_WORKSPACE\_private\cf\preview-deploy-hook.url`) |
| Sanity webhook | none | `wedZ6kXvaMBn4RXM` "BIO-A Preview rebuild" (dataset production, create/update/delete, drafts excluded, CMS types only) |

Other preview branches still build their own code. Branches without `tools/fetch-cms.mjs` ignore the Sanity variables.

## 7. Publish → rebuild (Preview only)

- **Sanity webhook** "BIO-A Preview rebuild": fires on create, update or delete of **published** documents of the CMS types (drafts excluded). It POSTs to the Cloudflare **deploy hook** of the Preview branch. The hook URL is a credential and lives only in the Sanity webhook settings and the Cloudflare project.
- **No deploy loop:** the build only reads Sanity.
- **Several quick publishes** queue several builds. The last one carries the final content.
- **Production** gets no hook in this phase. After owner approval, the proposed release flow is:
  1. merge the code to `main`;
  2. add the `SANITY_*` variables to Production;
  3. use a Production deploy hook triggered only by the owner (a manual release action or a dedicated "Phát hành" document webhook). It is never fired by every publish.

## 8. QA evidence (`D:\BIOA_WORKSPACE\_reports\cms-r25\`)

| Scenario | Result |
|---|---|
| CMS disabled → build vs R24RC2 PASS build | byte-identical |
| Migration identity: seeded CMS (38 posts, 3 roles, 6 pages, 9 SEO) → fetch → build | byte-identical |
| Replace 2 images (Home roadmap `<img>`, About expo background) + edit Home H1 VI/EN | only those 4 HTML lines changed; frames identical at 1440/834/390, no overflow, images loaded (`qa/visual-step1/`) |
| Blog draft | not in snapshot, not on site |
| Publish Blog post | VI/EN pages, index first card, TOC anchors, sitemap, og:image; 200 and no overflow at 3 widths (`qa/step2-blog/`) |
| Careers open/closed (local snapshot only, nothing published) | badge/official texts shown, closed hidden from list + "Đã ngừng tuyển" (`qa/careers-status/`) |
| Rollback (restore seeded revisions, unpublish test post) | site byte-identical to the PASS build again |
| Fail closed: wrong/missing token, unknown project, offline, oversized text, registry drift | fetch or build exits 1; unknown slot ignored, site unchanged (`qa/fail-closed.txt`) |
| Repository gates (CMS disabled) | see `gates/summary.txt` |
| Offline unit tests `npm run test:cms` | 8/8 |
| Preview (Cloudflare) publish → webhook → deploy hook → Preview → rollback | edits visible on https://cms-sanity-r25.bioagroup.pages.dev after ~2 min (builds `b53ce717`, `2b27526f`); after rollback (`828a76b7`, `2ccb9bf3`) /, /about/, /en/, /blog/, /tuyen-dung/ byte-identical to the PASS build; Preview `/api/lead` 503, Production 503 (`qa/preview-flow.txt`) |

## 9. Rollback

- **Content:** Studio History → Restore → Publish (per document).
- **Code:** the CMS lives on branch `cms/sanity-r25`; `main` `a062d59` is untouched. To disable the CMS on any environment, remove `SANITY_PROJECT_ID`: the build then uses repository content only.

## 10. Open items / owner decisions

1. Owner review of the Studio and of the Preview site (checklist in `NEW_CHAT_CONTINUATION_PROMPT.md` / final report).
2. Approval to merge into `main` and enable the CMS on Production (separate release step, §7).
3. Who may set Careers to **Đang tuyển** and who approves legal texts (Studio roles on the free plan: owner only for now).
4. BIO-A images: none uploaded yet. Slots fall back to the current images (several still hosted on merywood.com; see release blocker 6).
