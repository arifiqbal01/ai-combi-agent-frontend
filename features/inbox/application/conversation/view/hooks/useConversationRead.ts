'use client'

import {

 useState,
 useCallback

} from 'react'

import {

 markMessageRead

} from '@/features/inbox/infrastructure/api/message.api'

import {

 Message

} from '@/features/inbox/domain/message/message.types'

export function useConversationRead(){

 const [loading,setLoading]=
  useState(false)

 const markRead=
 useCallback(

  async(messageId:string)=>{

   if(!messageId)
    return

   setLoading(true)

   try{

    await markMessageRead(
     messageId
    )

   }
   finally{

    setLoading(false)

   }

  },

  []

 )

/* mark latest inbound */

 const markLatestInbound=

 useCallback(

  async(messages:Message[])=>{

   const inbound=

    messages

     .slice()

     .reverse()

     .find(

      m=>m.direction==='in'   // ✅ backend enum

     )

   if(!inbound)
    return

   await markRead(
    inbound.id
   )

  },

  [markRead]

 )

 return{

  markRead,

  markLatestInbound,

  loading

 }
}