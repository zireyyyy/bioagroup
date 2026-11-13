// Publishing a legal page requires an explicit confirmation; the action stamps approver + time, then publishes.
import {useEffect, useState} from 'react'
import {type DocumentActionComponent, useCurrentUser, useDocumentOperation} from 'sanity'
import {legalContentHash} from '../../cms/legal-hash.mjs'

export const LegalApproveAction: DocumentActionComponent = (props) => {
  const {patch, publish} = useDocumentOperation(props.id, props.type)
  const user = useCurrentUser()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [publishing, setPublishing] = useState(false)

  useEffect(() => {
    if (publishing && !props.draft) setPublishing(false)
  }, [publishing, props.draft])

  return {
    label: publishing ? 'Đang xuất bản…' : 'Duyệt & xuất bản',
    tone: 'positive',
    disabled: Boolean(publish.disabled) || publishing,
    title: publish.disabled ? 'Không có thay đổi để xuất bản, hoặc còn lỗi cần sửa' : undefined,
    onHandle: () => setDialogOpen(true),
    dialog: dialogOpen && {
      type: 'confirm',
      tone: 'caution',
      message:
        'Xác nhận nội dung pháp lý này đã được OWNER (và luật sư nếu cần) duyệt và được phép xuất bản? Tên tài khoản của bạn và thời điểm duyệt sẽ được lưu cùng tài liệu.',
      onCancel: () => setDialogOpen(false),
      onConfirm: async () => {
        setPublishing(true)
        setDialogOpen(false)
        // The stamp covers exactly the content being published; any later change needs a new approval.
        const contentHash = await legalContentHash(props.draft || props.published)
        patch.execute([
          {set: {approval: {approvedBy: user?.name || user?.email || user?.id || 'unknown', approvedAt: new Date().toISOString(), confirmed: true, contentHash}}},
        ])
        publish.execute()
        props.onComplete()
      },
    },
  }
}
