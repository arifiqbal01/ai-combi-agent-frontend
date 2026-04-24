'use client'

import { RefreshCw } from 'lucide-react'

type Props={

 onRefresh:()=>void

}

export function ConversationListHeader({

 onRefresh

}:Props){

 return(

  <header className="
   flex
   items-center
   justify-between
   border-b
   border-border-subtle
   px-4
   py-3
  ">

   <div className="
    text-sm
    font-medium
    text-text-primary
   ">

    Inbox

   </div>

   <button

    onClick={onRefresh}

    className="
     flex
     items-center
     gap-2
     text-xs
     text-text-muted
     hover:text-text-primary
     transition-colors
    "

   >

    <RefreshCw size={14}/>

    Refresh

   </button>

  </header>

 )

}