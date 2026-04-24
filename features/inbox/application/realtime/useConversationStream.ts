'use client'

import { useEffect } from 'react'

import { createStream } from '@/infra/stream/client'
import {
  ConversationStreamEvent,
} from '@/infra/stream/events'

type Handlers = Partial<
  Record<
    ConversationStreamEvent,
    (payload: any) => void
  >
> & {
  connection_state?: (
    state:
      | 'connected'
      | 'reconnecting'
      | 'disconnected'
  ) => void
}

export function useConversationStream(
  conversationId: string | null,
  handlers?: Handlers
) {
  useEffect(() => {
    if (!conversationId) return

    const stream = createStream(
      `/inbox/realtime/conversations/${conversationId}/stream`,
      handlers
    )

    return () => {
      stream.close()
    }
  }, [conversationId, handlers])
}