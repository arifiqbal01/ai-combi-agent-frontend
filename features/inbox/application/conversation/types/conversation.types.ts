// features/inbox/application/conversation/types/conversation.types.ts

import { Conversation } from '@/features/inbox/domain/conversation/conversation.types'
import { AIRun, AISuggestion } from '@/features/inbox/domain/ai/ai.types'

export type ConversationState = {
  conversation: Conversation | null
  aiRun: AIRun | null
  aiSuggestion: AISuggestion | null
  lastReadMessageId: string | null
}