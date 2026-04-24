import { useEffect,useState,useCallback } from 'react'

import {
 listConversations
} from '@/features/inbox/infrastructure/api/conversation.api'

import {
 mapConversationDTO
} from '@/features/inbox/infrastructure/mappers/conversation.mapper'

import {
 Conversation
} from '@/features/inbox/domain/conversation/conversation.types'

export function useConversationList(){

 const [items,setItems]=
  useState<Conversation[]>([])

 const [loading,setLoading]=
  useState(false)

 const refresh=
 useCallback(async()=>{

  setLoading(true)

  try{

   const res=
    await listConversations()

   setItems(

    res.conversations.map(
     mapConversationDTO
    )

   )

  }
  finally{

   setLoading(false)

  }

 },[])

 useEffect(()=>{

  refresh()

 },[refresh])

 return{

  items,

  loading,

  refresh

 }

}