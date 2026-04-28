// features/inbox/application/ai/reducers/ai.reducer.ts

import {
  mergeSuggestion,
  mergeAIRun
} from '@/features/inbox/domain/ai/ai.sync.engine'

import {
  ConversationState
} from '@/features/inbox/application/conversation/types/conversation.types'

import {
  ConversationAction
} from '@/features/inbox/application/conversation/types/conversation.actions'

export function aiReducer(
  state: ConversationState,
  action: ConversationAction
): Partial<ConversationState> {

  switch (action.type) {

    case 'AI_RESET':
      return {
        aiSuggestion: null,
        aiRun: null,
      }

    case 'AI_RUN_UPDATE':
      return {
        aiRun: mergeAIRun(
          state.aiRun ?? null,
          action.payload
        )
      }

    case 'AI_SUGGESTION':
      return {
        aiSuggestion: mergeSuggestion(
          state.aiSuggestion ?? null,
          action.payload
        )
      }

    default:
      return {}
  }
}