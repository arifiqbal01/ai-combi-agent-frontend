import {
  ConversationState
} from '@/features/inbox/application/conversation/types/conversation.types'

import {
  SyncableMessage
} from '@/features/inbox/domain/message/message.types'

import {
  isInbound
} from '@/features/inbox/domain/message'

/* =========================
   BASE SELECTORS
========================= */

export function selectConversation(
  state: ConversationState
) {
  return state.conversation
}

export function selectMessages(
  state: ConversationState
): SyncableMessage[] {
  return state.conversation?.messages ?? []
}

/* =========================
   SORTED
========================= */

export function selectAllMessages(
  state: ConversationState
): SyncableMessage[] {

  const messages = selectMessages(state)

  return [...messages].sort(
    (a, b) =>
      new Date(a.meta.createdAt).getTime() -
      new Date(b.meta.createdAt).getTime()
  )
}

/* =========================
   LAST MESSAGE
========================= */

export function selectLastMessageId(
  state: ConversationState
): string | null {

  const all = selectAllMessages(state)

  return all.length
    ? all[all.length - 1].id
    : null
}

/* =========================
   LAST INBOUND
========================= */

export function selectLastInboundMessageId(
  state: ConversationState
): string | null {

  const messages = selectAllMessages(state)

  for (let i = messages.length - 1; i >= 0; i--) {

    const m = messages[i]

    if (
      isInbound(m) &&
      !m.tempId
    ) {
      return m.id
    }
  }

  return null
}

/* =========================
   CAN REPLY
========================= */

export function selectCanReply(
  state: ConversationState
): boolean {
  return !!selectLastInboundMessageId(state)
}