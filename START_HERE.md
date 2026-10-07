# BIO-A GROUP — START HERE

Status: **CURRENT PROJECT STATE**
Updated: 2026-10-08

## Current runtime state

Production-confirmed runtime baseline:
`65152e5fad8799fea36bcf3e03c9a9acf7f600ce`
— **MOBILE-HEADER-SOURCE1 — OWNER PASS**

Owner confirmed Mobile Header parity PASS.

Current candidate:
**CONSULT-POPUP-COLOR1 — Bio-A Green Consultation Popup**
— **PENDING OWNER TEST**

## Current block

Consultation popup.

Current candidate changes only:
- `#get-a-quote .cf-modal` background -> Bio-A primary green `#106E45`.

No form fields or lead-capture logic are changed yet.

## Lead-form finding

Current source form contains:
- name;
- email;
- phone;
- product type;
- expected quantity;
- request/message;
- privacy consent.

Current capture script waits for five fields:
`your-name`, `your-email`, `your-phone`, `your-product-type`, `your-request`.

Capture endpoint is already Bio-A:
`https://bioagroup.vn/wp-admin/admin-ajax.php`
action: `cf7lt_capture`.

Recommended next candidate after color PASS:
**LEAD-FORM-SHORT1**
- required: Họ tên + SĐT/Zalo;
- optional quick context: Loại sản phẩm;
- keep privacy consent compact;
- remove Email / Số lượng / Request from first-step UI;
- update capture condition together with the UI, never hide fields without fixing capture logic.

## PASS / FROZEN

- MOBILE-HEADER-SOURCE1.
- MOBILE-MENU-CONTRAST1.
- Mobile bottom bar remains PAUSED.
- Cookie behavior.
- Mobile Menu internals/runtime.
- Header down-hide/up-show.
- Blog PATCH-G8.
- Contacts CONTACT-C1.
- shared Footer/Chat/Zalo.
- accepted Home sections.

## Next test

1. popup background matches Bio-A logo green;
2. text/input/dropdown/close control remain readable;
3. Desktop/Tablet/Mobile popup geometry unchanged.

Then owner decides whether to proceed with LEAD-FORM-SHORT1.
