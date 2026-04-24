import { apiClient } from '@/infra/api/client'

export function requestUploadUrl(
 payload:UploadUrlRequest
){

 return apiClient.post(

  `/inbox/attachments/upload-url`,
  payload

 )

}