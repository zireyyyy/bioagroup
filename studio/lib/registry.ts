// The slot registry is generated from the built website (tools/cms-registry.mjs). The Studio only offers the
// image/text slots that exist in it, so editors cannot add layout, CSS or new sections.
import raw from '../../cms/registry.json'

export type Frame = {w: number; h: number; fit?: string | null; bgSize?: string | null}
export type ImageSlot = {
  id: string
  page: string
  original: string
  kinds: string[]
  sections: string[]
  occurrences: number
  altVi: string
  altEn: string
  natural: {w: number; h: number} | null
  frames: Record<string, Frame>
}
export type TextSlot = {
  id: string
  page: string
  tags: string[]
  sections: string[]
  vi: string
  en: string
  occurrences: number
  multiline: boolean
  maxVi: number
  maxEn: number
}
export type PageEntry = {
  labelVi: string
  labelEn: string
  routes: {vi: string; en: string}
  images: ImageSlot[]
  texts: TextSlot[]
}
export const REGISTRY = raw as unknown as {version: number; pages: Record<string, PageEntry>}
export const PAGE_KEYS = Object.keys(REGISTRY.pages)
export const TEXT_PAGE_KEYS = PAGE_KEYS.filter((k) => REGISTRY.pages[k].texts.length > 0)
export const pageDocType = (key: string) => 'page_' + key
export const pageDocId = (key: string) => 'page-' + key
