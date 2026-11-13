import {LockIcon} from '@sanity/icons/Lock'
import {defineArrayMember, defineField, defineType} from 'sanity'

// Rich text limited to paragraphs + links (e-mail, phone, internal pages). No headings, styles, images or HTML.
const body = defineField({
  name: 'body',
  title: 'Nội dung (mỗi đoạn là một điều khoản)',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [{title: 'Đoạn văn', value: 'normal'}],
      lists: [],
      marks: {
        decorators: [],
        annotations: [
          defineArrayMember({
            name: 'link',
            title: 'Liên kết',
            type: 'object',
            fields: [
              defineField({
                name: 'href',
                title: 'Địa chỉ',
                description: 'mailto:..., tel:... hoặc trang trong website (ví dụ /cookie-policy/).',
                type: 'string',
                validation: (R) =>
                  R.required().custom((v: string | undefined) =>
                    /^(mailto:[^\s<>"]+|tel:\+?[0-9 .-]+|\/(?:[a-z0-9-]+\/)*)$/.test(v || '') ? true : 'Chỉ nhận mailto:, tel: hoặc đường dẫn nội bộ bắt đầu bằng /',
                  ),
              }),
            ],
          }),
        ],
      },
    }),
  ],
  validation: (R) => R.required().min(1),
})

const sections = (lang: 'vi' | 'en') =>
  defineField({
    name: 'sections' + (lang === 'vi' ? 'Vi' : 'En'),
    title: lang === 'vi' ? 'Các mục (VI)' : 'Các mục (EN)',
    type: 'array',
    group: lang,
    validation: (R) => R.required().min(1).max(20),
    of: [
      defineArrayMember({
        type: 'object',
        name: 'legalSection',
        fields: [defineField({name: 'heading', title: 'Tiêu đề mục', type: 'string', validation: (R) => R.required().max(120)}), body],
        preview: {select: {title: 'heading'}},
      }),
    ],
  })

// Privacy / Cookie. Publishing is gated by the "Duyệt & xuất bản" action (actions/legalApprove.tsx), which stamps
// who approved it and when; the website build ignores a legal document without a matching approval stamp.
export const legalPage = defineType({
  name: 'legalPage',
  title: 'Trang pháp lý',
  type: 'document',
  icon: LockIcon,
  groups: [
    {name: 'vi', title: 'Tiếng Việt', default: true},
    {name: 'en', title: 'Tiếng Anh'},
    {name: 'approval', title: 'Phê duyệt'},
  ],
  fields: [
    defineField({name: 'pageLabel', title: 'Trang', type: 'string', readOnly: true, group: 'vi'}),
    defineField({name: 'titleVi', title: 'Tiêu đề (VI)', type: 'string', group: 'vi', validation: (R) => R.required().max(80)}),
    defineField({name: 'updatedVi', title: 'Dòng “Cập nhật lần cuối” (VI)', type: 'string', group: 'vi', validation: (R) => R.required().max(80)}),
    sections('vi'),
    defineField({name: 'titleEn', title: 'Title (EN)', type: 'string', group: 'en', validation: (R) => R.required().max(80)}),
    defineField({name: 'updatedEn', title: '“Last updated” line (EN)', type: 'string', group: 'en', validation: (R) => R.required().max(80)}),
    sections('en'),
    defineField({
      name: 'approval',
      title: 'Phê duyệt xuất bản',
      description: 'Được ghi tự động khi bấm “Duyệt & xuất bản”. Website chỉ dùng nội dung pháp lý đã được duyệt.',
      type: 'object',
      group: 'approval',
      readOnly: true,
      fields: [
        defineField({name: 'approvedBy', title: 'Người duyệt', type: 'string'}),
        defineField({name: 'approvedAt', title: 'Thời điểm duyệt', type: 'datetime'}),
        defineField({name: 'confirmed', title: 'Đã xác nhận', type: 'boolean'}),
      ],
    }),
    defineField({name: 'key', type: 'string', readOnly: true, hidden: true}),
  ],
  preview: {select: {title: 'pageLabel', by: 'approval.approvedBy', at: 'approval.approvedAt'}, prepare: ({title, by, at}) => ({title, subtitle: by ? `Duyệt bởi ${by} · ${String(at || '').slice(0, 10)}` : 'Chưa duyệt qua CMS'})},
})
