import { Conversation }
from '@/features/inbox/domain/conversation/conversation.types'

import {

 getLastMessage

} from '@/features/inbox/domain/conversation/conversation.selectors'

export type ConversationViewVM={

 id:string

 subject:string

 unread:number

 identity:string

 preview:string

}

export function mapConversationToViewVM(

 conversation:Conversation

):ConversationViewVM{

 const last=
  getLastMessage(
   conversation
  )

 return{

  id:conversation.id,

  subject:

   conversation.subject ||

   '(No subject)',

  unread:
   conversation.unreadCount,

  identity:

   conversation.participants?.[0]?.address ||

   'Unknown',

  preview:

   last?.bodyText ||

   last?.subject ||

   ''

 }

}