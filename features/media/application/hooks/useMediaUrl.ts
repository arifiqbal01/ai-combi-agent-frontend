// features/media/application/hooks/useMediaUrl.ts

import { mediaApi } from '../../infrastructure/api/media.api'
import { Media } from '../../domain/media.types'
import { MEDIA_VARIANT } from '../../domain/media.constants'

export function useMediaUrl(
  media?: Media,
  variant: 'thumbnail' | 'preview' | 'full' = MEDIA_VARIANT.PREVIEW
) {
  if (media?.directUrl) {
    return {
      data: media.directUrl,
      isLoading: false,
      isError: false,
    }
  }

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
    data: key
      ? mediaApi.getDownloadUrl(key)
      : null,

    isLoading: false,
    isError: false,
  }
}