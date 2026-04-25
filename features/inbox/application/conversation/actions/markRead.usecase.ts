import { useState } from 'react'

import {
  markMessageRead
} from '@/features/inbox/infrastructure/api/message.api'

import {
  Message,
  isInbound
} from '@/features/inbox/domain/message'

export function useMarkConversationRead(){

  const [loading,setLoading] =
    useState(false)

  async function markRead(
    messageId:string
  ){
    if(!messageId) return

    setLoading(true)

    try{
      await markMessageRead(messageId)
    }
    finally{
      setLoading(false)
    }
  }

  async function markLatestInbound(
    messages:Message[]
  ){

    const latestInbound =
      [...messages]
        .reverse()
        .find(isInbound)

    if(!latestInbound) return

    await markRead(
      latestInbound.id
    )
  }

  return{
    markRead,
    markLatestInbound,
    loading
  }
}