// feature/inbox/domain/conversation/conversation.sync.engine.ts

import {

 Conversation

} from './conversation.types'

/* ---------------------------
 unread updates
--------------------------- */

export function updateUnreadCount(

 conversation:Conversation,

 unread:number

):Conversation{

 return{

  ...conversation,

  unreadCount:unread

 }

}

/* ---------------------------
 conversation updates
--------------------------- */

export function applyConversationUpdate(

 conversation:Conversation,

 updates:Partial<Conversation>

):Conversation{

 return{

  ...conversation,

  ...updates

 }

}

/* ---------------------------
 ordering safety
--------------------------- */

export function ensureMessageOrder(

 conversation:Conversation

):Conversation{

 if(!conversation.messages)
  return conversation

 const ordered=[

  ...conversation.messages

 ].sort(

  (a,b)=>

   new Date(
    a.meta.createdAt
   ).getTime()

   -

   new Date(
    b.meta.createdAt
   ).getTime()

 )

 return{

  ...conversation,

  messages:ordered

 }

}

/* ---------------------------
 dedupe protection
--------------------------- */

export function dedupeMessages(

 conversation:Conversation

):Conversation{

 if(!conversation.messages)
  return conversation

 const map=
  new Map()

 conversation.messages.forEach((m)=>{

  const key =

   m.clientId ||

   m.id

  map.set(key,m)

 })

 return{

  ...conversation,

  messages:

   Array.from(
    map.values()
   )

 }

}