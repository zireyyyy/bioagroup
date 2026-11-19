// R28 VI-FIRST — what the owner sees instead of the technical i18n data: the EN status in plain words, and three
// controls (re-sync EN, lock EN, preview EN). The status is computed live from the document being edited with the
// same core the translator uses, so it is correct even before the translator has run.
import {Badge, Box, Button, Card, Flex, Stack, Text} from '@sanity/ui'
import type {ObjectInputProps} from 'sanity'
import {set, setIfMissing, useFormValue} from 'sanity'
import {STATUS_VI, displayStatus, previewPath} from '../../cms/i18n/core.mjs'
import {REGISTRY} from '../lib/registry'
import {I18N_AUTO_ACTIVE, PREVIEW_ORIGIN} from '../lib/i18nConfig'

export const STATUS_TONE: Record<string, 'positive' | 'caution' | 'critical' | 'primary' | 'default'> = {
  SYNCED: 'positive', PENDING: 'primary', TRANSLATING: 'primary', REVIEW_REQUIRED: 'caution',
  FAILED: 'critical', MANUAL_LOCK: 'default', OUTDATED: 'caution',
}
export const STATUS_SHORT: Record<string, string> = {
  SYNCED: 'EN: đã đồng bộ', PENDING: 'EN: chờ Publish', TRANSLATING: 'EN: đang dịch', REVIEW_REQUIRED: 'EN: cần kiểm tra',
  FAILED: 'EN: dịch lỗi', MANUAL_LOCK: 'EN: đã khóa', OUTDATED: 'EN: chưa cập nhật',
}

export function I18nStatusInput(props: ObjectInputProps) {
  const doc = useFormValue([]) as any
  const value = (props.value || {}) as any
  if (!doc) return null
  const s = displayStatus(doc, {isDraft: String(doc._id || '').startsWith('drafts.'), autoActive: I18N_AUTO_ACTIVE})
  const path = previewPath(doc, REGISTRY.pages as any)
  const locked = value.lock === true
  const change = (patches: any[]) => props.onChange([setIfMissing({}), ...patches])
  return (
    <Card padding={3} radius={2} border tone={STATUS_TONE[s.display] === 'critical' ? 'critical' : 'transparent'}>
      <Stack gap={3}>
        <Flex align="center" gap={2} wrap="wrap">
          <Badge tone={STATUS_TONE[s.display]} padding={2}>{STATUS_SHORT[s.display]}</Badge>
          <Text size={1}>{(STATUS_VI as any)[s.display]}</Text>
        </Flex>
        {s.translate.length > 0 && !locked ? (
          <Text size={1} muted>{s.translate.length} đoạn tiếng Việt đã thay đổi so với bản EN.</Text>
        ) : null}
        {s.manual > 0 ? <Text size={1} muted>{s.manual} đoạn EN do bạn sửa tay — hệ thống giữ nguyên, không ghi đè.</Text> : null}
        {value.lastError && (s.display === 'FAILED' || s.display === 'OUTDATED') ? <Text size={1}>Lý do: {value.lastError}</Text> : null}
        {s.display === 'REVIEW_REQUIRED' && Array.isArray(value.review) && value.review.length ? (
          <Text size={1} muted>Cần xem: {value.review.slice(0, 3).join(' · ')}</Text>
        ) : null}
        {!I18N_AUTO_ACTIVE ? (
          <Text size={1} muted>
            Dịch tự động chưa được kích hoạt (chờ Owner duyệt dịch vụ dịch). Website giữ bản EN hiện có; bản EN mới sẽ được tạo
            khi dịch tự động được bật.
          </Text>
        ) : (
          <Text size={1} muted>Bạn chỉ cần sửa tiếng Việt rồi bấm Publish. Bản EN được dịch và đưa lên Preview sau khoảng 1–3 phút.</Text>
        )}
        <Flex gap={2} wrap="wrap">
          <Button
            text="Đồng bộ lại EN"
            tone="primary"
            mode="ghost"
            disabled={locked || props.readOnly}
            title="Dịch lại toàn bộ bản EN từ bản VI hiện tại (kể cả đoạn EN đã sửa tay) sau khi bạn bấm Publish"
            onClick={() => change([set(new Date().toISOString(), ['resyncRequest'])])}
          />
          <Button
            text={locked ? 'Mở khóa bản EN' : 'Khóa bản EN'}
            mode="ghost"
            disabled={props.readOnly}
            title={locked ? 'Cho phép hệ thống cập nhật bản EN theo bản VI' : 'Giữ nguyên bản EN hiện tại, không dịch tự động'}
            onClick={() => change([set(!locked, ['lock'])])}
          />
          {path ? <Button as="a" href={PREVIEW_ORIGIN + path} target="_blank" rel="noreferrer" text="Xem bản EN" mode="ghost" /> : null}
        </Flex>
        {value.resyncRequest && (!value.syncedAt || value.resyncRequest > value.syncedAt) ? (
          <Box><Text size={1}>Đã yêu cầu đồng bộ lại — bấm Publish để thực hiện.</Text></Box>
        ) : null}
      </Stack>
    </Card>
  )
}
