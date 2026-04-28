/* application/ai/controller/useConversationAIOrchestrator.ts */

'use client'

import { useEffect, useRef } from 'react'
import { useAppQuery } from '@/core/query/useAppQuery'

import { useAISuggestionList } from '../hooks/useAISuggestionList'

import { getLatestAIRun } from '@/features/inbox/infrastructure/api/ai.api'
import { mapAIRunDTO } from '@/features/inbox/infrastructure/mappers/ai.mapper'
import { AIRun, AIRunState } from '@/features/inbox/domain/ai/ai.types'

import {
  ConversationDispatch
} from '@/features/inbox/application/conversation/types/conversation.actions'

type Props = {
  conversationId: string | null
  dispatch: ConversationDispatch
}

export function useConversationAIOrchestrator({
  conversationId,
  dispatch,
}: Props) {

  /* =========================
     SUGGESTIONS
  ========================= */

  useAISuggestionList({
    conversationId,
    dispatch,
  })

  /* =========================
     AI RUN (PROGRESS)
  ========================= */

  const lastRunIdRef = useRef<string | null>(null)

  const runQuery = useAppQuery<AIRun | null>({
    queryKey: ['ai', 'run', conversationId],

    queryFn: async () => {
      if (!conversationId) return null

      const res = await getLatestAIRun(conversationId)

      return res ? mapAIRunDTO(res) : null
    },

    enabled: !!conversationId,

    /* 🔥 FIXED */
    refetchInterval: (query) => {

      const run = query.state.data

      if (!run) return 2000

      if (
        run.state === AIRunState.COMPLETED ||
        run.state === AIRunState.FAILED ||
        run.state === AIRunState.SKIPPED
      ) {
        return false
      }

      return 2000
    },

    staleTime: 0,
  })

  /* =========================
     DISPATCH RUN UPDATE
  ========================= */

  useEffect(() => {
    const run = runQuery.data
    if (!run) return

    if (lastRunIdRef.current === run.id) return

    lastRunIdRef.current = run.id

    dispatch({
      type: 'AI_RUN_UPDATE',
      payload: run,
    })
  }, [runQuery.data, dispatch])
}