# 2026-10-13 — FOOTER-ZALO-TABLET-SQUARE1 — UI candidate; owner QA pending

**Source of authority:** owner rollback `c320f2868a46aafd141a7178c03337a1d07b3a82` (main unchanged). Candidate branch `candidate/footer-zalo-tablet-square-20261013` contains one narrow CSS owner change in `bioa-source-components.mjs` (only 769–1200 CSS px); no shared component redesign.

**Measured defect:** Read-only audit CI `38339522271` (success; 84 observations on 12 VI/EN routes at 390/768/769/834/1024/1180/1440) showed Footer Zalo link width/height **26.6 × 46px at 834**; at approved Desktop 1440, **46 × 46px**. Same mismatch seen on Home and About; source-style smoke only checked Zalo width. DOM generator `footerSocials` adds a bare fourth `<a>` when three Merywood anchors exist; it never adds `.socials__link`; Tablet height rule `.footer-top .footer-top__socials .socials__link` therefore skips Zalo. A more specific existing Zalo rule controls its width but had no height.

**Minimal correction:** complete the existing `.footer-top .footer-top__socials a[aria-label="Zalo"]` owner rule with `height/min-height/max-height` at 3.1944vw. No extra CSS block, new breakpoint, SVG edit, asset replacement, DOM change or global selector. Preserve existing parent Footer grid and four categories.

**Checks:** `tests/tablet-browser-smoke.mjs` now fails if Footer Zalo button is not square at 769/820/834/1024/1180; smoke also asserts proportional width and typography and no document overflow. CI tests, build and Chromium are automated; owner Desktop/Mobile locked and Tablet PASS cannot be inferred from CI. Original Merywood external stylesheet is not pinned in repo, so automated test is relative to approved BIO-A Desktop; full live-source pixel parity is not claimed.

**PROTECTED:** Desktop >=1201, Mobile <=768, header, hero, sliders, chat, consent, lead forms, 404, all assets and approved footer artwork/content/links. Sanity future-only; D1/Sheets/Resend/Turnstile and maintenance/noindex untouched.

**OWNER QA REQUIRED on candidate Preview ONLY, after confirmation of deploy:** Desktop 1440 Home Footer Zalo shape/color/hover same as baseline; Tablet 769/834/1024/1180 Home/Footer plus one subpage VI/EN: all four social buttons square and visually matched, Zalo image centered, no clipping or horizontal scroll; Mobile 390/768 footer contact row unaffected. Test click/hover (where supported) and that links open expected targets. For FAIL provide route + viewport + screenshot. Do not merge until owner confirms.


Read START_HERE, AGENTS, FULL_HANDOFF, docs/WORKFLOW, docs/SOURCE_MAP and docs/RESPONSIVE_SOURCE_PARITY_CONTRACT before changes. Rejected Tablet history cannot override c320f28. Candidate remains owner QA pending.
