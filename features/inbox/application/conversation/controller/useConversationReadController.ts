'use client'

import { useEffect, useRef } from 'react'

import {
  Message,
  MessageDirection
} from '@/features/inbox/domain/message/message.types'

import {
  ConversationDispatch
} from '../types/conversation.actions'

type Props = {
  messages: Message[]
  read: {
    markLatestInbound: (messages: Message[]) => void
  }
  dispatch: ConversationDispatch
}

export function useConversationReadController({
  messages,
  read,
  dispatch
}: Props) {

  const lastProcessedRef = useRef<string | null>(null)

  useEffect(() => {

    if (!messages.length) return

    let lastInbound: Message | undefined

    // ✅ No array copy, efficient reverse scan
    for (let i = messages.length - 1; i >= 0; i--) {
      const m = messages[i]

      if (m.direction === MessageDirection.INBOUND) {
        lastInbound = m
        break
      }
    }

    if (!lastInbound) return

    if (lastProcessedRef.current === lastInbound.id) {
      return
    }

    lastProcessedRef.current = lastInbound.id

    read.markLatestInbound(messages)

    dispatch({
      type: 'MARK_READ_LOCAL',
      payload: lastInbound.id
    })

  }, [messages, read, dispatch])
}