// app/(app)/inbox/conversation/components/composer/ComposerShortcutsPopover.tsx
'use client'

import { useEffect,useRef } from 'react'

import { composerShortcuts }
from '@/features/inbox/application/composer'

type Props={

 open:boolean

 onClose:()=>void

}

export function ComposerShortcutsPopover({

 open,
 onClose

}:Props){

 const ref=useRef<HTMLDivElement>(null)

 /* outside click */

 useEffect(()=>{

  function click(e:any){

   if(

    ref.current &&
    !ref.current.contains(e.target)

   ){

    onClose()

   }

  }

  if(open){

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

 },[open,onClose])

 /* escape */

 useEffect(()=>{

  function esc(e:KeyboardEvent){

   if(e.key==='Escape')

    onClose()

  }

  if(open){

   document.addEventListener(
    'keydown',
    esc
   )

  }

  return()=>{

   document.removeEventListener(
    'keydown',
    esc
   )

  }

 },[open,onClose])

 if(!open)
  return null

 return(

  <div

   className="

    absolute

    bottom-14
    right-3

    bg-white

    border

    rounded-lg

    shadow-xl

    p-3

    w-[260px]

    z-50

   "

   ref={ref}

  >

   <div className="

    text-xs

    font-semibold

    text-gray-500

    mb-2

   ">

    Keyboard shortcuts

   </div>

   <div className="flex flex-col gap-1">

    {composerShortcuts.map(

     (s)=>(

      <div

       key={s.key}

       className="

        flex

        items-center

        justify-between

        text-xs

        py-1

       "

      >

       <span className="text-gray-600">

        {s.label}

       </span>

       <span className="

        bg-gray-100

        px-2 py-0.5

        rounded

        text-gray-700

        font-mono

       ">

        {s.key}

       </span>

      </div>

     )

    )}

   </div>

  </div>

 )
}