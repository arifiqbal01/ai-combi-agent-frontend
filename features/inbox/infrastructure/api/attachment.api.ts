import { apiClient } from '@/infra/api/client'

import {
  UploadUrlRequestDTO,
  UploadUrlResponseDTO,
  AttachmentSignedUrlResponseDTO,
} from '../dto/attachment.dto'

export function requestUploadUrl(
  payload: UploadUrlRequestDTO
): Promise<UploadUrlResponseDTO> {

  return apiClient.post<UploadUrlResponseDTO>(
    `/inbox/attachments/upload-url`,
    payload
  )
}

export async function getAttachmentSignedUrl(
  attachmentId: string
): Promise<AttachmentSignedUrlResponseDTO> {
  return apiClient.get(
    `/inbox/attachments/${attachmentId}/signed-url`
  )
}