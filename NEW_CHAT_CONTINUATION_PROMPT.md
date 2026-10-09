# BIO-A GROUP — NEW CHAT CONTINUATION PROMPT — 2026-10-09

Check latest main SHA and read `AGENTS.md`, `START_HERE.md`, `FULL_HANDOFF.md`, `docs/WORKFLOW.md`, `docs/SOURCE_MAP.md`, `docs/404_PAGE_CONTRACT.md`, `docs/TURNSTILE_RUNTIME_QA.md`. Source-first Merywood authority, minimal patches, independent Desktop/Tablet/Mobile QA.

**Active candidate `BIOA-404-SOURCE-PARITY2`:** User rejects localized 404. Both `/` and `/en/` missing URLs use original Merywood 404 English: "Ooops!", "We can’t find the page you’re looking for", "← Back home". Build emits both fallback pages. CTA uses existing `btn`, `btn__icon`, `btn__text` DOM, visually matched to source screenshot. Extra white gradient removed. Source exact CSS not verified.
**Not yet fixed:** GitHub 404 asset remains 18.5kB AVIF; user's supplied 2.4 MB PNG 1808×870 or q98 1808×870 WebP MUST replace it. Do not mark full quality PASS. After upload, update 404 image reference, build/test/push. Then owner runtime test and PASS/FROZEN.
Production confirmed PASS/FROZEN: 14-day maintenance preview and noindex, D1/Sheets/Resend notifications, popup auto-close, prior Header/Mobile Menu/Home/Footer/Blog/Chat/Cookie/VI-EN. No changes to Pages `BIOA_SITE_MODE`, DNS, lead backend, secrets, or frozen sections.
Also pending real Turnstile negative QA. Phase2 FULL TABLET PASS, Phase3 cleanup/hardening, Phase4 final sitemap/robots/build public launch only owner approval. No CMS installation now.
CMS discussion: WordPress headless + Rank Math feasible and user familiar; Sanity alternative, neither active. Rollback `c7d29cbdbd901849fc0e664222059873fa21bfef`, previous 404 commit superseded.
