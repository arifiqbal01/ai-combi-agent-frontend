import {useCallback}
from 'react'

import {
 createOptimisticMessage
}
from '@/features/inbox/domain/message/message.sync.engine'

export function useConversationSendController({

 conversationId,

 dispatch,

 send,

 reply

}:any){

 const sendMessage=useCallback(

 async(params:any)=>{

  if(!conversationId) return

  const optimistic=

   createOptimisticMessage(

    params.body,

    params.attachments||[]

   )

  dispatch({

   type:'MESSAGE_ADD',

   payload:optimistic

  })

  try{

   await send.execute({

    ...params,

    conversationId,

    clientId: optimistic.clientId   /* FIX */

   })

  }
  catch{

   dispatch({

    type:'DELIVERY_UPDATE',

    payload:{
     messageId:optimistic.id,
     clientId:optimistic.clientId,
     status:'failed'
    }

   })

  }

 },

 [conversationId,send,dispatch]

 )

 const replyMessage=useCallback(

 async(params:any)=>{

  if(!conversationId) return

  const optimistic=

   createOptimisticMessage(

    params.body,

    params.attachments||[]

   )

  dispatch({

   type:'MESSAGE_ADD',

   payload:optimistic

  })

  try{

    console.log("SEND CLIENT ID", optimistic.clientId)

   await reply.execute({

    ...params,

    conversationId,

    clientId: optimistic.clientId   /* FIX */

   })

  }
  catch{

   dispatch({

    type:'DELIVERY_UPDATE',

    payload:{
     messageId:optimistic.id,
     clientId:optimistic.clientId,
     status:'failed'
    }

   })

  }

 },

 [conversationId,reply,dispatch]

 )

 const retryMessage=useCallback(

 async(message:any,params:any)=>{

  dispatch({

   type:'DELIVERY_UPDATE',

   payload:{
    messageId:message.id,
    clientId:message.clientId,
    status:'pending'
   }

  })

  try{

   await send.execute({

    ...params,

    conversationId,

    clientId: message.clientId   /* FIX */

   })

  }
  catch{

   dispatch({

    type:'DELIVERY_UPDATE',

    payload:{
     messageId:message.id,
     clientId:message.clientId,
     status:'failed'
    }

   })

  }

 },

 [conversationId,send,dispatch]

 )

 return{

  sendMessage,

  replyMessage,

  retryMessage

 }

}