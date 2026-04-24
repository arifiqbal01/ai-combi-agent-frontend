// features/inbox/application/attachment/services/attachment.validation.ts

import { MessagePolicy }
from '@/features/inbox/domain/message/message.policy'

import {
 ALLOWED_ATTACHMENT_MIME_TYPES
}
from '@/features/inbox/domain/attachment/attachment.rules'

export function validateAttachment(

 file:File,

 policy:MessagePolicy

){

 if(!policy.capabilities.canAttach){

  return{

   valid:false,

   reason:'Attachments not allowed'

  }

 }

 if(

  file.size >
  policy.limits.maxFileSizeMB *
  1024 * 1024

 ){

  return{

   valid:false,

   reason:'File too large'

  }

 }

 if(

  !ALLOWED_ATTACHMENT_MIME_TYPES.includes(
   file.type
  )

 ){

  return{

   valid:false,

   reason:'File type not allowed'

  }

 }

 return{

  valid:true

 }

}

export function validateAttachmentLimit(

 current:number,

 incoming:number,

 max:number

){

 if(current + incoming > max){

  return{

   valid:false,

   reason:'Attachment limit reached'

  }

 }

 return{

  valid:true

 }

}