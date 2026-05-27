'use client'

import { Media } from '@/features/media/domain/media.types'
import { getMediaAdapter } from '@/features/media/infrastructure/registry/media.registry'
import { useMediaUrl } from '@/features/media/application/hooks/useMediaUrl'
import { useInViewport } from '@/features/media/application/hooks/useInViewport'

import {
  isImage,
} from '@/features/media/domain/media.guards'

type Props = {
  media: Media
  onClick?: () => void
}

export function MediaRenderer({
  media,
  onClick
}: Props) {
  const adapter =
    getMediaAdapter(media)

  /**
   * Only images auto-load in viewport.
   * Videos/audio/docs require interaction.
   */
  const shouldLazyLoad =
    isImage(media)

  const {
    ref,
    visible
  } = useInViewport('200px')

  const {
    data: previewUrl,
    isLoading,
    isError,
  } = useMediaUrl(
    media,
    shouldLazyLoad
      ? visible
      : false
  )

  if (!adapter) {
    return (
      <span className="text-xs text-red-500">
        Unsupported media
      </span>
    )
  }

  return (
    <div
      ref={ref}
      onClick={(e) => {
        e.stopPropagation()
        onClick?.()
      }}
      className={
        onClick
          ? 'cursor-pointer'
          : undefined
      }
    >
      {adapter.renderPreview(media, {
        url: previewUrl ?? null,
        isLoading,
        isError,
      })}
    </div>
  )
}