// features/media/application/hooks/useMediaUrls.ts

import { useQueries } from '@tanstack/react-query'

import { mediaApi } from '../../infrastructure/api/media.api'
import { mediaKeys } from '../keys/media.keys'

import { Media } from '../../domain/media.types'
import { MEDIA_VARIANT } from '../../domain/media.constants'

export function useMediaUrls(
  mediaItems: Media[],
  variant: 'thumbnail' | 'preview' | 'full' = MEDIA_VARIANT.PREVIEW
) {
  return useQueries({
    queries: mediaItems.map((media) => {
      const key =
      variant === MEDIA_VARIANT.THUMBNAIL
        ? media?.thumbnailKey ||
          media?.previewKey ||
          media?.storageKey
        : variant === MEDIA_VARIANT.PREVIEW
        ? media?.previewKey ||
          media?.storageKey
        : media?.storageKey

      return {
        queryKey: key
          ? mediaKeys.url(key)
          : mediaKeys.urls(),

        queryFn: async () => {
          if (!key) return null
          return mediaApi.getDownloadUrl(key)
        },

        enabled: !!key,
        staleTime: 5 * 60 * 1000,
      }
    }),
  })
}