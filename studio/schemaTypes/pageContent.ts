import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {defineField, defineType} from 'sanity'
import {REGISTRY, TEXT_PAGE_KEYS, pageDocType, type TextSlot} from '../lib/registry'

const short = (s: string, n = 64) => {
  const one = s.replace(/\n/g, ' / ')
  return one.length > n ? one.slice(0, n - 1) + '…' : one
}

function localeField(slot: TextSlot, lang: 'vi' | 'en') {
  const max = lang === 'vi' ? slot.maxVi : slot.maxEn
  const original = lang === 'vi' ? slot.vi : slot.en
  return defineField({
    name: lang,
    title: lang === 'vi' ? 'Tiếng Việt' : 'Tiếng Anh',
    type: slot.multiline ? 'text' : 'string',
    ...(slot.multiline ? {rows: Math.min(6, original.split('\n').length + 1)} : {}),
    description: `Tối đa ${max} ký tự.${slot.multiline ? ' Mỗi dòng xuống hàng ở đây là một lần xuống dòng trên website.' : ''} Bản gốc: “${original.replace(/\n/g, ' / ')}”`,
    validation: (Rule: any) => [
      Rule.max(max).error(`Dài hơn khung đã duyệt (${max} ký tự). Hãy rút gọn.`),
      Rule.custom((v: string | undefined) => (String(v ?? '').trim() ? true : 'Để trống: website dùng lại nội dung gốc')).warning(),
      Rule.custom((v: string | undefined) => (/[<>]/.test(String(v ?? '')) ? 'Không dùng ký tự < hoặc > (không nhận mã HTML)' : true)),
    ],
  })
}

// One singleton per page. Each field is one text the page already shows (VI + EN pair); the layout is fixed.
export const pageContentTypes = TEXT_PAGE_KEYS.map((key) => {
  const page = REGISTRY.pages[key]
  const sectionNames: string[] = []
  for (const t of page.texts) if (!sectionNames.includes(t.sections[0])) sectionNames.push(t.sections[0])
  return defineType({
    name: pageDocType(key),
    title: 'Nội dung trang: ' + page.labelVi,
    type: 'document',
    icon: DocumentTextIcon,
    fieldsets: sectionNames.map((s, i) => ({name: 's' + i, title: s, options: {collapsible: true, collapsed: i > 0}})),
    fields: [
      defineField({name: 'pageLabel', title: 'Trang', type: 'string', readOnly: true}),
      ...page.texts.map((slot) =>
        defineField({
          name: slot.id,
          title: short(slot.vi),
          description: slot.occurrences > 1 ? `Đoạn này xuất hiện ${slot.occurrences} lần trên trang (bản máy tính và điện thoại); sửa một lần cho tất cả.` : undefined,
          type: 'object',
          fieldset: 's' + sectionNames.indexOf(slot.sections[0]),
          options: {columns: 1},
          fields: [localeField(slot, 'vi'), localeField(slot, 'en')],
        }),
      ),
    ],
    preview: {select: {title: 'pageLabel'}, prepare: ({title}) => ({title: title || page.labelVi, subtitle: `${page.texts.length} đoạn nội dung`})},
  })
})
