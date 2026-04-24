// features/inbox/application/realtime/useConversationRealtime.ts

import { useConversationStream }
from './useConversationStream'

import {
 mapRealtimeMessageDTO
}
from '@/features/inbox/infrastructure/mappers/message.realtime.mapper'

type Props={

 conversationId:string | null

 onMessage?:(dto:any)=>void

 onConversationUpdate?:(updates:any)=>void

 onUnread?:(count:number)=>void

 onDeliveryUpdate?:(
  messageId:string,
  clientId:string,
  status:string
 )=>void

 onAIUpdate?:(payload:any)=>void

 onAISuggestion?:(payload:any)=>void

}

export function useConversationRealtime({

 conversationId,

 onMessage,

 onConversationUpdate,

 onUnread,

 onDeliveryUpdate,

 onAIUpdate,

 onAISuggestion

}:Props){

 useConversationStream(

  conversationId,

  {

   /* new messages */

   message_received:(dto)=>{

    const message =
     mapRealtimeMessageDTO(dto)

    if(!message?.clientId){

     console.warn(
      'CLIENT_ID_MISSING_FROM_SSE',
      dto
     )

    }

    if(onMessage){
     onMessage(message)
    }

   },

   /* delivery lifecycle */

   message_sent:(payload)=>{

    if(onDeliveryUpdate){

     onDeliveryUpdate(

      payload.message_id,

      payload.client_id,

      'sent'

     )

    }

   },

   message_delivered:(payload)=>{

    if(onDeliveryUpdate){

     onDeliveryUpdate(

      payload.message_id,

      payload.client_id,

      'delivered'

     )

    }

   },

   message_read:(payload)=>{

    if(onDeliveryUpdate){

     onDeliveryUpdate(

      payload.message_id,

      payload.client_id,

      'read'

     )

    }

   },

   message_failed:(payload)=>{

    if(onDeliveryUpdate){

     onDeliveryUpdate(

      payload.message_id,

      payload.client_id,

      'failed'

     )

    }

   },

   /* AI */

   ai_run_updated:(payload)=>{

    if(onAIUpdate){
     onAIUpdate(payload)
    }

   },

   ai_suggestion_ready:(payload)=>{

    if(onAISuggestion){
     onAISuggestion(payload)
    }

   },

   /* conversation */

   conversation_updated:(updates)=>{

    if(onConversationUpdate){

     onConversationUpdate(
      updates
     )

    }

   },

   unread_changed:(payload)=>{

    if(onUnread){

     onUnread(
      payload.unread_count
     )

    }

   }

  }

 )

}