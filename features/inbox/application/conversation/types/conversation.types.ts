// features/inbox/application/conversation/types/conversation.types.ts

import { Conversation } from '@/features/inbox/domain/conversation/conversation.types'

export type ConversationState = {
  conversation: Conversation | null
  lastReadMessageId: string | null
}