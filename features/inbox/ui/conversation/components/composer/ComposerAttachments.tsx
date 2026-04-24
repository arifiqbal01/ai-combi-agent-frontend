'use client'

import {
 X,
 File
} from 'lucide-react'

import { Attachment }
from '@/features/inbox/domain/attachment/attachment.types'

type Props={

 files:Attachment[]

 onRemove:(id:string)=>void

}

export function ComposerAttachments({

 files,
 onRemove

}:Props){

 if(!files.length)
  return null

 return(

  <div className="px-3 py-2 flex gap-2 flex-wrap">

   {files.map(file=>(

    <div

     key={file.id}

     className="

      flex
      items-center
      gap-2

      border
      rounded

      px-2 py-1

      text-xs

      bg-gray-50

     "

    >

     <File size={14}/>

     <div className="flex flex-col">

      <span>
       {file.fileName}
      </span>

      {!file.storageKey && (

       <span className="text-[10px] text-gray-400">

        uploading...

       </span>

      )}

     </div>

     <button

      disabled={!file.storageKey}

      onClick={()=>

       onRemove(file.id)

      }

     >

      <X size={14}/>

     </button>

    </div>

   ))}

  </div>

 )
}