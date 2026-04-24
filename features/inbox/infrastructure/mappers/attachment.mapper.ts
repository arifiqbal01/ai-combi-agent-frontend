/* infrastructure/mappers/attachment.mapper.ts */

import { MessageAttachmentDTO } from '../dto/message.dto'

import {

 Attachment,
 AttachmentKind

} from '@/features/inbox/domain/attachment/attachment.types'

function resolveAttachmentKind(

 mime:string

):AttachmentKind{

 if(mime.startsWith('image'))
  return AttachmentKind.IMAGE

 if(mime.startsWith('video'))
  return AttachmentKind.VIDEO

 if(mime.startsWith('audio'))
  return AttachmentKind.AUDIO

 if(mime.includes('pdf'))
  return AttachmentKind.PDF

 return AttachmentKind.FILE

}

function resolveIcon(

 kind:AttachmentKind

):string{

 switch(kind){

  case AttachmentKind.IMAGE:
   return 'image'

  case AttachmentKind.PDF:
   return 'pdf'

  case AttachmentKind.VIDEO:
   return 'video'

  case AttachmentKind.AUDIO:
   return 'audio'

  default:
   return 'file'

 }

}

export function mapAttachmentDTO(

 dto:MessageAttachmentDTO

):Attachment{

 const kind =

  resolveAttachmentKind(
   dto.mime_type
  )

 return{

  id:dto.id,

  fileName:
   dto.file_name,

  mimeType:
   dto.mime_type,

  fileSize:
   dto.file_size,

  storageKey:
   dto.storage_key,

  kind,

  icon:
   resolveIcon(kind)

 }

}

export function mapAttachments(

 attachments:MessageAttachmentDTO[]

):Attachment[]{

 return attachments.map(
  mapAttachmentDTO
 )

}