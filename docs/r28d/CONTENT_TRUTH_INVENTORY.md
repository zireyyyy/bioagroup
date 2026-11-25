# R28d-D0 — Content-truth inventory & source of truth (2026-11-23)

**Read-only audit. No website copy and no Sanity data were changed.**

| Item | State |
|---|---|
| Candidate | `r28/blog-icon-cms` = `cms-preview` = `6889ec9` |
| Production | `main` `9d044a7`, maintenance 503, untouched |
| Sanity | published dataset `production`, read with the existing Pages **viewer** token (no write) |
| Snapshot | `97d6dcb9621d54a1`, the same snapshot the Preview serves (`/_bioa-cms.json`) |

## 1. Source of truth per field (where a change must be made)

| Field family | Owner of the text | What a change requires | Live on Preview from |
|---|---|---|---|
| 6 main pages: Home, About, Cosmetic Manufacturing, Other Services, Contacts, Careers list (393 text slots) | Repo copy in `bioa-transform.mjs`, `bioa-home-refine.mjs`, `bioa-about-refine.mjs`, `bioa-cosmetics-refine.mjs`, `bioa-services-refine.mjs`, `bioa-contacts-refine.mjs`, `bioa-careers.mjs`, **mirrored** in Sanity `page_*` documents | Repo edit → `node tools/cms-registry.mjs <dist> --measure` → `node tools/cms-sync-slots.mjs --from <ref>` (dry run, then **owner-approved** apply) | Sanity published value (today **identical** to repo for all 393 slots: 0 overrides) |
| Text **not** in a slot: buttons, nav, form, chat, Footer, headings with mixed markup, We Produce desktop body, mobile We Produce copy | Repo only | Repo edit + build | Repo |
| SEO title / description, 9 pages | Sanity `seoPage` (mirrors repo) | Studio edit, or repo + sync | Sanity |
| Blog: 38 posts, 6 index pages | Sanity `blogPost` (`rewriteApproved` true for all), repo fallback in `bioa-blog-refine.mjs` | Studio edit (VI + EN required by the deployed schema) | Sanity |
| Careers: 3 roles | Sanity `career` (mirrors repo) | Studio edit | Sanity |
| Legal: Privacy, Cookie | Repo text; Sanity legal pages need a valid approval hash (none today, so the repo text is served) | Owner legal approval | Repo |
| Business identity (email, phone, address, MST, hours, social) | `bioa-business.mjs` (`docs/BUSINESS_IDENTITY.md`) | Repo edit | Repo |
| Chatbot knowledge | `lib/chat/knowledge.js` (versioned) | Repo edit, from **confirmed** VI only | Not live (flag OFF) |

**Consequence for R28d-D1:**
- Most Owner-reported EN defects (Home Why Choose, How We Work, Built For) sit in **CMS slots**.
- Fixing them is a repo change **plus** a published Sanity write. Both happen only after the Owner approves `OWNER_FACTORY_FACT_CHECK.md` §C, and the Sanity batch gets its own approval.
- Editing code alone would make the Preview build fail closed (a slot whose registered original no longer matches), by design.

## 2. Deployed Studio vs branch code (manual bilingual mode)

**Deployed Studio** (`bioagroup.sanity.studio`, login required): per repo records the last deploy is **R27 (`d93a0f0`)**.
- Blog, Careers and SEO: EN fields are **visible and required** ("Tiêu đề (EN)", "Mở bài (EN)", "Tiêu đề mục (EN)" …). That is honest manual bilingual editing.
- Page text slots show "Tiếng Việt" and "Tiếng Anh" side by side, with the approved length limit.

**Branch code `ef5f7b6`** (R28 VI-first): EN fields collapsed and labelled "Tự động dịch từ bản tiếng Việt". **It was never deployed.** Because the Owner deferred auto-translation (R28d-B), **it must not be deployed as is.**
- Before any future Studio deploy, change those labels to manual mode ("Tiếng Anh — nhập thủ công").
- That is a Studio deploy, a separate gate.

**Gap found in the deployed Studio:**
- A page text can be published with a new **VI** while its **EN** stays the old text, with no warning.
- This is how the Home EN drifted (the VI was expanded, the EN was never updated).

**Guard added in this phase (repo code, no Studio deploy needed):**
- `tools/cms-snapshot.mjs` flags such a pair:
  - listed as `text:<page>.<slot>` in `waitingEn` on `/_bioa-cms.json`;
  - a build-log warning.
- `tools/cms-release.mjs` **refuses to create a Production release** while any page text is in that state.
- `tools/cms-preview-status.mjs` prints the list.
- Tests: `tests/r28d-content-parity.test.mjs`.
- Today the list is empty, because 0 slots differ from the repo.

## 3. Owner workflow: editing both languages by hand

1. Open the Studio → the page → the section.
2. Edit **Tiếng Việt** first. Then write **Tiếng Anh** with the same meaning: same numbers, same steps, the same "theo dự án" qualifiers, no added promises.
3. Publish. Wait 3–5 minutes, then open the Preview in VI and in EN.
   - Check the changed section on a phone and on a computer.
4. If you changed only the VI and the EN still shows the old text, the developer's status check lists it as "EN chưa cập nhật". It cannot reach Production until the EN is updated.
5. Figures, certificates, capacities, MOQ, prices or lead times: **do not type them yourself**. Send the document to the developer, who updates the fact sheet first (`OWNER_FACTORY_FACT_CHECK.md`).

**Explicitly OFF (Owner decision R28d-B, DEFERRED):**
- automatic VI→EN translation;
- the translator Worker;
- the Sanity Editor robot token;
- webhook rerouting;
- the 97-document `i18n` backfill.

## 4. Inventory: what was compared

| Family | Pairs | Items / fields compared | Result (detail: `VI_EN_PARITY_AUDIT.md`) |
|---|---|---|---|
| Home | 1 | 505 | 5 H, 3 M, 2 L |
| About | 1 | 253 | 2 H, 2 M, 2 L |
| Cosmetic Manufacturing | 1 | 474 | 2 H, 3 M, 1 L |
| Other Services | 1 | 283 | 1 M, 1 L |
| Contacts | 1 | 188 | 1 H (EN trade name) |
| Careers list + 3 details | 4 | 770 | PASS |
| Blog index | 1 (6 pages) | 204 | PASS |
| Blog articles | 38 | 995 paired fields (titles, SEO titles, excerpts, intros, headings, paragraphs, bullets, notes) | PASS: 0 missing EN, 0 language leak, 0 abridged; medical terms are disclaimers only |
| Legal (Privacy, Cookie) | 2 | 375 | OWNER PASS; only the EN trade-name variant is noted (D-16) |
| 404 | 1 | 4 | L (English on VI routes, by design) |
| SEO heads | 9 pages + 38 posts | title + description | PASS, except D-15 and D-16 wording |
| Chatbot knowledge | 1 | 8 FACTS × 2, 5 FAQ × 2 | 2 facts withheld pending the Owner (B4 mother & baby, B6 trademark) |

**Not treated as defects:**
- the factory address, the advisor name "Khánh Như" and "Blog" / "Hotline" / "Email" left untranslated;
- date formats ("12/11/2026" vs "12 November 2026");
- digits written as words in EN titles ("7" → "Seven").

## 5. Evidence

`D:\BIOA_WORKSPACE\_reports\r28d-d0\` (in the ZIP: `evidence/r28d-d0/`):
- `pages/` and `pages2/`: `pairs.json`, one TSV per route, `flags.json` / `flags.tsv`;
- `blog-flags.json`;
- `home-pairs.txt`, `home-priority.txt`, `cosmetics-side.txt`.

Extraction scripts: `D:\BIOA_WORKSPACE\_scratch\r28d-d0-*.mjs` / `.cjs` (read-only). The Sanity snapshot is kept in `_scratch`; it is **not** in the ZIP.
