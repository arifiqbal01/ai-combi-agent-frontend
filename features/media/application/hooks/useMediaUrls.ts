// features/media/application/hooks/useMediaUrls.ts

import { mediaApi } from '../../infrastructure/api/media.api'
import { Media } from '../../domain/media.types'
import { MEDIA_VARIANT } from '../../domain/media.constants'

export function useMediaUrls(
  mediaItems: Media[],
  variant: 'thumbnail' | 'preview' | 'full' = MEDIA_VARIANT.PREVIEW
) {
  return mediaItems.map((media) => {
    if (media.directUrl) {
      return {
        data: media.directUrl,
        isLoading: false,
        isError: false,
      }
    }

    const key =
      variant === MEDIA_VARIANT.THUMBNAIL
        ? media.thumbnailKey ||
          media.previewKey ||
          media.storageKey
        : variant === MEDIA_VARIANT.PREVIEW
        ? media.previewKey ||
          media.storageKey
        : media.storageKey

    return {
      data: key
        ? mediaApi.getDownloadUrl(key)
        : null,

      isLoading: false,
      isError: false,
    }
  })
}