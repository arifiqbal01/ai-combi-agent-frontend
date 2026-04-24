import {

 applyConversationUpdate,
 updateUnreadCount

}
from '@/features/inbox/domain/conversation/conversation.sync.engine'

export function conversationMetaReducer(

 conversation:any,

 action:any

){

 if(!conversation) return conversation

 switch(action.type){

 case 'CONVERSATION_UPDATE':

  return applyConversationUpdate(

   conversation,

   action.payload

  )

 case 'UNREAD_UPDATE':

  return updateUnreadCount(

   conversation,

   action.payload

  )

 default:

  return conversation

 }

}