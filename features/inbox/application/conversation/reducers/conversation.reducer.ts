import {Conversation}
from '@/features/inbox/domain/conversation/conversation.types'

import {
 messageReducer
}
from './message.reducer'

import {
 aiReducer
}
from '@/features/inbox/application/ai/reducers/ai.reducer'

import {
 conversationMetaReducer
}
from './conversation.meta.reducer'

export type ConversationState={

 conversation:Conversation|null

 aiRun?:any

 aiSuggestion?:any

}

export function conversationReducer(
  state: ConversationState,
  action: any
): ConversationState {

  /* =========================
     SET CONVERSATION
  ========================= */

  if (action.type === 'SET_CONVERSATION') {
    return {
      ...state,
      conversation: action.payload
    }
  }

  /* =========================
     ✅ LOCAL READ TRACKING (ADD HERE)
  ========================= */

  if (action.type === 'MARK_READ_LOCAL') {
    return {
      ...state,
      lastReadMessageId: action.payload
    }
  }

  /* =========================
     DOMAIN REDUCERS
  ========================= */

  const updatedConversation =
    conversationMetaReducer(
      messageReducer(
        state.conversation,
        action
      ),
      action
    )

  /* =========================
     AI REDUCER
  ========================= */

  const aiState =
    aiReducer(
      state,
      action
    )

  /* =========================
     FINAL MERGE
  ========================= */

  return {
  ...state,        // preserve local fields (IMPORTANT)
  ...aiState,      // AI updates
  conversation: updatedConversation
}
}