import {
  applyConversationUpdate,
  updateUnreadCount
} from '@/features/inbox/domain/conversation/conversation.sync.engine'

import {
  Conversation
} from '@/features/inbox/domain/conversation/conversation.types'

import {
  ConversationAction
} from '../types/conversation.actions'

export function conversationMetaReducer(
  conversation: Conversation | null,
  action: ConversationAction
): Conversation | null {

  if (!conversation) return conversation

  switch (action.type) {

    case 'CONVERSATION_UPDATE':
      return applyConversationUpdate(
        conversation,
        action.payload
      )

    case 'UNREAD_UPDATE':
      return updateUnreadCount(
        conversation,
        action.payload
      )

    default:
      return conversation
  }
}