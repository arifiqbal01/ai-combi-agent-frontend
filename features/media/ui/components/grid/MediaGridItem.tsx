'use client'

import { Media } from '@/features/media/domain/media.types'
import { useMediaUrl } from '@/features/media/application/hooks/useMediaUrl'
import { MEDIA_VARIANT } from '@/features/media/domain/media.constants'

import {
  isImage,
  isVideo,
} from '@/features/media/domain/media.guards'

import { MediaIcon } from '@/features/media/ui/components/base/media.icon'

type Props = {
  media: Media
  index: number
  onClick: (index: number) => void
  overlay?: string | null
}

export function MediaGridItem({
  media,
  index,
  onClick,
  overlay,
}: Props) {
  const { data: url, isLoading } = useMediaUrl(
    media,
    MEDIA_VARIANT.THUMBNAIL
  )

  const isVisual = isImage(media) || isVideo(media)

  return (
    <div
      onClick={(e) => {
        e.stopPropagation()
        onClick(index)
      }}
      className="
        relative
        aspect-square
        rounded-lg
        overflow-hidden
        cursor-pointer
        bg-bg-muted
        border border-border-subtle
      "
    >
      {/* IMAGE / VIDEO */}
      {isVisual && url && !isLoading ? (
        <img
          src={url}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <MediaIcon media={media} size="lg" />
        </div>
      )}

      {/* VIDEO BADGE */}
      {isVideo(media) && (
        <div className="absolute bottom-1 right-1 text-xs bg-black/60 text-white px-1.5 py-0.5 rounded">
          VIDEO
        </div>
      )}

      {/* +MORE OVERLAY */}
      {overlay && (
        <div className="
          absolute inset-0
          bg-black/60
          flex items-center justify-center
          text-white text-lg font-semibold
        ">
          {overlay}
        </div>
      )}
    </div>
  )
}