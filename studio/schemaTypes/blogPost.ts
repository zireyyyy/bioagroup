import {DocumentsIcon} from '@sanity/icons/Documents'
import {defineArrayMember, defineField, defineType} from 'sanity'

const noHtml = (Rule: any) =>
  Rule.custom((v: unknown) => (/[<>]/.test(JSON.stringify(v ?? '')) ? 'Không dùng ký tự < hoặc > (không nhận mã HTML)' : true))
const paragraphs = (name: string, title: string, required = false, group?: string) =>
  defineField({
    name,
    title,
    type: 'array',
    ...(group ? {group} : {}),
    of: [defineArrayMember({type: 'text', rows: 4})],
    validation: (Rule: any) => [noHtml(Rule), ...(required ? [Rule.required().min(1).error('Cần ít nhất 1 đoạn')] : [])],
  })
const bullets = (name: string, title: string) =>
  defineField({name, title, type: 'array', of: [defineArrayMember({type: 'string'})], validation: (Rule: any) => [noHtml(Rule), Rule.max(12)]})

// Same data as the approved Blog detail template (bioa-blog-refine.mjs): intro, numbered H2 sections with
// paragraphs and an optional bullet list, a closing note. The website renders it with the existing components.
export const blogPost = defineType({
  name: 'blogPost',
  title: 'Bài viết Blog',
  type: 'document',
  icon: DocumentsIcon,
  groups: [
    {name: 'content', title: 'Nội dung', default: true},
    {name: 'seo', title: 'SEO & ảnh'},
    {name: 'admin', title: 'Quản trị'},
  ],
  fields: [
    defineField({name: 'titleVi', title: 'Tiêu đề (VI)', type: 'string', group: 'content', validation: (R) => [R.required(), R.max(110), noHtml(R)]}),
    defineField({name: 'titleEn', title: 'Tiêu đề (EN)', type: 'string', group: 'content', validation: (R) => [R.required(), R.max(110), noHtml(R)]}),
    defineField({
      name: 'slug',
      title: 'Đường dẫn (URL)',
      description:
        'Dùng cho cả /blog/<đường-dẫn>/ và /en/blog/<đường-dẫn>/. Bài đã có trên website giữ nguyên đường dẫn (không sửa được).',
      type: 'slug',
      group: 'content',
      readOnly: ({document}) => Boolean((document as any)?.legacyId),
      options: {source: 'titleVi', maxLength: 96},
      validation: (R) =>
        R.required().custom((v: any) =>
          /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(v?.current || '') ? true : 'Chỉ dùng chữ thường không dấu, số và dấu gạch ngang',
        ),
    }),
    defineField({name: 'date', title: 'Ngày đăng', type: 'date', group: 'content', options: {dateFormat: 'DD.MM.YYYY'}, validation: (R) => R.required()}),
    defineField({name: 'readMin', title: 'Thời gian đọc (phút)', type: 'number', group: 'content', validation: (R) => R.required().integer().min(1).max(60)}),
    defineField({name: 'excerptVi', title: 'Tóm tắt (VI) — cũng là mô tả SEO', type: 'text', rows: 3, group: 'content', validation: (R) => [R.required(), R.max(200), noHtml(R)]}),
    defineField({name: 'excerptEn', title: 'Tóm tắt (EN) — cũng là mô tả SEO', type: 'text', rows: 3, group: 'content', validation: (R) => [R.required(), R.max(200), noHtml(R)]}),
    paragraphs('introVi', 'Mở bài (VI)', true, 'content'),
    paragraphs('introEn', 'Mở bài (EN)', true, 'content'),
    defineField({
      name: 'sections',
      title: 'Các mục (mỗi mục là một tiêu đề trong mục lục)',
      type: 'array',
      group: 'content',
      validation: (R) => R.required().min(2).max(14),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'blogSection',
          title: 'Mục',
          fields: [
            defineField({name: 'headingVi', title: 'Tiêu đề mục (VI)', type: 'string', validation: (R) => [R.required(), R.max(90), noHtml(R)]}),
            defineField({name: 'headingEn', title: 'Tiêu đề mục (EN)', type: 'string', validation: (R) => [R.required(), R.max(90), noHtml(R)]}),
            paragraphs('paragraphsVi', 'Đoạn văn (VI)', true),
            paragraphs('paragraphsEn', 'Đoạn văn (EN)', true),
            bullets('bulletsVi', 'Gạch đầu dòng (VI, không bắt buộc)'),
            bullets('bulletsEn', 'Gạch đầu dòng (EN, không bắt buộc)'),
            defineField({name: 'anchor', title: 'Mã neo mục lục (giữ nguyên với bài cũ)', type: 'string', readOnly: true, hidden: ({value}) => !value}),
          ],
          preview: {select: {title: 'headingVi', subtitle: 'headingEn'}},
        }),
      ],
    }),
    defineField({name: 'noteVi', title: 'Ghi chú cuối bài (VI)', type: 'text', rows: 3, group: 'content', validation: (R) => [R.max(400), noHtml(R)]}),
    defineField({name: 'noteEn', title: 'Ghi chú cuối bài (EN)', type: 'text', rows: 3, group: 'content', validation: (R) => [R.max(400), noHtml(R)]}),
    defineField({
      name: 'seoTitleVi',
      title: 'Tiêu đề SEO (VI)',
      description: 'Để trống = dùng tiêu đề bài. Website tự thêm “| Bio-A Group”.',
      type: 'string',
      group: 'seo',
      validation: (R) => [R.max(70).warning('Google thường chỉ hiển thị khoảng 60–70 ký tự'), noHtml(R)],
    }),
    defineField({name: 'seoTitleEn', title: 'Tiêu đề SEO (EN)', type: 'string', group: 'seo', validation: (R) => [R.max(70).warning('Google thường chỉ hiển thị khoảng 60–70 ký tự'), noHtml(R)]}),
    defineField({
      name: 'image',
      title: 'Ảnh đại diện',
      description: 'Dùng ở danh sách Blog, đầu bài viết và khi chia sẻ (Facebook/Zalo). Với bài cũ, để trống = giữ ảnh hiện tại.',
      type: 'image',
      group: 'seo',
      options: {hotspot: true, accept: 'image/jpeg,image/png,image/webp'},
      validation: (R) => R.custom((v: any, ctx: any) => (v?.asset || ctx.document?.legacyImage ? true : 'Bài mới cần ảnh đại diện')),
    }),
    defineField({name: 'legacyImage', title: 'Ảnh hiện tại trên website', type: 'string', group: 'seo', readOnly: true, hidden: ({document}) => !(document as any)?.legacyImage}),
    defineField({
      name: 'category',
      title: 'Danh mục (nội bộ)',
      description:
        'Chỉ để sắp xếp trong CMS. Website hiện không có giao diện danh mục; hiển thị danh mục là một thành phần mới cần OWNER duyệt.',
      type: 'string',
      group: 'admin',
      options: {
        list: [
          {title: 'Gia công mỹ phẩm', value: 'manufacturing'},
          {title: 'Công thức & nguyên liệu', value: 'formulation'},
          {title: 'Chăm sóc da & làm đẹp', value: 'skincare'},
          {title: 'Bao bì', value: 'packaging'},
          {title: 'Thương hiệu & kinh doanh', value: 'business'},
        ],
      },
    }),
    defineField({name: 'legacyId', title: 'Mã bài gốc', type: 'number', group: 'admin', readOnly: true, hidden: ({document}) => !(document as any)?.legacyId}),
    defineField({name: 'order', title: 'Thứ tự gốc', type: 'number', group: 'admin', readOnly: true, hidden: true}),
  ],
  orderings: [{title: 'Ngày đăng (mới nhất)', name: 'dateDesc', by: [{field: 'date', direction: 'desc'}]}],
  preview: {
    select: {title: 'titleVi', date: 'date', image: 'image'},
    prepare: ({title, date, image}) => ({
      title,
      subtitle: date ? String(date).split('-').reverse().join('.') : 'Chưa có ngày',
      media: image?.asset ? image : DocumentsIcon,
    }),
  },
})
