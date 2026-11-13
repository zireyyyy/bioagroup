import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {LegalApproveAction} from './actions/legalApprove'
import {CREATABLE_TYPES, FIXED_TYPES, schemaTypes} from './schemaTypes'
import {structure} from './structure'

// BIO-A Group content studio. The website is a static build: published content reaches the Preview site after
// the automatic rebuild; Production changes only after the owner approves a release (docs/CMS_SANITY_R25.md).
export default defineConfig({
  name: 'bioagroup',
  title: 'BIO-A Group CMS',
  projectId: 'hfmu7ifg',
  dataset: 'production',
  plugins: [structureTool({structure, title: 'Nội dung'})],
  schema: {
    types: schemaTypes,
    templates: (prev) => prev.filter((t) => CREATABLE_TYPES.has(t.schemaType)),
  },
  document: {
    newDocumentOptions: (prev) => prev.filter((item) => CREATABLE_TYPES.has((item as any).templateId)),
    actions: (prev, ctx) => {
      if (ctx.schemaType === 'legalPage')
        return [LegalApproveAction, ...prev.filter((a) => !['publish', 'delete', 'duplicate', 'unpublish'].includes(a.action || ''))]
      if (FIXED_TYPES.has(ctx.schemaType)) return prev.filter((a) => !['delete', 'duplicate', 'unpublish'].includes(a.action || ''))
      return prev
    },
  },
})
