import {

 AttachmentKind

} from './attachment.types'

export function resolveAttachmentKind(

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

export function formatFileSize(
 bytes:number
):string{

 if(bytes<1024)
  return `${bytes} B`

 if(bytes<1024*1024)
  return `${Math.round(bytes/1024)} KB`

 return `${Math.round(bytes/1024/1024)} MB`

}