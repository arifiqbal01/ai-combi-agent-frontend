import {

 Message,
 DeliveryStatus

} from './message.types'

export function applyDeliveryUpdate(

 messages:Message[],

 messageId:string,

 clientId:string | undefined,

 status:DeliveryStatus

):Message[]{

 return messages.map(m=>{

  if(
   m.id===messageId ||
   (clientId && m.clientId===clientId)
  ){

   /* prevent status regression */
   if(
    m.meta?.status === 'read' &&
    status !== 'read'
   ){
    return m
   }

   return{

    ...m,

    meta:{
     ...m.meta,
     status
    }

   }

  }

  return m

 })

}