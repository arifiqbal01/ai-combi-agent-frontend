import {
  Conversation
} from '@/features/inbox/domain/conversation/conversation.types'

import {
  getLastMessage
} from '@/features/inbox/domain/conversation/conversation.selectors'

export type ConversationViewVM = {

  id: string
  subject: string

  unread: number

  identity: string

  preview: string
}

/* =========================
   Helpers
========================= */

function resolveIdentity(
  conversation: Conversation
): string {

  const participant =
    conversation.participants?.find(p => p.address)

  return participant?.address ?? 'Unknown'
}

function resolvePreview(
  lastMessage: ReturnType<typeof getLastMessage>
): string {

  if (!lastMessage) return ''

  if (lastMessage.bodyText && lastMessage.bodyText.trim()) {
    return lastMessage.bodyText
  }

  if (lastMessage.bodyHtml && lastMessage.bodyHtml.trim()) {
    return lastMessage.bodyHtml
  }

  if (lastMessage.subject) {
    return lastMessage.subject
  }

  return ''
}

/* =========================
   Mapper
========================= */

export function mapConversationToViewVM(
  conversation: Conversation
): ConversationViewVM {

  const last =
    getLastMessage(conversation)

  return {
    id: conversation.id,

    subject:
      conversation.subject ||
      '(No subject)',

    unread:
      conversation.unreadCount,

    identity:
      resolveIdentity(conversation),

    preview:
      resolvePreview(last)
  }
}