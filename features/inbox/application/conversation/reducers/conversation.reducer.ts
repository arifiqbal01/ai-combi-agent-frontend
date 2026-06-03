import { messageReducer } from './message.reducer'
import { conversationMetaReducer } from './conversation.meta.reducer'

import { ConversationAction } from '../types/conversation.actions'
import { ConversationState } from '../types/conversation.types'

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

  return {
    ...state,
    conversation: updatedConversation
  }
}