import {ImageIcon} from '@sanity/icons/Image'
import {defineField, defineType} from 'sanity'
import {CurrentImage} from '../components/CurrentImage'

const altRule = (lang: 'VI' | 'EN') => (Rule: any) =>
  Rule.max(160).custom((value: string | undefined, ctx: any) => {
    const hasImage = Boolean(ctx.document?.image?.asset)
    if (hasImage && !String(value || '').trim()) return `Cần mô tả ảnh (${lang}) khi đã chọn ảnh mới`
    return true
  })

// One document per image position on the website (seeded from cms/registry.json). Editors replace the image;
// the frame (ratio, fit, size) stays the one the owner already approved.
export const imageSlot = defineType({
  name: 'imageSlot',
  title: 'Vị trí ảnh',
  type: 'document',
  icon: ImageIcon,
  fields: [
    defineField({name: 'title', title: 'Vị trí', type: 'string', readOnly: true}),
    defineField({name: 'pageLabel', title: 'Trang', type: 'string', readOnly: true}),
    defineField({name: 'section', title: 'Mục trên trang', type: 'string', readOnly: true}),
    defineField({
      name: 'currentUrl',
      title: 'Ảnh đang hiển thị trên website',
      type: 'string',
      readOnly: true,
      components: {input: CurrentImage},
    }),
    defineField({
      name: 'image',
      title: 'Ảnh mới (BIO-A)',
      description:
        'Tải ảnh lên, sau đó bấm biểu tượng bút để chọn vùng cắt và điểm lấy nét. Website tự cắt ảnh theo đúng khung hiện tại; bố cục không thay đổi. Để trống = giữ ảnh hiện tại.',
      type: 'image',
      options: {hotspot: true, accept: 'image/jpeg,image/png,image/webp,image/svg+xml'},
    }),
    defineField({name: 'altVi', title: 'Mô tả ảnh (tiếng Việt)', description: 'Đọc bởi trình đọc màn hình và Google. Ví dụ: "Dây chuyền chiết rót kem tại nhà máy Bio-A".', type: 'string', validation: altRule('VI')}),
    defineField({name: 'altEn', title: 'Mô tả ảnh (tiếng Anh)', type: 'string', validation: altRule('EN')}),
    defineField({name: 'frameInfo', title: 'Khung ảnh', type: 'string', readOnly: true, hidden: true}),
    defineField({name: 'page', type: 'string', readOnly: true, hidden: true}),
    defineField({name: 'slotId', type: 'string', readOnly: true, hidden: true}),
    defineField({name: 'order', type: 'number', readOnly: true, hidden: true}),
  ],
  orderings: [{title: 'Thứ tự trên trang', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {
    select: {title: 'title', section: 'section', image: 'image', current: 'currentUrl'},
    prepare({title, section, image, current}) {
      return {
        title,
        subtitle: (image?.asset ? '✔ Đã thay · ' : '') + (section || ''),
        media: image?.asset ? image : current ? <img src={current} alt="" style={{objectFit: 'cover'}} /> : ImageIcon,
      } as any
    },
  },
})
