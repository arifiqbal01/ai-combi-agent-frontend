'use client'

import { Media } from '@/features/media/domain/media.types'
import { getMediaAdapter } from '@/features/media/infrastructure/registry/media.registry'
import { useMediaUrl } from '@/features/media/application/hooks/useMediaUrl'
import { MEDIA_VARIANT } from '@/features/media/domain/media.constants'

type Props = {
  media: Media
  onClick?: () => void
}

export function MediaRenderer({ media, onClick }: Props) {
  const adapter = getMediaAdapter(media)

  const {
    data: previewUrl,
    isLoading,
    isError,
  } = useMediaUrl(media, MEDIA_VARIANT.THUMBNAIL)

  /**
   * ❌ Hard fail — no adapter
   */
  if (!adapter) {
    return (
      <span className="text-xs text-red-500">
        Unsupported media
      </span>
    )
  }

  return (
    <div
      onClick={(e) => {
        e.stopPropagation()
        onClick?.()
      }}
      className={onClick ? 'cursor-pointer' : undefined}
    >
      {adapter.renderPreview(media, {
        variant: MEDIA_VARIANT.THUMBNAIL,

        /**
         * ✅ Normalize URL (IMPORTANT)
         */
        url: previewUrl ?? null,

        /**
         * ✅ Pass consistent state
         */
        isLoading,
        isError,
      })}
    </div>
  )
}