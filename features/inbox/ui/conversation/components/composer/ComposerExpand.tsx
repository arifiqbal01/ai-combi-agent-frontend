'use client'

import {
 Minimize2,
 Maximize2
} from 'lucide-react'

export function ComposerExpand({

 expanded,
 onToggle

}){

 return(

  <button

   onClick={onToggle}

   className="p-1.5 hover:bg-gray-100 rounded"

  >

   {expanded
    ?<Minimize2 size={16}/>
    :<Maximize2 size={16}/>
   }

  </button>

 )
}