import { messageReducer } from './message.reducer'
import { aiReducer } from '@/features/inbox/application/ai/reducers/ai.reducer'
import { conversationMetaReducer } from './conversation.meta.reducer'

import { ConversationAction } from '../types/conversation.actions'
import { ConversationState } from '../types/conversation.types' // ✅ single source

export function conversationReducer(
  state: ConversationState,
  action: ConversationAction
): ConversationState {

  switch (action.type) {

    case 'SET_CONVERSATION':
      return {
        ...state,
        conversation: action.payload
      }

    case 'MARK_READ_LOCAL':
      return {
        ...state,
        lastReadMessageId: action.payload
      }
  }

  const updatedConversation = conversationMetaReducer(
    messageReducer(state.conversation, action),
    action
  )

  const aiState = aiReducer(state, action)

  return {
    ...state,
    ...aiState,
    conversation: updatedConversation
  }
}