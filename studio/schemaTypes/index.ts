import {blogPost} from './blogPost'
import {career} from './career'
import {imageSlot} from './imageSlot'
import {legalPage} from './legalPage'
import {pageContentTypes} from './pageContent'
import {seoPage} from './seoPage'

export const schemaTypes = [imageSlot, ...pageContentTypes, blogPost, career, seoPage, legalPage]

// Fixed documents (seeded by tools/cms-seed.mjs): editors change them but never create, duplicate or delete them.
export const FIXED_TYPES = new Set(['imageSlot', 'seoPage', 'legalPage', ...pageContentTypes.map((t) => t.name)])
export const CREATABLE_TYPES = new Set(['blogPost', 'career'])
