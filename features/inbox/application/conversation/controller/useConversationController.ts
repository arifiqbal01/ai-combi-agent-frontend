'use client'

import { useEffect, useMemo, useReducer } from 'react'

import { useConversation } from '../view/hooks'
import { useConversationTimeline } from '../timeline'

import { useSendMessage } from '../actions/sendMessage.usecase'
import { useReplyMessage } from '../actions/replyMessage.usecase'
import { useMarkConversationRead } from '../actions/markRead.usecase'

import { conversationReducer } from '../reducers/conversation.reducer'

import { useConversationSendController } from './useConversationSendController'
import { useConversationReadController } from './useConversationReadController'
import { useConversationDerivedState } from './useConversationDerivedState'

import { selectAllMessages } from '../selectors/conversation.selectors'

type Props = {
  conversationId: string | null
}

export function useConversationController({
  conversationId,
}: Props) {

  /* =========================
     🔥 REACT QUERY (FIXED)
  ========================= */

  const {
    data: conversation,
    isLoading: loading
  } = useConversation(conversationId)

  const send = useSendMessage()
  const reply = useReplyMessage()
  const read = useMarkConversationRead()

  const [state, dispatch] = useReducer(
    conversationReducer,
    {
      conversation: null,
      aiRun: null,
      aiSuggestion: null,
    }
  )

  /* =========================
     🔥 SYNC FROM SERVER (FIXED)
     (important for polling updates)
  ========================= */

  useEffect(() => {
    if (!conversation) return

    dispatch({
      type: 'SET_CONVERSATION',
      payload: conversation,
    })
  }, [conversation])   // ✅ FULL OBJECT (not just id)

  /* =========================
     🔥 SAFE MESSAGE SELECTOR
  ========================= */

  const messages = useMemo(
    () => selectAllMessages(state),
    [state.conversation?.messages]
  )

  /* =========================
     🔥 TIMELINE (STABLE)
  ========================= */

  const timeline =
    useConversationTimeline(
      state.conversation
        ? {
            ...state.conversation,
            messages,
          }
        : null
    )

  /* =========================
     🔥 SEND / REPLY (GUARDED)
  ========================= */

  const {
    sendMessage,
    replyMessage,
    retryMessage,
  } = useConversationSendController({
    conversationId,
    dispatch,
    send,
    reply,
  })

  /* =========================
     🔥 READ CONTROLLER (SAFE)
  ========================= */

  useConversationReadController({
    messages,
    read,
    dispatch
  })

  /* =========================
     🔥 DERIVED STATE
  ========================= */

  const {
    lastInboundMessageId,
    canReply,
  } = useConversationDerivedState(state)

  /* =========================
     🔥 HARD GUARD (IMPORTANT)
  ========================= */

  const isReady =
    !!conversationId &&
    !!state.conversation &&
    !loading

  return {
    state,

    conversation: state.conversation,

    messages,
    timeline,

    loading,
    isReady,

    /* 🚀 guarded actions */
    sendMessage: isReady ? sendMessage : () => {},
    replyMessage: isReady ? replyMessage : () => {},
    retryMessage: isReady ? retryMessage : () => {},

    lastInboundMessageId,
    canReply,
  }
}