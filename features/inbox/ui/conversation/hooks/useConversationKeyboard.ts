'use client'

import { useCallback } from 'react'

type Props={

 editor:any

 onSend:()=>void

 onEscape?:()=>void

 onExpand?:()=>void

}

export function useConversationKeyboard({

 editor,
 onSend,
 onEscape,
 onExpand

}:Props){

 return useCallback(

  (event:KeyboardEvent)=>{

   if(!editor) return

   if(event.repeat)
    return

   const mod =
    event.ctrlKey ||
    event.metaKey

   /* SEND */

   if(

    event.key==='Enter' &&
    mod

   ){

    event.preventDefault()

    const text=
     editor.getText()

    if(!text.trim())
     return

    onSend()

    return

   }

   /* ESCAPE */

   if(event.key==='Escape'){

    onEscape?.()

    return

   }

   /* EXPAND */

   if(

    mod &&
    event.shiftKey &&
    event.key.toLowerCase()==='e'

   ){

    event.preventDefault()

    onExpand?.()

    return

   }

   /* BOLD */

   if(
    mod &&
    event.key.toLowerCase()==='b'
   ){

    event.preventDefault()

    editor
     .chain()
     .focus()
     .toggleBold()
     .run()

    return

   }

   /* ITALIC */

   if(
    mod &&
    event.key.toLowerCase()==='i'
   ){

    event.preventDefault()

    editor
     .chain()
     .focus()
     .toggleItalic()
     .run()

    return

   }

   /* UNDERLINE */

   if(
    mod &&
    event.key.toLowerCase()==='u'
   ){

    event.preventDefault()

    editor
     .chain()
     .focus()
     .toggleUnderline()
     .run()

    return

   }

   /* BULLET LIST */

   if(

    mod &&
    event.shiftKey &&
    event.key==='8'

   ){

    event.preventDefault()

    editor
     .chain()
     .focus()
     .toggleBulletList()
     .run()

    return

   }

   /* ORDERED LIST */

   if(

    mod &&
    event.shiftKey &&
    event.key==='7'

   ){

    event.preventDefault()

    editor
     .chain()
     .focus()
     .toggleOrderedList()
     .run()

    return

   }

   /* LINK */

   if(
    mod &&
    event.key.toLowerCase()==='k'
   ){

    event.preventDefault()

    const url =
     prompt('Enter URL')

    if(!url) return

    editor
     .chain()
     .focus()
     .setLink({

      href:url

     })
     .run()

   }

  },

  [

   editor,
   onSend,
   onEscape,
   onExpand

  ]

 )
}