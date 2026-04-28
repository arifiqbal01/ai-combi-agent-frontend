'use client'

import { useEffect, useMemo, useReducer, useState } from 'react'

import { useConversation } from '../view/hooks'
import { useConversationTimeline } from '../timeline'

import { useSendMessage } from '../actions/sendMessage.usecase'
import { useReplyMessage } from '../actions/replyMessage.usecase'
import { useMarkConversationRead } from '../actions/markRead.usecase'

import { conversationReducer } from '../reducers/conversation.reducer'

import { useConversationSendController } from './useConversationSendController'
import { useConversationReadController } from './useConversationReadController'
import { useConversationDerivedState } from './useConversationDerivedState'

import { useConversationAIOrchestrator } from '@/features/inbox/application/ai/controller/useConversationAIOrchestrator'

import { selectAllMessages } from '../selectors/conversation.selectors'

import { Message } from '@/features/inbox/domain/message/message.types'
import { Conversation } from '@/features/inbox/domain/conversation/conversation.types'

import { ConversationState } from '../types/conversation.types'
import { ConversationAction, ConversationDispatch } from '../types/conversation.actions'

type Props = {
  conversationId: string | null
}

export function useConversationController({
  conversationId,
}: Props) {

  const {
    data: conversation,
    isLoading: loading
  } = useConversation(conversationId)

  const sendUsecase = useSendMessage()
  const replyUsecase = useReplyMessage()
  const read = useMarkConversationRead()

  const send = {
    execute: async (params: any) => {
      await sendUsecase.execute(params)
    },
    sending: sendUsecase.sending
  }

  const reply = {
    execute: async (params: any) => {
      await replyUsecase.execute(params)
    },
    replying: replyUsecase.replying
  }

  const [state, dispatch] = useReducer<
    React.Reducer<ConversationState, ConversationAction>
  >(
    conversationReducer,
    {
      conversation: null,
      aiRun: null,
      aiSuggestion: null,
      lastReadMessageId: null,
    }
  )

  const typedDispatch = dispatch as ConversationDispatch

  const [sending, setSending] = useState(false)
  const [, setScrolled] = useState(false)

  /* =========================
     🔥 AI (NOW CLEAN)
  ========================= */

  useConversationAIOrchestrator({
    conversationId,
    dispatch: typedDispatch,
  })

  /* =========================
     CONVERSATION SYNC
  ========================= */

  useEffect(() => {
    if (!conversation) return

    typedDispatch({
      type: 'SET_CONVERSATION',
      payload: conversation,
    })
  }, [conversation, typedDispatch])

  const messages: Message[] = useMemo(
    () => selectAllMessages(state),
    [state]
  )

  const timeline = useConversationTimeline(
    state.conversation
      ? {
          ...state.conversation,
          messages,
        }
      : null
  )

  const {
    sendMessage,
    replyMessage,
    retryMessage,
  } = useConversationSendController({
    conversationId,
    dispatch: typedDispatch,
    send,
    reply,
    setSending
  })

  useConversationReadController({
    messages,
    read,
    dispatch: typedDispatch
  })

  const {
    lastInboundMessageId,
    canReply,
  } = useConversationDerivedState(state)

  const isReady =
    Boolean(conversationId && state.conversation && !loading)

  return {
    state,

    conversation: state.conversation,

    messages,
    timeline,

    loading,
    isReady,

    sending,
    setScrolled,

    sendMessage: isReady ? sendMessage : async () => {},
    replyMessage: isReady ? replyMessage : async () => {},
    retryMessage: isReady ? retryMessage : async () => {},

    lastInboundMessageId,
    canReply,
  }
}