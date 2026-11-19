// R28 VI-FIRST — the per-document translation state (written by the translator, two switches for the owner).
import {defineArrayMember, defineField} from 'sanity'
import type {DocumentBadgeComponent} from 'sanity'
import {displayStatus, isTranslatable} from '../../cms/i18n/core.mjs'
import {I18nStatusInput, STATUS_SHORT, STATUS_TONE} from '../components/I18nStatusInput'
import {I18N_AUTO_ACTIVE} from '../lib/i18nConfig'

export const EN_HINT = 'Tự động dịch từ bản tiếng Việt. Chỉ sửa khi thật cần — đoạn EN bạn sửa tay sẽ được giữ nguyên.'
export const enFieldset = {name: 'en', title: 'Bản tiếng Anh (tự động dịch — chỉ sửa khi cần)', options: {collapsible: true, collapsed: true}}
// EN may be empty while the translation is pending: a warning, never a Publish blocker.
export const enOptional = (Rule: any) => Rule.custom((v: unknown) => (v == null || (Array.isArray(v) ? v.length === 0 : !String(v).trim()) ? 'Chưa có bản EN — sẽ được dịch tự động từ bản VI' : true)).warning()

export const i18nField = (group?: string) =>
  defineField({
    name: 'i18n',
    title: 'Bản tiếng Anh',
    type: 'object',
    ...(group ? {group} : {}),
    components: {input: I18nStatusInput},
    fields: [
      defineField({name: 'status', type: 'string'}),
      defineField({name: 'lock', type: 'boolean'}),
      defineField({name: 'resyncRequest', type: 'string'}),
      defineField({name: 'viHash', type: 'string'}),
      defineField({name: 'syncedAt', type: 'string'}),
      defineField({name: 'checkedAt', type: 'string'}),
      defineField({name: 'provider', type: 'string'}),
      defineField({name: 'sourceRev', type: 'string'}),
      defineField({name: 'lastError', type: 'string'}),
      defineField({name: 'failedHash', type: 'string'}),
      defineField({name: 'failedAt', type: 'string'}),
      defineField({name: 'review', type: 'array', of: [defineArrayMember({type: 'string'})]}),
      defineField({name: 'usage', type: 'object', fields: [defineField({name: 'chars', type: 'number'}), defineField({name: 'runs', type: 'number'})]}),
      defineField({
        name: 'units',
        type: 'array',
        of: [defineArrayMember({type: 'object', name: 'i18nUnit', fields: [
          defineField({name: 'key', type: 'string'}), defineField({name: 'viHash', type: 'string'}),
          defineField({name: 'enHash', type: 'string'}), defineField({name: 'manual', type: 'boolean'}),
        ]})],
      }),
    ],
  })

export const I18nBadge: DocumentBadgeComponent = (props) => {
  const doc: any = props.draft || props.published
  if (!doc || !isTranslatable(doc._type)) return null
  const s = displayStatus(doc, {isDraft: Boolean(props.draft), autoActive: I18N_AUTO_ACTIVE})
  return {label: STATUS_SHORT[s.display], color: ({positive: 'success', caution: 'warning', critical: 'danger', primary: 'primary'} as any)[STATUS_TONE[s.display]]}
}
