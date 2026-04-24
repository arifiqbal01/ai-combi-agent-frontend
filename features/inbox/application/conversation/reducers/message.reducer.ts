import {
  applyDeliveryUpdate
} from '@/features/inbox/domain/message/message.reconciliation.engine'

export function messageReducer(
  conversation: any,
  action: any
){

  if(!conversation)
    return conversation

  /* 🔥 helper: normalize backend status */
  function normalizeStatus(message:any){
    if(!message?.meta) return message

    // 🔥 TEMP FIX: pending → sent
    if(message.meta.status === 'pending'){
      return {
        ...message,
        meta: {
          ...message.meta,
          status: 'sent'
        },
        syncState: 'sent'
      }
    }

    return message
  }

  switch(action.type){

    /* =========================
       ADD OPTIMISTIC MESSAGE
    ========================= */

    case 'MESSAGE_ADD':{

      const messages=[
        ...(conversation.messages || []),
        action.payload
      ]

      const index=
        new Map(conversation.messageIndex || [])

      const newIndex=
        messages.length-1

      index.set(action.payload.id, newIndex)

      if(action.payload.clientId){
        index.set(action.payload.clientId, newIndex)
      }

      return{
        ...conversation,
        messages,
        messageIndex:index,
        lastMessage:action.payload
      }
    }

    /* =========================
       RECONCILE SERVER MESSAGE
    ========================= */

    case 'MESSAGE_RECONCILE':{

      const index=
        new Map(conversation.messageIndex || [])

      let existingIndex

      const incoming =
        normalizeStatus(action.payload)   // 🔥 APPLY FIX HERE

      if(incoming.clientId){
        existingIndex =
          index.get(incoming.clientId)
      }

      if(existingIndex===undefined){
        existingIndex =
          index.get(incoming.id)
      }

      /* not found → append */
      if(existingIndex===undefined){

        const messages=[
          ...(conversation.messages || []),
          incoming
        ]

        const newIndex=
          messages.length-1

        index.set(incoming.id, newIndex)

        if(incoming.clientId){
          index.set(incoming.clientId, newIndex)
        }

        return{
          ...conversation,
          messages,
          messageIndex:index,
          lastMessage:incoming
        }
      }

      /* replace optimistic */
      const messages=[
        ...(conversation.messages || [])
      ]

      messages[existingIndex] = incoming

      index.set(incoming.id, existingIndex)

      if(incoming.clientId){
        index.set(incoming.clientId, existingIndex)
      }

      return{
        ...conversation,
        messages,
        messageIndex:index,
        lastMessage:incoming
      }
    }

    /* =========================
       DELIVERY UPDATE
    ========================= */

    case 'DELIVERY_UPDATE':{

      return{
        ...conversation,
        messages:
          applyDeliveryUpdate(
            conversation.messages || [],
            action.payload.messageId,
            action.payload.clientId,
            action.payload.status
          )
      }
    }

    default:
      return conversation
  }
}