// features/media/infrastructure/api/media.api.ts

import { apiClient } from '@/infra/api/client'

type SignedUrlResponse = {
  url: string
  expires_in: number
}

export const mediaApi = {
  async getSignedUrl(
    attachmentId: string
  ): Promise<SignedUrlResponse> {
    return apiClient.get(
      `/inbox/attachments/${attachmentId}/signed-url`
    )
  },
}