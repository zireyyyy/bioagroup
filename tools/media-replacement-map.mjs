// R26: owner-facing media replacement map (VI) from cms/registry.json -> docs/r26/MEDIA_REPLACEMENT_MAP.md
// One row per Studio image position, with the temporary image it shows today and what to upload.
import fs from "node:fs";
import { targetLabel } from "./cms-seed-labels.mjs";

const REG = JSON.parse(fs.readFileSync("cms/registry.json", "utf8"));
const esc = s => String(s).replace(/\|/g, "\\|");
const src = u => /^https?:\/\/merywood\.com/.test(u) ? "ảnh tạm (nguồn Merywood)" : "ảnh BIO-A trong repo";
const order = ["home", "about", "cosmetics", "services", "careers"];
const prio = (page, i) => (page === "home" && i === 0) || i === 0 ? "P1 (ảnh đầu trang)" : "P2";
const out = [
  "# Bản đồ thay ảnh BIO-A (theo từng vị trí trong Sanity Studio)", "",
  "Tạo tự động từ `cms/registry.json` bằng `node tools/media-replacement-map.mjs`.",
  "**Không cần thay trước khi nghiệm thu.** Website đang dùng ảnh tạm; bạn thay dần, từng vị trí, sau khi nghiệm thu kỹ thuật.", "",
  "**Cách thay một ảnh:** Studio https://bioagroup.sanity.studio/ → **Ảnh website** → chọn trang → chọn vị trí theo cột *Tên trong Studio*.",
  "Tiếp theo: tải ảnh JPEG/PNG/WebP → bấm bút chì để chỉnh vùng cắt và điểm lấy nét → nhập mô tả VI/EN → **Publish**.",
  "Đợi 2–4 phút rồi kiểm tra trên Preview. Khi muốn đưa lên website chính, yêu cầu một đợt **phát hành nội dung** (pinned release, xem `CMS_OWNER_GUIDE_VI.md`).", "",
  "Một vị trí có thể có nhiều khung: một ảnh tải lên được cắt riêng cho từng khung, theo đúng tỷ lệ cũ.", ""
];
let n = 0, tmp = 0;
for (const key of order){
  const p = REG.pages[key];
  if (!p?.images.length) continue;
  out.push(`## ${p.labelVi} (${p.images.length} vị trí)`, "", "| # | Tên trong Studio | Khung cắt (tỷ lệ · hiển thị) | Ảnh đang dùng | Tải lên tối thiểu | Ưu tiên |", "|---|---|---|---|---|---|");
  p.images.forEach((s, i) => {
    n++;
    const name = `Ảnh ${i + 1} — ${s.label || s.sections[0]}${s.label && s.sections[0] !== s.label ? " · " + s.sections[0] : ""}`;
    const cuts = s.targets.map(t => `${targetLabel(t)}: ${(t.natural.w / t.natural.h).toFixed(2)}:1`).join("<br>");
    const current = [...new Set(s.targets.map(t => src(t.url)))].join(" + ");
    if (/Merywood/.test(current)) tmp++;
    const rec = Math.min(2400, Math.max(...s.targets.flatMap(t => [t.natural.w, ...Object.values(t.frames || {}).map(f => f.w * 2)])));
    out.push(`| ${i + 1} | ${esc(name)} | ${cuts} | ${current} | ${rec}px ngang | ${prio(key, i)} |`);
  });
  out.push("");
}
const locked = Object.values(REG.pages).reduce((a, p) => a + (p.locked || []).length, 0);
out.push("## Không thay qua mục Ảnh website", "",
  `- ${locked} tài nguyên **bị khóa** (icon/SVG, logo BIO-A, Zalo, dấu GMP/HACCP, Header/Footer/cookie/chat): xem \`docs/CMS_IMAGE_SOURCES.md\`. Muốn mở khóa một mục cần OWNER quyết định và một lần chỉnh code.`,
  "- **Ảnh bài Blog:** mở từng bài trong mục **Blog** → *SEO & ảnh* → Ảnh đại diện.",
  "- **Ảnh thẻ việc làm:** mục **Tuyển dụng** → vị trí → Ảnh thẻ vị trí.",
  "- **Ảnh chia sẻ (Facebook/Zalo):** mục **SEO** → trang → Ảnh chia sẻ.", "",
  `**Tổng:** ${n} vị trí; ${tmp} vị trí còn ảnh tạm nguồn Merywood. Bản quyền: OWNER đã xác nhận quyền dùng tài nguyên Merywood (OD-5, 2026-11-11). Đây là quyết định của OWNER, không phải xác nhận pháp lý vĩnh viễn; nên ưu tiên thay ảnh P1.`);
fs.mkdirSync("docs/r26", { recursive: true });
fs.writeFileSync("docs/r26/MEDIA_REPLACEMENT_MAP.md", out.join("\n") + "\n");
console.log("docs/r26/MEDIA_REPLACEMENT_MAP.md", n, "positions,", tmp, "with temporary Merywood images");
