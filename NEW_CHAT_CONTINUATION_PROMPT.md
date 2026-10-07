# NEW CHAT CONTINUATION PROMPT — BIO-A GROUP WEBSITE

Use this prompt only for a new ChatGPT project continuation.

---

TIẾP TỤC DỰ ÁN BIO-A GROUP WEBSITE

Repository:
https://github.com/zireyyyy/bioagroup

## 1. BOOT — BẮT BUỘC

Trước khi sửa code:

1. đọc `START_HERE.md`;
2. đọc `FULL_HANDOFF.md` — ưu tiên **CURRENT STATE SNAPSHOT**, không lấy historical patch text làm current state;
3. đọc `AGENTS.md`;
4. đọc `docs/WORKFLOW.md`;
5. đọc `docs/SOURCE_MAP.md`;
6. nếu task Blog: đọc `docs/BLOG_CONTENT_CONTRACT.md`;
7. nếu đang closeout/deploy: đọc `docs/FINAL_DEPLOY_CHECKLIST.md`;
8. đọc đúng file owner của component đang sửa.

Không suy đoán từ memory nếu khác repo.

## 2. CURRENT OWNER-CONFIRMED BASELINE

Runtime-confirmed current baseline:

`76bab2b472b252f804c6022147209631cb691c81`
— SHARED-MOBILE1C — **OWNER PASS**

Nếu main có commit mới hơn nhưng chỉ là docs/handoff, runtime baseline vẫn là SHA trên cho tới khi có patch code mới được owner test.

Current candidate:
**NONE.**

Next intended runtime patch:
**Mobile bottom-nav icon artwork swap only**, nếu owner xác nhận dùng bộ icon đã gửi.

## 3. CURRENT PENDING ICON BLOCK

Bottom nav items remain:

- Trang Chủ
- Gia Công
- Dịch Vụ
- Blog
- Liên Hệ

Owner supplied a new 5-icon design:
- house;
- factory + cosmetic bottle;
- lab flask + leaf;
- document;
- support/headset person.

State treatment:
- inactive: very-light green surface + green icon;
- active: Bio-A green surface + cream icon.

IMPORTANT:
- artwork has NOT yet been integrated;
- do not redraw;
- do not redesign the bar;
- do not alter routes/labels/scroll logic;
- if the image attachment is unavailable in the new chat, ask owner to re-upload it before icon implementation.

## 4. RECENT PARTIAL COMMITS — DO NOT ROLLBACK TO THEM

- `e331acd33910faceed318928cc2b9eb557e4b2b1` — SHARED-MOBILE1 — PARTIAL.
- `8fb80a78b2c60e1e640851ca18c573ef22123af8` — SHARED-MOBILE1A — PARTIAL.
- `26f2fdc665c014c17093b6b36f8469c5ea2c1265` — SHARED-MOBILE1B — PARTIAL.

Rollback before the next icon patch:
`76bab2b472b252f804c6022147209631cb691c81`.

## 5. PASS / FROZEN

- Blog PATCH-G8 — OWNER PASS / LOCKED.
- 38 Blog articles + 7/page pagination contract — LOCKED.
- Blog detail Merywood rich layout — LOCKED.
- Contacts CONTACT-C1 — OWNER PASS.
- exact Bio-A company/map/contact payload — LOCKED.
- Cookie:
  - outside tap can dismiss without saving;
  - gear remains if undecided;
  - gear hides after confirmed choice.
- Mobile Menu:
  - first tap must work;
  - outside/scroll/Escape close remains.
- Mobile bottom nav:
  - scroll down hides fully;
  - scroll up shows;
  - Chat/Cookie collision clearance PASS.
- Header/Footer/Chat/Zalo shared ownership.
- Home accepted sections unless explicitly reopened.

## 6. ARCHITECTURE / OWNER

Merywood = visual + runtime source-of-truth.

Bio-A legacy ZIP/database = content source only where documented.

Owner files:

GLOBAL:
- `bioa-transform.mjs` — global transform + cookie presentation/state integration.
- shared portion of `bioa-home-refine.mjs` — Header/Footer/Mobile Menu/Chat/Mobile Bottom Nav/shared shell.

ROUTE:
- Home: `bioa-home-refine.mjs`
- About: `bioa-about-refine.mjs`
- Cosmetics: `bioa-cosmetics-refine.mjs`
- Other Services: `bioa-services-refine.mjs`
- Blog: `bioa-blog-refine.mjs`
- Contacts: `bioa-contacts-refine.mjs`

BUILD:
- `build.mjs`

Do not duplicate shared shell inside routes.

## 7. CSS / JS CLASSIFICATION — MANDATORY

Before any edit classify the change:

- GLOBAL
- ROUTE
- COMPONENT

Fix at the correct authority layer.

Before patch, resolve:
1. current surface/block;
2. owner file/function;
3. matching Merywood source;
4. adjacent PASS/FROZEN areas;
5. Desktop/Tablet/Mobile blast radius.

## 8. HOME RULE

Home changes are **one section at a time**.

Do not refactor or reread/rewrite unrelated Home blocks for a small request.
Use exact Merywood counterpart and preserve all other PASS sections.

## 9. ADAPTIVE BIO-A SHELL

Desktop / Tablet / Mobile are independent regression surfaces.

Tablet must NOT inherit Mobile assumptions.

Mobile current behavior:
- bottom nav <=768px only;
- down scroll hides Header + bottom nav;
- up scroll restores;
- Mobile Menu opening forces Header visible and hides bottom nav;
- Chat/Cookie stay clear of visible bottom bar.

## 10. FONT AUTHORITY

Primary Bio-A UI/body font stack:

`Manrope, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif`

Do not introduce a new font authority.
Do not use global font changes to solve local wrapping.
Preserve source typography mechanics unless explicitly reopened.

## 11. HOSTING / CLOUDFLARE RULE

GitHub is application source-of-truth.

Direct hosting/Cloudflare edits are allowed only when that deployment layer is the correct owner.

Any direct hosting edit must be backported/documented in repo/handoff before PASS.

Do not use hosting to repair normal UI/component code.

## 12. CLOSEOUT ORDER

After the pending icon/small patches:

1. FULL TABLET PASS;
2. cleanup/hardening;
3. production package;
4. custom-domain deploy;
5. final Desktop/Tablet/Mobile smoke test.

Do not mix Tablet repair with broad cleanup.

## 13. NEXT TEST

If owner approves the new icons:
- replace artwork only;
- verify inactive/active state;
- verify optical centering and equal visual mass;
- test iPhone/small Android widths;
- verify bottom bar full-hide on down scroll;
- verify up-scroll restore;
- verify first-tap Mobile Menu;
- verify Chat/Cookie clearance;
- verify labels remain unclipped.

## 14. ABSOLUTELY DO NOT AUTO-CHANGE

Do not:
- redesign;
- replace Merywood working mechanics;
- reopen Blog/Contacts;
- alter Home unrelated sections;
- change global typography;
- change bottom-nav routes/labels/layout during icon swap;
- add features not requested;
- invent company data;
- use stale historical handoff text as current status.

## 15. WORKFLOW RESPONSE

For each owner request:

1. inspect exact owner/source;
2. identify root cause;
3. patch only requested scope;
4. update handoff if authority/behavior changes;
5. commit;
6. push main;
7. return:
   - patch name;
   - commit SHA;
   - changed scope;
   - protected scope;
   - PENDING TEST or PASS.

Do not stop at explanation if GitHub connector is available.

---

