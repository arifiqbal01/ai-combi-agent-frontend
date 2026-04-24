import { useEffect, useRef } from 'react'

export function useConversationReadController({
  messages,
  read,
  dispatch
}: any) {

  const lastProcessedRef = useRef<string | null>(null)

  useEffect(() => {

    if (!messages.length) return

    const lastInbound =
      [...messages]
        .reverse()
        .find(m => m.direction === 'INBOUND')

    if (!lastInbound) return

    /* ✅ LOOP GUARD */
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