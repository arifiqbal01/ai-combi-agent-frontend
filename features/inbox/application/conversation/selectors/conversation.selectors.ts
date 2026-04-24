import { ConversationState }
from '../types/conversation.types'

import {
 isInbound
} from '../../../domain/message'

export function selectConversation(
 state:ConversationState
){
 return state.conversation
}

export function selectMessages(
 state:ConversationState
){

 if(!state.conversation)
  return []

 return state.conversation.messages || []

}

/* single source of truth */
export function selectAllMessages(
 state:ConversationState
){

 const messages =
  selectMessages(state)

 return [...messages].sort(
  (a,b)=>
   new Date(a.meta.createdAt).getTime()
   -
   new Date(b.meta.createdAt).getTime()
 )

}

/* last message */
export function selectLastMessageId(
 state:ConversationState
){

 const all =
  selectAllMessages(state)

 if(!all.length)
  return null

 return all[all.length-1].id

}

/* correct reply selector */
export function selectLastInboundMessageId(
 state:ConversationState
){

 const messages =
  selectAllMessages(state)

 for(
  let i = messages.length-1;
  i >= 0;
  i--
 ){

  const m = messages[i]

  if(
   isInbound(m) &&
   !m.tempId &&
   m.kind === 'human'
  ){
   return m.id
  }

 }

 return null

}

/* enterprise safe helper */
export function selectCanReply(
 state:ConversationState
){

 return !!selectLastInboundMessageId(
  state
 )

}