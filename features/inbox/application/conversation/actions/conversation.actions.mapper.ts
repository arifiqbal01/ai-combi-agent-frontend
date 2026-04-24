import { Attachment }
from '@/features/inbox/domain/attachment/attachment.types'

export function mapAttachments(
 attachments:Attachment[]
){

 return attachments.map(a=>({

  storage_key:
   a.storageKey,

  file_name:
   a.fileName,

  mime_type:
   a.mimeType,

  file_size:
   a.fileSize

 }))

}