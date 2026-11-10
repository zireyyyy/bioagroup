// Canonical BIO-A business identity — the single source for Header/Footer, Contacts, SEO
// (JSON-LD), quote/lead copy and the chat gateway. Every value below already appeared in
// owner-approved BIO-A surfaces; nothing here is invented. Fields the owner has not yet
// supplied are listed in OWNER_DECISIONS and must NOT be filled with guesses
// (see docs/BUSINESS_IDENTITY.md).
export const BUSINESS = Object.freeze({
  brand: 'Bio-A Group',
  domain: 'https://bioagroup.vn',
  tradeNameVi: 'Nhà Máy Sản Xuất Dược Mỹ Phẩm Bio-A Group',
  tradeNameEn: 'Bio-A Group Pharmaceutical & Cosmetic Manufacturing Factory',
  email: 'contact@bioagroup.vn',
  phone: '0779 399 379',
  phoneRaw: '0779399379',
  phoneIntl: '+84 779 399 379',
  phoneHref: 'tel:+84779399379',
  taxId: '0318126597',
  addressVi: '496/63/10H Dương Quảng Hàm, An Nhơn, Hồ Chí Minh, Việt Nam',
  addressEn: '496/63/10H Duong Quang Ham, An Nhon, Ho Chi Minh City, Vietnam',
  streetAddress: '496/63/10H Dương Quảng Hàm',
  locality: 'Hồ Chí Minh',
  country: 'VN',
  hoursVi: 'Thứ 2 – Thứ 7 · 08:30 – 17:30',
  whatsapp: 'https://wa.me/84779399379',
  zalo: 'https://zalo.me/84779399379',
  facebook: 'https://www.facebook.com/nhamaysanxuatduocmypham.BioA',
  telegram: 'https://t.me/bioagroup'
});

// Not present in any approved source: owner must supply before the legal pages can be published.
export const OWNER_DECISIONS = Object.freeze([
  'legalEntityName',      // full registered company name (VI/EN) for Privacy/Cookie/Terms
  'registeredAddress',    // registered office if different from the factory address
  'dataControllerContact', // privacy contact / DPO e-mail for data-subject requests
  'cookieInventory',      // cookies/third parties actually used and their legal basis
  'shippingPolicy',       // content or removal of the Shipping Policy link
  'careersContent'        // real openings or hide/remove Careers
]);
