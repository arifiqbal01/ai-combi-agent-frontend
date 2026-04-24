'use client'

import {
 Conversation
}
from '@/features/inbox/domain/conversation/conversation.types'

type Props={

 conversation:Conversation

}

export function ConversationHeader({

 conversation

}:Props){

 const email=

 conversation.sender ||
 'Unknown'

 const subject=

 conversation.subject ||
 'No subject'

 return(

  <div className="
   flex
   items-center
   justify-between
   border-b
   border-border-subtle
   px-4
   py-3
  ">

   <div>

{/* EMAIL */}

    <div className="
     text-sm
     font-semibold
     text-text-primary
    ">

     {email}

    </div>

{/* SUBJECT */}

    <div className="
     text-xs
     text-text-muted
     mt-0.5
    ">

     {subject}

    </div>

   </div>

{/* channel */}

   <div className="
    text-xs
    text-text-muted
   ">

    {conversation.channel}

   </div>

  </div>

 )
}