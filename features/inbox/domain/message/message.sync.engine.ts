import {

 Message,
 MessageSyncState,
 MessageDirection,
 MessageKind,
 MessageAuthorType,
 DeliveryStatus

} from './message.types'

import {

 isFailed

} from './message.delivery.rules'

export type SyncableMessage =
 Message & {

 syncState?:MessageSyncState

 tempId?:string

}

/* ---------------------------
 state transitions
--------------------------- */

export function markSending(

 message:SyncableMessage

):SyncableMessage{

 return{

  ...message,

  syncState:MessageSyncState.SENDING,

  meta:{
   ...message.meta,
   status:DeliveryStatus.PENDING
  }

 }

}

export function markSent(

 message:SyncableMessage

):SyncableMessage{

 /* prevent regression */
 if(message.meta.status===DeliveryStatus.READ)
  return message

 return{

  ...message,

  syncState:MessageSyncState.SENT,

  meta:{
   ...message.meta,
   status:DeliveryStatus.SENT
  }

 }

}

export function markDelivered(

 message:SyncableMessage

):SyncableMessage{

 if(
  message.meta.status===DeliveryStatus.READ
 )
  return message

 return{

  ...message,

  syncState:MessageSyncState.DELIVERED,

  meta:{
   ...message.meta,
   status:DeliveryStatus.DELIVERED
  }

 }

}

export function markRead(

 message:SyncableMessage

):SyncableMessage{

 return{

  ...message,

  syncState:MessageSyncState.READ,

  meta:{
   ...message.meta,
   status:DeliveryStatus.READ
  }

 }

}

export function markFailed(

 message:SyncableMessage

):SyncableMessage{

 /* don't override delivered/read */
 if(
  message.meta.status===DeliveryStatus.DELIVERED ||
  message.meta.status===DeliveryStatus.READ
 )
  return message

 return{

  ...message,

  syncState:MessageSyncState.FAILED,

  meta:{
   ...message.meta,
   status:DeliveryStatus.FAILED
  }

 }

}

/* ---------------------------
 retry logic
--------------------------- */

export function canRetryMessage(

 message:SyncableMessage

):boolean{

 if(
  message.syncState===
  MessageSyncState.FAILED
 )
  return true

 if(
  isFailed(
   message.meta.status
  )
 )
  return true

 return false

}

export function retryMessage(

 message:SyncableMessage

):SyncableMessage{

 return{

  ...message,

  syncState:
   MessageSyncState.SENDING,

  meta:{
   ...message.meta,
   status:DeliveryStatus.PENDING
  }

 }

}

/* ---------------------------
 optimistic creation
--------------------------- */

export function createOptimisticMessage(

 body:string,

 attachments:any[]=[]

):SyncableMessage{

 const now =
  new Date().toISOString()

 const tempId =
  `temp-${crypto.randomUUID()}`

 const clientId =
  crypto.randomUUID()

 const normalizedAttachments =
  attachments.map((a,index)=>({

   ...a,

   id:

    a.id ||

    `temp-file-${crypto.randomUUID()}`

 }))

 return{

  id:tempId,

  tempId,

  clientId,

  direction:
   MessageDirection.OUTBOUND,

  kind:
   MessageKind.HUMAN,

  bodyText:body,

  bodyHtml:body,

  author:{

   name:'You',

   type:
    MessageAuthorType.HUMAN

  },

  attachments:
   normalizedAttachments,

  participants:[],

  meta:{

   createdAt:now,

   displayTime:

    new Date(now)
     .toLocaleTimeString([],{

      hour:'2-digit',
      minute:'2-digit'

     }),

   status:
    DeliveryStatus.PENDING

  },

  syncState:
   MessageSyncState.SENDING

 }

}