'use client'

import {
 Send,
 Smile,
 Paperclip,
 Maximize2
} from 'lucide-react'

type Props={

 sending:boolean

 disabled:boolean

 onSend:()=>void

 onFiles:(f:File[])=>void

 onEmoji:()=>void

 onExpand:()=>void

}

export function ComposerActions({

 sending,
 disabled,
 onSend,
 onFiles,
 onEmoji,
 onExpand

}:Props){

 return(

  <div className="flex items-center w-full">

   <div className="flex gap-2">

    <button
     onClick={onEmoji}
     className="p-1.5 hover:bg-gray-100 rounded"
    >
     <Smile size={18}/>
    </button>

    <label className="p-1.5 hover:bg-gray-100 rounded cursor-pointer">

     <Paperclip size={18}/>

     <input
      type="file"
      multiple
      hidden
      onChange={(e)=>{

       if(!e.target.files) return

       onFiles(

        Array.from(e.target.files)

       )

      }}
     />

    </label>

    <button
     onClick={onExpand}
     className="p-1.5 hover:bg-gray-100 rounded"
    >
     <Maximize2 size={18}/>
    </button>

   </div>

   <div className="ml-auto">

    <button

     disabled={disabled || sending}

     onClick={onSend}

     className="

      w-9 h-9

      flex
      items-center
      justify-center

      rounded-md

      bg-blue-500
      text-white

      disabled:opacity-40

     "

    >

     <Send size={16}/>

    </button>

   </div>

  </div>

 )
}