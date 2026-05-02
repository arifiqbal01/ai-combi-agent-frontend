// features/media/application/hooks/useMediaUrl.ts

import { useAppQuery } from '@/core/query/useAppQuery'
import { mediaApi } from '../../infrastructure/api/media.api'
import { mediaKeys } from '../keys/media.keys'

import { Media } from '../../domain/media.types'
import { MEDIA_VARIANT } from '../../domain/media.constants'

export function useMediaUrl(
  media?: Media,
  variant: 'thumbnail' | 'preview' | 'full' = MEDIA_VARIANT.PREVIEW
) {
  /**
   * ✅ Resolve correct key
   */
  const key =
    variant === MEDIA_VARIANT.THUMBNAIL
      ? media?.thumbnailKey ||
        media?.previewKey ||
        media?.storageKey
      : variant === MEDIA_VARIANT.PREVIEW
      ? media?.previewKey ||
        media?.storageKey
      : media?.storageKey

  /**
   * ❌ No key → skip query
   */
  if (!key || !media?.id) {
    return {
      data: null,
      isLoading: false,
      isError: false,
    }
  }

  return useAppQuery({
    /**
     * 🔥 CRITICAL:
     * include variant + media.id for perfect cache isolation
     */
    queryKey: [...mediaKeys.url(key), variant, media.id],

    queryFn: async () => {
      return mediaApi.getDownloadUrl(key)
    },

    enabled: !!key,

    /**
     * 🔥 Stability tuning
     */
    staleTime: Infinity,          // no refetch while navigating
    gcTime: 30 * 60 * 1000,       // keep cache longer

    retry: 2,                     // handle flaky network
    refetchOnWindowFocus: false,
  })
}