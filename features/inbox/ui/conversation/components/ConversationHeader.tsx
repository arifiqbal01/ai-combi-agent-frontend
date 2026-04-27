'use client'

import { useInboxContext } from '@/features/inbox/ui/context/inbox-context'

import {
 Conversation
} from '@/features/inbox/domain/conversation/conversation.types'

import { ChevronLeft } from 'lucide-react'

type Props = {
 conversation: Conversation
}

export function ConversationHeader({
 conversation
}: Props) {

 const { clearSelection } = useInboxContext()

 const email =
  conversation.sender || 'Unknown'

 const subject =
  conversation.subject || 'No subject'

 return (

  <div className="
    flex items-center justify-between
    px-3 sm:px-4 py-2.5
    border-b border-border-subtle
    bg-bg-surface
    gap-3
  ">

   {/* LEFT SECTION */}
   <div className="flex items-center gap-2 min-w-0">

     {/* 🔥 BACK ARROW (INLINE, CLEAN) */}
     <button
       onClick={clearSelection}
       className="
         md:hidden
         flex items-center justify-center
         shrink-0

         h-8 w-8

         rounded-full
         hover:bg-bg-muted
         active:scale-95
         transition
       "
     >
       <ChevronLeft size={18} />
     </button>

     {/* TEXT */}
     <div className="flex flex-col min-w-0">

       {/* EMAIL / NAME */}
       <div className="
         text-[13px]
         font-semibold
         text-text-primary
         truncate
       ">
         {email}
       </div>

       {/* SUBJECT / PREVIEW */}
       <div className="
         text-[11px]
         text-text-muted
         truncate
       ">
         {subject}
       </div>

     </div>

   </div>

   {/* RIGHT SECTION (CHANNEL) */}
   <div className="
     text-[11px]
     text-text-muted
     shrink-0
   ">
     {conversation.channel}
   </div>

  </div>

 )
}