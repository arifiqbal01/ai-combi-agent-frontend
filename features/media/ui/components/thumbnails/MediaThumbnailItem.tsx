'use client'

import { Media } from '@/features/media/domain/media.types'
import { useMediaUrl } from '@/features/media/application/hooks/useMediaUrl'
import { MEDIA_VARIANT } from '@/features/media/domain/media.constants'

import {
  isImage,
  isVideo,
  isAudio,
  isDocument,
} from '@/features/media/domain/media.guards'

import { MediaIcon } from '@/features/media/ui/components/base/media.icon'

type Props = {
  media: Media
  active: boolean
  onClick: () => void
}

export function MediaThumbnailItem({
  media,
  active,
  onClick,
}: Props) {
  const { data: url, isLoading } = useMediaUrl(
    media,
    MEDIA_VARIANT.THUMBNAIL
  )

  const isVisual = isImage(media) || isVideo(media)
  const isFile = isAudio(media) || isDocument(media)

  return (
    <div
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
      className={`
        relative
        w-16 h-16
        flex-shrink-0
        rounded-md
        overflow-hidden
        cursor-pointer
        border
        bg-bg-muted
        flex items-center justify-center
        ${active ? 'border-blue-500' : 'border-transparent'}
      `}
    >
      {/* -----------------------------
         IMAGE / VIDEO
      ----------------------------- */}
      {isVisual && url && !isLoading ? (
        <img
          src={url}
          className="w-full h-full object-cover"
        />
      ) : isVisual && isLoading ? (
        <div className="w-full h-full animate-pulse bg-bg-muted" />
      ) : null}

      {/* -----------------------------
         AUDIO / DOCUMENT (ICON CENTER)
      ----------------------------- */}
      {(!isVisual || !url) && (
        <div className="flex items-center justify-center w-full h-full">
          <MediaIcon media={media} size="md" />
        </div>
      )}

      {/* -----------------------------
         VIDEO BADGE (optional polish)
      ----------------------------- */}
      {isVideo(media) && (
        <div className="absolute bottom-1 right-1 text-[10px] bg-black/60 text-white px-1 rounded">
          VIDEO
        </div>
      )}
    </div>
  )
}