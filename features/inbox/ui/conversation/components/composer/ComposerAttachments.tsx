'use client'

import { X } from 'lucide-react'

import { Attachment } from '@/features/inbox/domain/attachment/attachment.types'

import { MediaRenderer } from '@/features/media/ui/components/base/MediaRenderer'
import { mapAttachmentToMedia } from '@/features/media/application/mappers/attachmentToMedia'

type Props = {
  files: Attachment[]
  onRemove: (id: string) => void
}

export function ComposerAttachments({
  files,
  onRemove,
}: Props) {
  if (!files.length) return null

  return (
    <div className="px-3 py-2 flex gap-2 flex-wrap">

      {files.map((file) => {
        const media = mapAttachmentToMedia(file)
        const isMedia = media.type !== 'other'

        return (
          <div
            key={file.id}
            className="
              relative
              w-20 h-20
              rounded-md
              overflow-hidden
              border
              bg-bg-muted
              flex items-center justify-center
            "
          >

            {/* -----------------------------
               MEDIA THUMBNAIL
            ----------------------------- */}
            {isMedia ? (
              <MediaRenderer media={media} />
            ) : (
              <div className="text-xs px-2 text-center truncate">
                {file.fileName}
              </div>
            )}

            {/* -----------------------------
               UPLOADING STATE
            ----------------------------- */}
            {!file.storageKey && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-[10px] text-white">
                Uploading...
              </div>
            )}

            {/* -----------------------------
               REMOVE BUTTON
            ----------------------------- */}
            <button
              disabled={!file.storageKey}
              onClick={() => onRemove(file.id)}
              className="
                absolute top-1 right-1
                w-5 h-5
                flex items-center justify-center
                rounded-full
                bg-black/70 text-white
              "
            >
              <X size={12} />
            </button>

          </div>
        )
      })}

    </div>
  )
}