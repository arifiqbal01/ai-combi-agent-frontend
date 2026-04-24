'use client'

import {
 Bold,
 Italic,
 Underline,
 List,
 ListOrdered,
 Link as LinkIcon,
 Code,
 Keyboard,
 X
} from 'lucide-react'

import clsx from 'clsx'

import {
 useState,
 useRef,
 useEffect
} from 'react'

import {

 toggleBold,
 toggleItalic,
 toggleUnderline,
 toggleBulletList,
 toggleOrderedList,
 toggleCode,
 setLink,
 removeLink,
 isBold,
 isItalic,
 isUnderline,
 isBulletList,
 isOrderedList,
 isCode,
 isLinkActive

} from '@/features/inbox/application/composer'

import { EditorAdapter }
from '@/features/inbox/infrastructure/editor/editor.interface'

import { ComposerShortcutsPopover }
from './ComposerShortcutsPopover'

type Props={
 editor:EditorAdapter | null
}

export function ComposerToolbar({
 editor
}:Props){

 const [showLink,setShowLink]=useState(false)
 const [showShortcuts,setShowShortcuts]=useState(false)

 const [url,setUrl]=useState('')
 const [,setVersion]=useState(0)

 const inputRef=
 useRef<HTMLInputElement>(null)

 const popRef=
 useRef<HTMLDivElement>(null)

 /* REACTIVE STATE */

 useEffect(()=>{

  if(!editor) return

  const update=()=>{

   setVersion(v=>v+1)

  }

  editor.onUpdate(update)

 },[editor])

 /* autofocus */

 useEffect(()=>{

  if(!showLink) return

  requestAnimationFrame(()=>{

   inputRef.current?.focus()

  })

  if(editor){

   const link=
    editor.getLink()

   if(link)
    setUrl(link)

  }

 },[showLink,editor])

 /* outside click */

 useEffect(()=>{

  function click(e:any){

   if(
    popRef.current &&
    !popRef.current.contains(e.target)
   ){

    setShowLink(false)

   }

  }

  if(showLink){

   document.addEventListener(
    'mousedown',
    click
   )

  }

  return()=>{

   document.removeEventListener(
    'mousedown',
    click
   )

  }

 },[showLink])

 if(!editor) return null

 function btn(active:boolean){

  return clsx(

   'w-8 h-8 flex items-center justify-center rounded-md transition',

   active
   ?'bg-gray-200 text-black'
   :'text-gray-600 hover:bg-gray-100'

  )

 }

 function normalizeUrl(value:string){

  if(!value) return ''

  if(
   !value.startsWith('http://') &&
   !value.startsWith('https://')
  ){

   return 'https://'+value

  }

  return value

 }

 function applyLink(){

  if(!url){

   removeLink(editor)

   setShowLink(false)

   editor.focus()

   return

  }

  setLink(
   editor,
   normalizeUrl(url)
  )

  setShowLink(false)

  editor.focus()

 }

 return(

  <div className="relative flex items-center gap-1">

   {/* TEXT */}

   <div className="flex items-center gap-1">

    <button

     title="Bold (Ctrl+B)"

     className={btn(
      isBold(editor)
     )}

     onClick={()=>{

      toggleBold(editor)
      editor.focus()

     }}

    >
     <Bold size={15}/>
    </button>

    <button

     title="Italic (Ctrl+I)"

     className={btn(
      isItalic(editor)
     )}

     onClick={()=>{

      toggleItalic(editor)
      editor.focus()

     }}

    >
     <Italic size={15}/>
    </button>

    <button

     title="Underline (Ctrl+U)"

     className={btn(
      isUnderline(editor)
     )}

     onClick={()=>{

      toggleUnderline(editor)
      editor.focus()

     }}

    >
     <Underline size={15}/>
    </button>

   </div>

   <div className="mx-1 w-px h-5 bg-gray-200"/>

   {/* LIST */}

   <div className="flex items-center gap-1">

    <button

     title="Bullet list"

     className={btn(
      isBulletList(editor)
     )}

     onClick={()=>{

      toggleBulletList(editor)
      editor.focus()

     }}

    >
     <List size={15}/>
    </button>

    <button

     title="Numbered list"

     className={btn(
      isOrderedList(editor)
     )}

     onClick={()=>{

      toggleOrderedList(editor)
      editor.focus()

     }}

    >
     <ListOrdered size={15}/>
    </button>

   </div>

   <div className="mx-1 w-px h-5 bg-gray-200"/>

   {/* LINK */}

   <div className="flex items-center gap-1">

    <button

     title="Insert link"

     className={btn(
      isLinkActive(editor)
     )}

     onClick={()=>
      setShowLink(!showLink)
     }

    >

     <LinkIcon size={15}/>

    </button>

   </div>

   <div className="mx-1 w-px h-5 bg-gray-200"/>

   {/* CODE */}

   <div className="flex items-center gap-1">

    <button

     title="Inline code"

     className={btn(
      isCode(editor)
     )}

     onClick={()=>{

      toggleCode(editor)
      editor.focus()

     }}

    >

     <Code size={15}/>

    </button>

   </div>

   <div className="mx-1 w-px h-5 bg-gray-200"/>

   {/* SHORTCUTS */}

   <div className="flex items-center gap-1">

    <button

     title="Keyboard shortcuts (Ctrl+/)"

     className={clsx(

      'w-8 h-8 flex items-center justify-center rounded-md transition',

      showShortcuts
       ?'bg-gray-200 text-black'
       :'text-gray-600 hover:bg-gray-100'

     )}

     onClick={()=>
      setShowShortcuts(
       v=>!v
      )
     }

    >

     <Keyboard size={15}/>

    </button>

   </div>

   {/* LINK POPOVER */}

   {showLink && (

    <div

     ref={popRef}

     className="absolute top-11 left-0 bg-white border rounded-lg shadow-xl p-2 flex gap-2 items-center z-50"

    >

     <input

      ref={inputRef}

      value={url}

      onChange={(e)=>
       setUrl(e.target.value)
      }

      onKeyDown={(e)=>{

       if(e.key==='Enter'){

        e.preventDefault()
        applyLink()

       }

       if(e.key==='Escape'){

        setShowLink(false)

       }

      }}

      placeholder="Paste link…"

      className="text-sm border rounded-md px-2 py-1 w-[240px] focus:outline-none focus:ring-1 focus:ring-blue-500"

     />

     <button

      onClick={applyLink}

      className="text-xs px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"

     >

      Apply

     </button>

     <button

      title="Remove link"

      onClick={()=>{

       removeLink(editor)

       setShowLink(false)

       editor.focus()

      }}

      className="p-1 hover:bg-gray-100 rounded"

     >

      <X size={14}/>

     </button>

    </div>

   )}

   {/* SHORTCUT POPOVER */}

   <ComposerShortcutsPopover

    open={showShortcuts}

    onClose={()=>
     setShowShortcuts(false)
    }

   />

  </div>

 )
}