// features/inbox/application/attachment/actions/uploadAttachment.usecase.ts

import { useState } from 'react'

import {
 requestUploadUrl
}
from '@/features/inbox/infrastructure/api/attachment.api'

import {
 mapAttachmentDTO
}
from '@/features/inbox/infrastructure/mappers/attachment.mapper'

import {
 Attachment
}
from '@/features/inbox/domain/attachment/attachment.types'

import {
 MessagePolicy,
 getDefaultMessagePolicy
}
from '@/features/inbox/domain/message/message.policy'

import {

 validateAttachment,
 validateAttachmentLimit

}
from './attachment.validation'

import {

 createQueueItem,
 markUploading,
 markDone,
 markFailed,
 removeQueueItem,
 UploadQueueItem

}
from './attachment.queue'

export function useUploadAttachment(

 policy?:MessagePolicy

){

 const safePolicy =
  policy ?? getDefaultMessagePolicy()

 const [queue,setQueue]=
  useState<UploadQueueItem[]>([])

 const [uploading,setUploading]=
  useState(false)

 async function uploadFile(

  file:File

 ):Promise<Attachment | null>{

  const validation =
   validateAttachment(
    file,
    safePolicy
   )

  if(!validation.valid){

   console.warn(
    validation.reason
   )

   return null

  }

  const item =
   createQueueItem(file)

  setQueue(prev=>[
   ...prev,
   item
  ])

  setUploading(true)

  try{

   setQueue(prev=>

    markUploading(
     prev,
     item.id
    )

   )

   const dto =
    await requestUploadUrl({

     file_name:file.name,

     mime_type:file.type,

     file_size:file.size

    })

   const upload =
    await fetch(

     dto.upload_url,

     {

      method:'PUT',

      body:file,

      headers:{

       'Content-Type':
        file.type

      }

     }

    )

   if(!upload.ok)
    throw new Error(
     'Upload failed'
    )

   const attachment =
    mapAttachmentDTO({

     id:dto.storage_key,

     file_name:file.name,

     mime_type:file.type,

     file_size:file.size,

     storage_key:dto.storage_key

    })

   setQueue(prev=>

    markDone(
     prev,
     item.id,
     attachment
    )

   )

   return attachment

  }
  catch(err){

   setQueue(prev=>

    markFailed(
     prev,
     item.id
    )

   )

   return null

  }
  finally{

   setUploading(false)

  }

 }

 async function uploadFiles(

  files:File[],

  currentAttachments:number

 ){

  const limit =
   validateAttachmentLimit(

    currentAttachments,

    files.length,

    safePolicy.limits.maxAttachments

   )

  if(!limit.valid){

   console.warn(
    limit.reason
   )

   return[]

  }

  const uploads =
   await Promise.all(

    files.map(
     uploadFile
    )

   )

  return uploads.filter(
   Boolean
  ) as Attachment[]

 }

 function removeFromQueue(
  id:string
 ){

  setQueue(prev=>

   removeQueueItem(
    prev,
    id
   )

  )

 }

 return{

  uploadFile,

  uploadFiles,

  queue,

  uploading,

  removeFromQueue,

  policy:safePolicy   // useful for UI limits

 }

}