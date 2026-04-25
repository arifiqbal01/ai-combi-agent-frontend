import { useMemo } from 'react'

import {
  selectLastInboundMessageId
} from '../selectors/conversation.selectors'

import { ConversationState } from '../types/conversation.types' // ✅ FIXED

export function useConversationDerivedState(
  state: ConversationState
) {

  const lastInboundMessageId = useMemo(
    () => selectLastInboundMessageId(state),
    [state] // ✅ FIXED
  )

  return {
    lastInboundMessageId,
    canReply: Boolean(lastInboundMessageId)
  }
}