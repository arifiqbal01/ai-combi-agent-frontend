'use client'

import { useRef, useEffect } from 'react'

import { Media } from '@/features/media/domain/media.types'
import { getMediaAdapter } from '@/features/media/infrastructure/registry/media.registry'
import { useMediaUrl } from '@/features/media/application/hooks/useMediaUrl'
import { MEDIA_VARIANT } from '@/features/media/domain/media.constants'

export function LightboxContent({
  mediaList,
  index,
}: {
  mediaList: Media[]
  index: number
}) {
  if (!mediaList?.length) return null

  const media = mediaList[index]
  const adapter = getMediaAdapter(media)

  const { data: url, isLoading, isError } = useMediaUrl(
    media,
    MEDIA_VARIANT.FULL
  )

  /**
   * ⚠️ CRITICAL FIX (DO NOT CHANGE)
   *
   * We reset URL when media changes.
   * This prevents PDF flicker / unmount issues.
   *
   * DO NOT replace with global cache.
   */
  const stableUrlRef = useRef<string | null>(null)

  useEffect(() => {
    stableUrlRef.current = null
  }, [media.id])

  if (url && !stableUrlRef.current) {
    stableUrlRef.current = url
  }

  const stableUrl = stableUrlRef.current

  return (
    <div className="w-full h-full pt-14 px-4 pb-20 bg-bg-muted">
      <div className="w-full h-full flex items-center justify-center">

        {!adapter && (
          <div className="text-sm text-red-500">
            Unsupported media
          </div>
        )}

        {isLoading && !stableUrl && (
          <div className="text-sm text-text-muted">
            Loading...
          </div>
        )}

        {isError && !stableUrl && (
          <div className="text-sm text-red-500">
            Failed to load media
          </div>
        )}

        {adapter && stableUrl &&
          adapter?.renderFull?.(media, {
            variant: MEDIA_VARIANT.FULL,
            url: stableUrl,
            isLoading,
            isError,
          })}
      </div>
    </div>
  )
}