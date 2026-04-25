import {
  Conversation
} from '@/features/inbox/domain/conversation/conversation.types'

import {
  Message
} from '@/features/inbox/domain/message/message.types'

/* =========================
   MERGE MESSAGE
========================= */

export function mergeMessage(
  conversation: Conversation,
  message: Message
): Conversation {

  const existingIndex =
    conversation.messages?.findIndex(
      m =>
        m.id === message.id ||
        (message.clientId && m.clientId === message.clientId)
    ) ?? -1

  const messages = [
    ...(conversation.messages ?? [])
  ]

  if (existingIndex === -1) {
    messages.push(message)
  } else {
    messages[existingIndex] = message
  }

  return {
    ...conversation,
    messages,
    lastMessage: message
  }
}

/* =========================
   UPDATE CONVERSATION
========================= */

export function updateConversation(
  conversation: Conversation,
  updates: Partial<Conversation>
): Conversation {

  return {
    ...conversation,
    ...updates
  }
}

/* =========================
   UPDATE UNREAD
========================= */

export function updateUnread(
  conversation: Conversation,
  unreadCount: number
): Conversation {

  return {
    ...conversation,
    unreadCount
  }
}