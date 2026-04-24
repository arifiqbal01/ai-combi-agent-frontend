'use client'

import {
 useEffect,
 useRef
} from 'react'

const emojis=[
 '😀','😂','👍','🔥','🎉','❤️'
]

export function ComposerEmoji({

 onSelect,
 onClose

}){

 const ref=useRef(null)

 useEffect(()=>{

  function click(e:any){

   if(
    ref.current &&
    !ref.current.contains(e.target)
   ){

    onClose()

   }

  }

  document.addEventListener('mousedown',click)

  return()=>{

   document.removeEventListener(
    'mousedown',
    click
   )

  }

 },[])

 return(

  <div

   ref={ref}

   className="

    bg-white
    border
    rounded-lg

    p-2

    shadow

    flex gap-2

   "

  >

   {emojis.map(e=>(

    <button

     key={e}

     onClick={()=>onSelect(e)}

     className="text-lg"

    >

     {e}

    </button>

   ))}

  </div>

 )
}