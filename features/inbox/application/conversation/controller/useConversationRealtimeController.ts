'use client'

import { useCallback } from 'react'

import { useConversationRealtime }
from '@/features/inbox/application/realtime/useConversationRealtime'

type Props = {
  conversationId: string | null
  dispatch: any
}

export function useConversationRealtimeController({
  conversationId,
  dispatch
}: Props) {

  const handleMessage = useCallback((message: any) => {
    dispatch({
      type: 'MESSAGE_RECONCILE',
      payload: message
    })
  }, [dispatch])

  const handleConversationUpdate = useCallback((updates: any) => {
    dispatch({
      type: 'CONVERSATION_UPDATE',
      payload: updates
    })
  }, [dispatch])

  const handleUnread = useCallback((count: number) => {
    dispatch({
      type: 'UNREAD_UPDATE',
      payload: count
    })
  }, [dispatch])

  const handleDelivery = useCallback((
    messageId: string,
    clientId: string,
    status: string
  ) => {
    dispatch({
      type: 'DELIVERY_UPDATE',
      payload: {
        messageId,
        clientId,
        status
      }
    })
  }, [dispatch])

  const handleAIUpdate = useCallback((payload: any) => {
    dispatch({
      type: 'AI_RUN_UPDATE',
      payload
    })
  }, [dispatch])

  const handleAISuggestion = useCallback((payload: any) => {
    dispatch({
      type: 'AI_SUGGESTION',
      payload
    })
  }, [dispatch])

  useConversationRealtime({
    conversationId,
    onMessage: handleMessage,
    onConversationUpdate: handleConversationUpdate,
    onUnread: handleUnread,
    onDeliveryUpdate: handleDelivery,
    onAIUpdate: handleAIUpdate,
    onAISuggestion: handleAISuggestion
  })
}