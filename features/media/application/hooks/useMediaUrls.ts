// features/media/application/hooks/useMediaUrls.ts

import { useQueries } from '@tanstack/react-query'

import { Media } from '../../domain/media.types'

import { getAttachmentSignedUrl } from '@/features/inbox/infrastructure/api/attachment.api'

type VisibilityMap = Record<string, boolean>

export function useMediaUrls(
  mediaItems: Media[],
  visibleMap?: VisibilityMap
) {
  return useQueries({
    queries: mediaItems.map((media) => {
      /**
       * Local optimistic preview
       */
      if (media.directUrl) {
        return {
          queryKey: ['media-local', media.id],

          queryFn: async () =>
            media.directUrl,

          staleTime: Infinity,
          gcTime: Infinity,
        }
      }

      /**
       * Fetch only when explicitly enabled
       */
      const enabled =
        !!media.id &&
        (visibleMap?.[media.id] ?? false)

      return {
        queryKey: ['media-url', media.id],

        queryFn: async () => {
          const result =
            await getAttachmentSignedUrl(
              media.id
            )

          return result.url
        },

        enabled,

        staleTime:
          4 * 60 * 1000,

        gcTime:
          10 * 60 * 1000,

        retry: 1,
      }
    }),
  })
}