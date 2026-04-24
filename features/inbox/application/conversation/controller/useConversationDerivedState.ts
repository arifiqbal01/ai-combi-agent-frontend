import { useMemo } from 'react'

import {
  selectLastInboundMessageId
} from '../selectors/conversation.selectors'

export function useConversationDerivedState(
  state: any
) {

  const lastInboundMessageId = useMemo(
    () => selectLastInboundMessageId(state),
    [state.conversation?.messages]
  )

  return {
    lastInboundMessageId,
    canReply: !!lastInboundMessageId
  }
}