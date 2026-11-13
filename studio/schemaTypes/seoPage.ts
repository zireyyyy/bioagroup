import {SearchIcon} from '@sanity/icons/Search'
import {defineField, defineType} from 'sanity'

export const SEO_PAGES: {key: string; labelVi: string; vi: string; en: string}[] = [
  {key: 'home', labelVi: 'Trang chủ', vi: '/', en: '/en/'},
  {key: 'about', labelVi: 'Về chúng tôi', vi: '/about/', en: '/en/about/'},
  {key: 'cosmetics', labelVi: 'Gia Công Mỹ Phẩm', vi: '/contract-manufacturing-cosmetics/', en: '/en/contract-manufacturing-cosmetics/'},
  {key: 'services', labelVi: 'Dịch Vụ Khác', vi: '/dich-vu-khac/', en: '/en/dich-vu-khac/'},
  {key: 'contacts', labelVi: 'Liên hệ', vi: '/contacts/', en: '/en/contacts/'},
  {key: 'careers', labelVi: 'Tuyển dụng', vi: '/tuyen-dung/', en: '/en/careers/'},
  {key: 'blog', labelVi: 'Blog (trang danh sách)', vi: '/blog/', en: '/en/blog/'},
  {key: 'privacy', labelVi: 'Chính sách bảo mật', vi: '/privacy-policy/', en: '/en/privacy-policy/'},
  {key: 'cookie', labelVi: 'Chính sách cookie', vi: '/cookie-policy/', en: '/en/cookie-policy/'},
]

const noHtml = (Rule: any) => Rule.custom((v: unknown) => (/[<>]/.test(String(v ?? '')) ? 'Không dùng ký tự < hoặc >' : true))
// CMS-R25b: a page may only carry its OWN approved canonical (https://bioagroup.vn + its route in that language).
export const approvedCanonical = (key: string | undefined, lang: 'vi' | 'en') => {
  const p = SEO_PAGES.find((x) => x.key === key)
  return p ? 'https://bioagroup.vn' + p[lang] : null
}
const canonicalRule = (lang: 'vi' | 'en') => (Rule: any) =>
  Rule.custom((v: string | undefined, ctx: any) => {
    if (!v) return true
    const expected = approvedCanonical(ctx.document?.key, lang)
    return v === expected ? true : `Canonical của trang này chỉ có thể là ${expected} (để trống = giữ mặc định)`
  })

const block = (lang: 'vi' | 'en') =>
  defineField({
    name: lang,
    title: lang === 'vi' ? 'Tiếng Việt' : 'Tiếng Anh',
    type: 'object',
    options: {collapsible: true, collapsed: lang === 'en'},
    fields: [
      defineField({name: 'title', title: 'Tiêu đề SEO (thẻ title)', type: 'string', validation: (R) => [R.required(), R.max(120), R.max(70).warning('Google thường chỉ hiển thị khoảng 60–70 ký tự'), noHtml(R)]}),
      defineField({name: 'description', title: 'Mô tả SEO (meta description)', type: 'text', rows: 3, validation: (R) => [R.required(), R.max(300), R.max(165).warning('Google thường chỉ hiển thị khoảng 155–165 ký tự'), noHtml(R)]}),
      defineField({name: 'ogImage', title: 'Ảnh chia sẻ (Facebook/Zalo)', description: 'Khuyến nghị 1200×630. Để trống = giữ như hiện tại.', type: 'image', options: {hotspot: true, accept: 'image/jpeg,image/png,image/webp'}}),
      defineField({name: 'canonical', title: 'Canonical (nâng cao)', description: 'Để trống = giữ canonical đã duyệt của trang. Chỉ nhận đúng địa chỉ của chính trang này.', type: 'url', validation: canonicalRule(lang)}),
    ],
  })

// One singleton per page. Prefilled with the values the built pages carry today.
export const seoPage = defineType({
  name: 'seoPage',
  title: 'SEO trang',
  type: 'document',
  icon: SearchIcon,
  fields: [
    defineField({name: 'pageLabel', title: 'Trang', type: 'string', readOnly: true}),
    defineField({name: 'routes', title: 'Đường dẫn', type: 'string', readOnly: true}),
    block('vi'),
    block('en'),
    defineField({name: 'key', type: 'string', readOnly: true, hidden: true}),
  ],
  preview: {select: {title: 'pageLabel', subtitle: 'routes'}},
})
