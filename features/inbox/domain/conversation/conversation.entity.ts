import {

 Conversation

} from './conversation.types'

import {

 Message

} from '../message/message.types'

/* =========================
 Add message
========================= */

export function addMessage(

 conversation:Conversation,

 message:Message

):Conversation{

 const messages = [

  ...(conversation.messages || [])

 ]

 const exists = messages.find(
  m=>m.id===message.id
 )

 if(!exists)
  messages.push(message)

 return{

  ...conversation,

  messages,

  lastMessage:message,

  updatedAt:
   message.meta.createdAt

 }

}

export function updateLastMessage(

 conversation:Conversation,

 message:Message

):Conversation{

 return{

  ...conversation,

  lastMessage:message,

  updatedAt:
   message.meta.createdAt

 }

}

/* =========================
 Mark read
========================= */

export function markConversationRead(

 conversation:Conversation

):Conversation{

 return{

  ...conversation,

  unreadCount:0

 }

}

/* =========================
 Update unread count
========================= */

export function updateUnread(

 conversation:Conversation,

 count:number

):Conversation{

 return{

  ...conversation,

  unreadCount:count

 }

}

/* =========================
 Increment unread (important)
========================= */

export function incrementUnread(

 conversation:Conversation

):Conversation{

 return{

  ...conversation,

  unreadCount:
   conversation.unreadCount + 1

 }

}
