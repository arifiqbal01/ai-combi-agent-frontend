'use client'

import { Attachment } from '@/features/inbox/domain/attachment/attachment.types'

import { MediaGrid } from '@/features/media/ui/components/grid/MediaGrid'
import { mapAttachmentToMedia } from '@/features/media/application/mappers/attachmentToMedia'

import { formatFileSize } from '@/features/inbox/domain/attachment/attachment.utils'
import { getAttachmentSignedUrl } from '@/features/inbox/infrastructure/api/attachment.api'

import { Icon } from '@/ui'
import { Paperclip } from 'lucide-react'

type Props = {
  attachments: Attachment[]
}

export function MessageAttachments({
  attachments
}: Props) {
  if (!attachments?.length) return null

  const mediaItems = attachments
    .map(mapAttachmentToMedia)
    .filter((m) => m.type !== 'other')

  const otherFiles = attachments.filter((file) => {
    const media = mapAttachmentToMedia(file)
    return media.type === 'other'
  })

  async function openFile(
    attachmentId: string
  ) {
    try {
      const result =
        await getAttachmentSignedUrl(
          attachmentId
        )

      window.open(
        result.url,
        '_blank',
        'noopener,noreferrer'
      )

    } catch {
      console.error(
        'Failed to open attachment'
      )
    }
  }

  return (
    <div className="mt-2 space-y-2">
      {mediaItems.length > 0 && (
        <MediaGrid items={mediaItems} />
      )}

      {otherFiles.map((file, index) => {
        const key =
          file.id ??
          `${file.fileName}-${index}`

        return (
          <button
            key={key}
            type="button"
            onClick={() =>
              openFile(file.id)
            }
            className="
              w-full
              flex items-center gap-3
              text-[12px]
              border border-gray-200
              rounded-md
              px-3 py-2
              bg-gray-50
              hover:bg-gray-100
              transition
            "
          >
            <Icon size="sm" tone="muted">
              <Paperclip />
            </Icon>

            <div className="flex-1 min-w-0 text-left">
              <div className="font-medium text-gray-800 truncate">
                {file.fileName}
              </div>

              <div className="text-[11px] text-gray-500">
                {formatFileSize(file.fileSize)}
              </div>
            </div>
          </button>
        )
      })}
    </div>
  )
}