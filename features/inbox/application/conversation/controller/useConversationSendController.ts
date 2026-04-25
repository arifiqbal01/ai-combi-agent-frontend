'use client'

import { useCallback } from 'react'

import {
  createOptimisticMessage
} from '@/features/inbox/domain/message/message.sync.engine'

import { Attachment } from '@/features/inbox/domain/attachment/attachment.types'
import { MessageSyncState } from '@/features/inbox/domain/message/message.types'

import {
  ConversationDispatch,
  SendMessageParams,
  ReplyMessageParams
} from '../types/conversation.actions'

/* =========================
   TYPES
========================= */

type Params = {
  conversationId: string | null
  dispatch: ConversationDispatch

  send: {
    execute: (params: SendMessageParams) => Promise<void>
  }

  reply: {
    execute: (params: ReplyMessageParams) => Promise<void>
  }

  setSending: (v: boolean) => void
}

export function useConversationSendController({
  conversationId,
  dispatch,
  send,
  reply,
  setSending
}: Params) {

  /* =========================
     SEND
  ========================= */

  const sendMessage = useCallback(async (
    params: Omit<SendMessageParams, 'conversationId'>
  ) => {

    if (!conversationId) return

    setSending(true)

    const optimistic =
      createOptimisticMessage(
        params.body,
        params.attachments ?? []
      )

    dispatch({
      type: 'MESSAGE_ADD',
      payload: optimistic
    })

    try {
      await send.execute({
        ...params,
        conversationId,
        clientId: optimistic.clientId
      })
    } catch {
      dispatch({
        type: 'DELIVERY_UPDATE',
        payload: {
          messageId: optimistic.id,
          clientId: optimistic.clientId,
          status: MessageSyncState.FAILED
        }
      })
    } finally {
      setSending(false)
    }

  }, [conversationId, send, dispatch, setSending])

  /* =========================
     REPLY
  ========================= */

  const replyMessage = useCallback(async (
    params: Omit<ReplyMessageParams, 'conversationId'>
  ) => {

    if (!conversationId) return

    setSending(true)

    const optimistic =
      createOptimisticMessage(
        params.body,
        params.attachments ?? []
      )

    dispatch({
      type: 'MESSAGE_ADD',
      payload: optimistic
    })

    try {
      await reply.execute({
        ...params,
        conversationId,
        clientId: optimistic.clientId
      })
    } catch {
      dispatch({
        type: 'DELIVERY_UPDATE',
        payload: {
          messageId: optimistic.id,
          clientId: optimistic.clientId,
          status: MessageSyncState.FAILED
        }
      })
    } finally {
      setSending(false)
    }

  }, [conversationId, reply, dispatch, setSending])

  /* =========================
     RETRY
  ========================= */

  const retryMessage = useCallback(async (
    message: { id: string; clientId?: string },
    params: Omit<SendMessageParams, 'conversationId'>
  ) => {

    if (!conversationId) return

    dispatch({
      type: 'DELIVERY_UPDATE',
      payload: {
        messageId: message.id,
        clientId: message.clientId,
        status: MessageSyncState.PENDING
      }
    })

    try {
      await send.execute({
        ...params,
        conversationId,
        clientId: message.clientId
      })
    } catch {
      dispatch({
        type: 'DELIVERY_UPDATE',
        payload: {
          messageId: message.id,
          clientId: message.clientId,
          status: MessageSyncState.FAILED
        }
      })
    }

  }, [conversationId, send, dispatch])

  return {
    sendMessage,
    replyMessage,
    retryMessage
  }
}