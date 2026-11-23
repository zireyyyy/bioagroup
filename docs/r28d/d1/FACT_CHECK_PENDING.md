# R28d-D1 — Factory facts still pending (release blockers before public launch)

**Owner decision 23/11/2026:**
- The VI text is temporarily PASS and frozen.
- The items below were **not** changed in D1. The VI was not changed, and the EN was **not** raised to the VI claim nor reduced from what it says now.
- They stay **OWNER FACT CHECK** (questions in `docs/r28d/OWNER_FACTORY_FACT_CHECK.md` §B).
- Each item **blocks a public launch** until resolved.

| ID | Where | VI shows | EN shows | Parity status | Needs |
|---|---|---|---|---|---|
| D-10 | Cosmetics intro | "…tại Việt Nam, đạt chuẩn GMP Bộ Y Tế; …" | no GMP | EN deliberately weaker (unverified certification is not copied into EN) | B1 certificate |
| D-10 | Cosmetics card "GMP Bộ Y Tế Việt Nam" | "Bio-A Group đạt chuẩn GMP Bộ Y Tế…" | "operates to GMP requirements recorded in the legacy Bio-A source…" | **Developer wording visible**; must change once B1 is answered | B1 |
| D-10 / D-11 | About value "An Toàn & Tuân Thủ" | "…nội dung nguồn Bio-A ghi nhận năng lực GMP và HACCP." | "…the legacy Bio-A source records GMP and HACCP capabilities." | **Developer wording visible in both languages** | B1, B2 |
| D-11 | Cosmetics HACCP card | food-safety system | food-safety system | equal | B2 |
| D-12 | Home + About hero | 2.000+ / 5+ năm / 10.000.000 / 1.000 m² | same figures | equal | B3 |
| D-13 | Menus, About, Cosmetics, SEO, chatbot | Mẹ & Bé | Mother & Baby | equal (chatbot withholds it) | B4 |
| D-14 | Cosmetics testing | Kiểm nghiệm… kim loại nặng, vi sinh | Testing… heavy metals, microbiology | equal | B5 |
| D-15 | Other Services | "Đăng Ký Thương Hiệu & Công Bố" | "Trademark & Product Notification Support" | EN weaker ("support") | B6 |
| D-16 | Home H1, Contacts H1, Privacy (LEGAL) | Nhà Máy Sản Xuất Dược Mỹ Phẩm | 3 EN trade-name variants | inconsistent | B7 (legal change approved separately) |
| D-22 | Home / Cosmetics packaging and product forms | listed | listed | equal | B8 |

**Rule for later:**
- When the Owner answers, fix the **VI first**, then the EN from that VI, in the same patch.
- Update `tests/r28d-content-baseline.json` only in that patch. The content guard fails if a claim is added without a baseline change.
