import {CaseIcon} from '@sanity/icons/Case'
import {defineArrayMember, defineField, defineType} from 'sanity'

const noHtml = (Rule: any) =>
  Rule.custom((v: unknown) => (/[<>]/.test(JSON.stringify(v ?? '')) ? 'Không dùng ký tự < hoặc > (không nhận mã HTML)' : true))
const list = (name: string, title: string, group: string) =>
  defineField({
    name,
    title,
    type: 'array',
    group,
    of: [defineArrayMember({type: 'text', rows: 2})],
    validation: (R: any) => [R.required().min(1).max(10), noHtml(R)],
  })

// Official details are owner-gated: a role is only "Đang tuyển" when pay/benefits, place/work type and the
// application channel are filled in. "Mẫu" keeps today's neutral texts (nothing invented).
const officialRequired = (Rule: any) =>
  Rule.custom((v: string | undefined, ctx: any) =>
    ctx.document?.status === 'open' && !String(v || '').trim() ? 'Bắt buộc khi trạng thái là “Đang tuyển”' : true,
  )

const localized = (lang: 'vi' | 'en') => {
  const L = lang === 'vi' ? 'VI' : 'EN'
  return [
    defineField({name: 'title' + L, title: `Tên vị trí (${L})`, type: 'string', group: lang, validation: (R) => [R.required(), R.max(70), noHtml(R)]}),
    defineField({name: 'desc' + L, title: `Mô tả ngắn trên thẻ (${L})`, type: 'text', rows: 3, group: lang, validation: (R) => [R.required(), R.max(200), noHtml(R)]}),
    list('intro' + L, `Giới thiệu (${L})`, lang),
    list('duties' + L, `Mô tả công việc (${L})`, lang),
    list('reqs' + L, `Yêu cầu (${L})`, lang),
    defineField({name: 'badge' + L, title: `Hình thức · Địa điểm (${L})`, description: 'Ví dụ: Toàn thời gian · TP. Hồ Chí Minh', type: 'string', group: 'official', validation: (R) => [R.max(60), noHtml(R), officialRequired(R)]}),
    defineField({name: 'benefits' + L, title: `Quyền lợi (${L})`, type: 'text', rows: 4, group: 'official', validation: (R) => [R.max(600), noHtml(R), officialRequired(R)]}),
    defineField({name: 'place' + L, title: `Địa điểm & hình thức làm việc (${L})`, type: 'text', rows: 3, group: 'official', validation: (R) => [R.max(400), noHtml(R), officialRequired(R)]}),
    defineField({name: 'apply' + L, title: `Cách ứng tuyển (${L})`, type: 'text', rows: 3, group: 'official', validation: (R) => [R.max(400), noHtml(R), officialRequired(R)]}),
  ]
}

export const career = defineType({
  name: 'career',
  title: 'Vị trí tuyển dụng',
  type: 'document',
  icon: CaseIcon,
  groups: [
    {name: 'main', title: 'Chung', default: true},
    {name: 'vi', title: 'Tiếng Việt'},
    {name: 'en', title: 'Tiếng Anh'},
    {name: 'official', title: 'Thông tin chính thức'},
  ],
  fields: [
    defineField({
      name: 'status',
      title: 'Trạng thái',
      description:
        'Nháp: không hiển thị. Mẫu: hiển thị như hiện nay, phần chế độ/địa điểm/ứng tuyển ghi “đang cập nhật”. Đang tuyển: công bố chính thức (cần điền tab “Thông tin chính thức”). Ngừng tuyển: ẩn khỏi danh sách, trang chi tiết ghi “Đã ngừng tuyển”.',
      type: 'string',
      group: 'main',
      initialValue: 'draft',
      options: {
        layout: 'radio',
        list: [
          {title: 'Nháp (không hiển thị)', value: 'draft'},
          {title: 'Mẫu (hiển thị, chi tiết chờ duyệt)', value: 'sample'},
          {title: 'Đang tuyển (công bố chính thức)', value: 'open'},
          {title: 'Ngừng tuyển', value: 'closed'},
        ],
      },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'category',
      title: 'Nhóm vị trí (bộ lọc trên trang)',
      type: 'string',
      group: 'main',
      options: {list: [{title: 'Kinh doanh', value: 'sales'}, {title: 'R&D', value: 'rd'}, {title: 'Sản xuất', value: 'production'}]},
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'slugEn',
      title: 'Đường dẫn tiếng Anh',
      description: 'Trang: /en/careers/<đường-dẫn>/. Vị trí đã có giữ nguyên đường dẫn.',
      type: 'slug',
      group: 'main',
      readOnly: ({document}) => Boolean((document as any)?.legacyRoute),
      options: {source: 'titleEN', maxLength: 64},
      validation: (R) => R.required().custom((v: any) => (/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(v?.current || '') ? true : 'Chỉ dùng chữ thường không dấu, số và dấu gạch ngang')),
    }),
    defineField({
      name: 'slugVi',
      title: 'Đường dẫn tiếng Việt',
      description: 'Trang: /tuyen-dung/<đường-dẫn>/.',
      type: 'slug',
      group: 'main',
      readOnly: ({document}) => Boolean((document as any)?.legacyRoute),
      options: {source: 'titleVI', maxLength: 64},
      validation: (R) => R.required().custom((v: any) => (/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(v?.current || '') ? true : 'Chỉ dùng chữ thường không dấu, số và dấu gạch ngang')),
    }),
    defineField({
      name: 'image',
      title: 'Ảnh thẻ vị trí',
      description: 'Khung ảnh trên thẻ khoảng 3:2. Với vị trí cũ, để trống = giữ ảnh hiện tại.',
      type: 'image',
      group: 'main',
      options: {hotspot: true, accept: 'image/jpeg,image/png,image/webp'},
      validation: (R) => R.custom((v: any, ctx: any) => (v?.asset || ctx.document?.legacyImage ? true : 'Vị trí mới cần ảnh')),
    }),
    defineField({name: 'legacyImage', title: 'Ảnh hiện tại', type: 'string', group: 'main', readOnly: true, hidden: ({document}) => !(document as any)?.legacyImage}),
    defineField({name: 'order', title: 'Thứ tự hiển thị', description: 'Số nhỏ hiển thị trước.', type: 'number', group: 'main', initialValue: 10, validation: (R) => R.integer().min(0).max(999)}),
    ...localized('vi'),
    ...localized('en'),
    defineField({name: 'legacyRoute', type: 'string', readOnly: true, hidden: true}),
  ],
  orderings: [{title: 'Thứ tự hiển thị', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {
    select: {title: 'titleVI', status: 'status', image: 'image'},
    prepare: ({title, status, image}) => ({
      title,
      subtitle: ({draft: 'Nháp', sample: 'Mẫu', open: 'Đang tuyển', closed: 'Ngừng tuyển'} as Record<string, string>)[status] || status,
      media: image?.asset ? image : CaseIcon,
    }),
  },
})
