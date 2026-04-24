import { Attachment }
from '@/features/inbox/domain/attachment/attachment.types'

export type UploadStatus =
 | 'pending'
 | 'uploading'
 | 'done'
 | 'failed'

export type UploadQueueItem={

 id:string

 file:File

 status:UploadStatus

 progress:number

 attachment?:Attachment

 error?:string

}

export function createQueueItem(
 file:File
):UploadQueueItem{

 return{

  id:crypto.randomUUID(),

  file,

  status:'pending',

  progress:0

 }

}

export function markUploading(

 queue:UploadQueueItem[],

 id:string

){

 return queue.map(item=>

  item.id===id

   ? {

      ...item,

      status:'uploading'

     }

   : item

 )

}

export function markDone(

 queue:UploadQueueItem[],

 id:string,

 attachment:Attachment

){

 return queue.map(item=>

  item.id===id

   ? {

      ...item,

      status:'done',

      progress:100,

      attachment

     }

   : item

 )

}

export function markFailed(

 queue:UploadQueueItem[],

 id:string

){

 return queue.map(item=>

  item.id===id

   ? {

      ...item,

      status:'failed',

      error:'Upload failed'

     }

   : item

 )

}

export function removeQueueItem(

 queue:UploadQueueItem[],

 id:string

){

 return queue.filter(
  item => item.id !== id
 )

}