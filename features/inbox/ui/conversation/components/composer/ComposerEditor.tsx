'use client'

import {
 useEditor,
 EditorContent
} from '@tiptap/react'

import {
 useEffect,
 useRef
} from 'react'

import { TipTapAdapter }
from '@/features/inbox/infrastructure/editor/tiptap/tiptap.adapter'

import {
 createTipTapExtensions
}
from '@/features/inbox/infrastructure/editor/tiptap/tiptap.extensions'

const extensions =
 createTipTapExtensions()

type Props={
 onReady:(editor:any)=>void
 expanded:boolean
}

export function ComposerEditor({

 onReady,
 expanded

}:Props){

 const editor=useEditor({

  extensions,

  immediatelyRender:false,

  autofocus:false,

  editable:true,

  injectCSS:false,

  editorProps:{

   attributes:{

    class:
    'px-3 py-2 text-[14px] leading-relaxed focus:outline-none whitespace-pre-wrap break-words'

   }

  }

 })

 const adapterRef=
 useRef<any>(null)

 useEffect(()=>{

  if(!editor) return

  if(adapterRef.current)
   return

  const adapter=
   new TipTapAdapter(editor)

  adapterRef.current=
   adapter

  onReady(adapter)

 },[editor,onReady])

 if(!editor)
  return null

 return(

  <div

   className={

    expanded
        ?`

         flex
         flex-col

         min-h-[300px]

         max-h-[min(900px,70vh)]

         transition-all
         duration-200
         ease-out

        `
        :`

         flex
         flex-col

         min-h-[44px]

         max-h-[160px]

         transition-all
         duration-200
         ease-out

        `

   }

  >

   <EditorContent

    editor={editor}

    className="

     flex-1

     overflow-y-auto

     text-[14px]
     leading-relaxed

     [&_.ProseMirror]:min-h-full
     [&_.ProseMirror]:outline-none
     [&_.ProseMirror]:whitespace-pre-wrap
     [&_.ProseMirror]:break-words

     /* paragraphs */
     [&_.ProseMirror_p]:my-0

     /* LISTS */
     [&_.ProseMirror_ul]:list-disc
     [&_.ProseMirror_ol]:list-decimal

     [&_.ProseMirror_ul]:pl-6
     [&_.ProseMirror_ol]:pl-6

     [&_.ProseMirror_li]:my-1

     /* nested lists */
     [&_.ProseMirror_ul_ul]:pl-4
     [&_.ProseMirror_ol_ol]:pl-4

     /* LINKS */
     [&_.ProseMirror_a]:text-blue-600
     [&_.ProseMirror_a]:underline

     /* CODE */
     [&_.ProseMirror_code]:bg-gray-100
     [&_.ProseMirror_code]:px-1
     [&_.ProseMirror_code]:py-0.5
     [&_.ProseMirror_code]:rounded
     [&_.ProseMirror_code]:text-[13px]

    "

   />

  </div>

 )
}