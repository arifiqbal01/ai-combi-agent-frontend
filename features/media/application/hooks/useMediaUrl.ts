import { useQuery } from '@tanstack/react-query'
import { Media } from '../../domain/media.types'
import { getAttachmentSignedUrl } from '@/features/inbox/infrastructure/api/attachment.api'

export function useMediaUrl(
  media?: Media
) {
  if (media?.directUrl) {
    return {
      data: media.directUrl,
      isLoading: false,
      isError: false,
    }
  }

  return useQuery({
    queryKey: [
      'media-url',
      media?.id
    ],

    queryFn: async () => {
      const result =
        await getAttachmentSignedUrl(
          media!.id
        )

      return result.url
    },

    enabled: !!media?.id,

    staleTime:
      4 * 60 * 1000,

    gcTime:
      10 * 60 * 1000,

    retry: 1
  })
}