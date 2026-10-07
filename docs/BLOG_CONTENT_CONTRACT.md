# BIO-A GROUP — BLOG CONTENT & SEO CONTRACT

Status: **OWNER-APPROVED / LOCKED**
Authority checkpoint: PATCH-G5 + archive-completion phase
Applies to: `/blog/` and every `/blog/<slug>/` route

This file is mandatory reading before any AI, developer or automation creates, rewrites, translates or optimizes Blog content.

## 1. Authority order for Blog work

1. Owner's latest explicit request.
2. This `docs/BLOG_CONTENT_CONTRACT.md`.
3. `AGENTS.md`, `FULL_HANDOFF.md`, `docs/WORKFLOW.md`, `docs/SOURCE_MAP.md`, `docs/CONTENT_GUIDE.md`.
4. Current `bioa-blog-refine.mjs`.
5. Merywood visual/runtime source.
6. Legacy Bio-A archive as topic/fact source only.

Legacy Bio-A HTML is **not publish-ready authority**. Never paste it directly into production.

## 2. Locked visual/runtime source

Blog index source: Merywood `/blog/`.

Blog detail source: Merywood `/blog/what-affects-moq-in-supplement-manufacturing/`.

Locked source modules:
- article hero/title/meta;
- sticky Table of Contents;
- numbered `.text-block` sections;
- wide `.image-block`;
- 2/3-column `.merywood-cg-wrap` cards;
- one mid-article `.block-green-card` CTA;
- source `.block-flex-table` checklist/comparison when useful;
- informational note + internal links;
- conclusion green card;
- source previous/next navigation.

Do not flatten a detail page into one text block.
Do not invent a replacement Blog layout.
Do not add route-local typography to compensate for copy.

## 3. Locked Blog visual details

The following are owner-confirmed PASS and must not be changed without explicit reopening:
- Blog index watermark: fixed to viewport center, same Bio-A monogram asset, low-contrast ~6% visual strength via ivory veil;
- rich modules contained by `.bb-content-col`;
- Merywood source 2/3-column card geometry on desktop and safe responsive collapse;
- flex-table header weight normalized to 600 for Bio-A;
- white CTA buttons on green article cards;
- Previous arrow points left; Next arrow points right;
- Header/Footer/Cookie/Chat/Zalo/Mobile Menu remain shared owners.

## 4. Article data contract

Every production article must be one structured `blogPosts` record with:
- stable `id` when migrated from legacy source;
- stable legacy `slug` unless the owner approves a URL migration;
- `titleVi` + `titleEn`;
- `seoTitleVi` + `seoTitleEn`;
- `excerptVi` + `excerptEn`;
- publish date and sensible read time;
- a local project thumbnail path;
- paired VI/EN intro paragraphs;
- paired VI/EN structured sections;
- paired VI/EN informational note.

VI and EN must ship in the same patch. Do not use generic runtime machine translation for production article bodies.

## 5. Writing logic — mandatory

Each article should follow a decision path instead of keyword stuffing:
1. H1 answers a specific search intent.
2. Intro explains what the reader will learn and sets realistic expectations.
3. Numbered H2 sections progress from understanding → criteria/mechanism → practical use/development → risk/quality → decision/checklist.
4. Paragraphs remain concise enough for Merywood text blocks.
5. Source cards summarize important supporting ideas; they must be shorter than the main body and must not exist only to add keywords.
6. Use the source table only for a real checklist/comparison.
7. Mid-article CTA connects the topic to a relevant Bio-A manufacturing/project conversation.
8. Conclusion synthesizes the decision; it must not simply repeat the intro.
9. Internal links should be relevant and normally point to Gia Công Mỹ Phẩm, Dịch Vụ Khác and/or Liên Hệ.

## 6. SEO contract

Every article requires:
- unique, human-readable title;
- unique meta description/excerpt;
- one visible H1;
- descriptive numbered H2 hierarchy;
- TOC generated from the exact same section data as visible H2s;
- BlogPosting JSON-LD;
- social image metadata;
- stable canonical route;
- useful internal links;
- no keyword stuffing;
- no filler paragraphs written only to increase word count.

Do not create multiple pages targeting effectively the same intent without differentiating their decision purpose. Legacy “Top 10/Top 20” posts should be rewritten as durable verification/comparison guides unless a current, sourced ranking is explicitly commissioned.

## 7. Accuracy / safety rules

Never invent:
- certifications;
- factory capacities;
- client counts;
- clinical results;
- test results;
- regulator approvals;
- ingredient percentages;
- guaranteed timelines;
- guaranteed medical outcomes.

Medical/skincare topics:
- cosmetics may support cleansing, moisturising, comfort or appearance; do not present cosmetics as diagnosis or medical treatment;
- inflammatory, severe, painful, scarring or persistent skin conditions should include a concise professional-care note where relevant;
- DIY articles must not encourage unsafe chemistry, non-cosmetic glue/material use, uncontrolled essential-oil use or unsafe storage;
- sunscreen SPF/UVA/water-resistance claims require appropriate finished-product testing;
- oral-care and intimate-area articles require clear use scope and conservative claims.

Natural/clean/sustainable topics:
- “natural” does not automatically mean safer, more effective or sustainable;
- sustainability claims require an evidence basis;
- avoid greenwashing.

## 8. Source-cleaning rule

When migrating legacy Bio-A content:
- use the archive for topic, historical context and useful factual prompts;
- rewrite the article;
- remove editor labels such as `CTA Section` / `Section nội dung chính`;
- remove duplicated addresses, email blocks and promotional boilerplate;
- remove unsupported “best”, “number one”, “absolute safety”, treatment or guaranteed-result claims;
- replace stale competitor rankings with verification logic unless current sourced rankings are explicitly requested;
- keep the legacy slug for URL continuity unless the owner approves migration.

## 9. Future AI workflow — mandatory

Before any Blog SEO/content change:
1. read this contract;
2. read current `bioa-blog-refine.mjs`;
3. identify whether the task is content-only or behavior/layout;
4. preserve every PASS/LOCKED Blog visual detail;
5. use the existing structured record + renderer;
6. make the smallest patch;
7. keep VI/EN paired;
8. run syntax/build/static checks;
9. update this contract only when the owner explicitly changes Blog authority;
10. commit/push only after verifying no Blog layout regression.

If an AI-generated SEO proposal conflicts with this file, **this file wins** unless the owner explicitly changes the contract.
