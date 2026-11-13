import {CaseIcon} from '@sanity/icons/Case'
import {DocumentsIcon} from '@sanity/icons/Documents'
import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {ImagesIcon} from '@sanity/icons/Images'
import {LockIcon} from '@sanity/icons/Lock'
import {SearchIcon} from '@sanity/icons/Search'
import type {StructureResolver} from 'sanity/structure'
import {PAGE_KEYS, REGISTRY, TEXT_PAGE_KEYS, pageDocId, pageDocType} from '../lib/registry'
import {SEO_PAGES} from '../schemaTypes/seoPage'

// Vietnamese menu built around the website's pages, so the owner finds a position by page → section → slot.
export const structure: StructureResolver = (S) =>
  S.list()
    .title('BIO-A Group')
    .items([
      S.listItem()
        .title('Ảnh website')
        .icon(ImagesIcon)
        .child(
          S.list()
            .title('Ảnh theo trang')
            .items(
              PAGE_KEYS.filter((k) => REGISTRY.pages[k].images.length > 0).map((key) =>
                S.listItem()
                  .id('img-' + key)
                  .title(`${REGISTRY.pages[key].labelVi} (${REGISTRY.pages[key].images.length})`)
                  .icon(ImagesIcon)
                  .child(
                    S.documentList()
                      .title(REGISTRY.pages[key].labelVi)
                      .schemaType('imageSlot')
                      .filter('_type == "imageSlot" && page == $page')
                      .params({page: key})
                      .defaultOrdering([{field: 'order', direction: 'asc'}])
                      .canHandleIntent(() => false),
                  ),
              ),
            ),
        ),
      S.listItem()
        .title('Nội dung trang')
        .icon(DocumentTextIcon)
        .child(
          S.list()
            .title('Nội dung trang')
            .items(
              TEXT_PAGE_KEYS.map((key) =>
                S.listItem()
                  .id('page-' + key)
                  .title(REGISTRY.pages[key].labelVi)
                  .icon(DocumentTextIcon)
                  .child(S.document().schemaType(pageDocType(key)).documentId(pageDocId(key)).title(REGISTRY.pages[key].labelVi)),
              ),
            ),
        ),
      S.divider(),
      S.documentTypeListItem('blogPost').title('Blog').icon(DocumentsIcon),
      S.documentTypeListItem('career').title('Tuyển dụng').icon(CaseIcon),
      S.divider(),
      S.listItem()
        .title('SEO')
        .icon(SearchIcon)
        .child(
          S.list()
            .title('SEO theo trang')
            .items(SEO_PAGES.map((p) => S.listItem().id('seo-' + p.key).title(p.labelVi).icon(SearchIcon).child(S.document().schemaType('seoPage').documentId('seo-' + p.key).title('SEO · ' + p.labelVi)))),
        ),
      S.listItem()
        .title('Pháp lý')
        .icon(LockIcon)
        .child(
          S.list()
            .title('Trang pháp lý')
            .items([
              S.listItem().id('legal-privacy').title('Chính sách bảo mật').icon(LockIcon).child(S.document().schemaType('legalPage').documentId('legal-privacy')),
              S.listItem().id('legal-cookie').title('Chính sách cookie').icon(LockIcon).child(S.document().schemaType('legalPage').documentId('legal-cookie')),
            ]),
        ),
    ])
