import { apiClient } from '@/infra/api/client'

import {
  UploadUrlRequestDTO,
  UploadUrlResponseDTO
} from '../dto/attachment.dto'

export function requestUploadUrl(
  payload: UploadUrlRequestDTO
): Promise<UploadUrlResponseDTO> {

  return apiClient.post<UploadUrlResponseDTO>(
    `/inbox/attachments/upload-url`,
    payload
  )
}