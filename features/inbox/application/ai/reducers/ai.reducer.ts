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

    case 'AI_RUN_UPDATE': {
      const next = mergeAIRun(
        state.aiRun ?? null,
        action.payload
      )

      // ✅ ensure updates are not blocked
      if (!next) return {}

      return {
        aiRun: {
          ...state.aiRun,
          ...next, // force override progress, stage, state
        }
      }
    }

    case 'AI_SUGGESTION': {
      const next = mergeSuggestion(
        state.aiSuggestion ?? null,
        action.payload
      )

      if (!next) return {}

      return {
        aiSuggestion: {
          ...state.aiSuggestion,
          ...next, // force override content, confidence
        }
      }
    }

    default:
      return {}
  }
}