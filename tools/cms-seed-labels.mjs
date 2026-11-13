// CMS-R25b: shared human labels for image targets (Studio seed text and docs/CMS_CONTENT_MAP.md).
export const targetLabel = t => {
  const ws = Object.keys(t.frames || {});
  if (!ws.length) return t.kind === "source" ? "ảnh dự phòng cho điện thoại (đang ẩn)" : "chỉ hiện khi tương tác";
  if (ws.length === 3) return "máy tính, tablet, điện thoại";
  return ws.map(w => ({ 1440: "máy tính", 834: "tablet", 390: "điện thoại" })[w]).join(", ");
};
