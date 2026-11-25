// R28 VI-FIRST — BIO-A VI→EN terminology. Sent to the translation provider with every request; `strict` terms are
// also checked after translation (a miss sets REVIEW_REQUIRED, the EN is kept). Add terms here, not in prompts.
export const GLOSSARY = [
  { vi: "gia công mỹ phẩm", en: "contract cosmetic manufacturing", strict: false },
  { vi: "gia công trọn gói", en: "turnkey manufacturing", strict: false },
  { vi: "dược mỹ phẩm", en: "cosmeceutical", strict: true },
  { vi: "nhà máy", en: "factory", strict: false },
  { vi: "công bố mỹ phẩm", en: "cosmetic product notification", strict: false },
  { vi: "phiếu công bố", en: "product notification", strict: false },
  { vi: "kiểm nghiệm", en: "testing", strict: false },
  { vi: "độ ổn định", en: "stability", strict: false },
  { vi: "mẫu thử", en: "sample", strict: false },
  { vi: "làm mẫu", en: "sampling", strict: false },
  { vi: "công thức", en: "formula", strict: false },
  { vi: "nguyên liệu", en: "raw materials", strict: false },
  { vi: "bao bì", en: "packaging", strict: false },
  { vi: "chiết rót", en: "filling", strict: false },
  { vi: "sang chiết", en: "repacking", strict: false },
  { vi: "số lượng đặt hàng tối thiểu", en: "minimum order quantity (MOQ)", strict: false },
  { vi: "thương hiệu", en: "brand", strict: false },
  { vi: "đăng ký nhãn hiệu", en: "trademark registration", strict: false },
  { vi: "kem chống nắng", en: "sunscreen", strict: true },
  { vi: "tẩy tế bào chết", en: "exfoliation", strict: false },
  { vi: "da nhạy cảm", en: "sensitive skin", strict: false },
  { vi: "bác sĩ da liễu", en: "dermatologist", strict: true },
  { vi: "Dịch Vụ Khác", en: "Other Services", strict: false },
  { vi: "Liên Hệ", en: "Contact", strict: false },
];

// Rules given to a language-model provider. Mirrors docs/BLOG_CONTENT_CONTRACT.md and the R28 owner prompt.
export const TRANSLATION_RULES = [
  "Translate Vietnamese website copy of BIO-A Group (cosmetic contract manufacturing, B2B) into natural, professional British-neutral English.",
  "Translate meaning, not word by word. Keep the same structure: one output string per input string, same order.",
  "Never add or remove facts, numbers, certifications, capacities, clients, guarantees, medical or efficacy claims.",
  "Keep placeholders like ⟦0⟧ exactly as they are (they stand for names, codes and links).",
  "Keep BIO-A Group, OEM/ODM, R&D, ISO codes and product names unchanged.",
  "Plain text only: no HTML, no Markdown, no quotes around the output.",
  "Use the glossary terms when the Vietnamese term appears.",
];
