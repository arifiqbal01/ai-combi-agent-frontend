'use client'

import {
 formatFileSize
}
from '@/features/inbox/domain/attachment/attachment.utils'

import { Icon } from '@/ui'
import { Paperclip } from 'lucide-react'

export function MessageAttachments({
 attachments
}){

 if(!attachments?.length)
  return null

 return(

  <div className="mt-2 space-y-1.5">

   {attachments.map((file,index)=>(

    <div

     key={
      file.id ||
      file.storageKey ||
      file.fileName+'-'+index
     }

     className="

      flex
      items-center
      gap-3

      text-[12px]

      border
      border-gray-200

      rounded-md

      px-3
      py-2

      bg-gray-50

      hover:bg-gray-100

      cursor-pointer

      transition

     "

    >

     <Icon size="sm" tone="muted">
      <Paperclip/>
     </Icon>

     <div className="flex-1 min-w-0">

      <div className="
       font-medium
       text-gray-800
       truncate
      ">

       {file.fileName}

      </div>

      <div className="
       text-[11px]
       text-gray-500
      ">

       {formatFileSize(
        file.fileSize
       )}

      </div>

     </div>

    </div>

   ))}

  </div>

 )
}