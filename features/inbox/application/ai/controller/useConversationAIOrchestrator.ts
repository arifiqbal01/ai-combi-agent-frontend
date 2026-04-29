'use client'

import { useEffect, useRef } from 'react'
import { useAppQuery } from '@/core/query/useAppQuery'

import { useLatestAISuggestion } from '../hooks/useLatestAISuggestion'

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
     ✅ SINGLE SOURCE OF TRUTH (LATEST ONLY)
  ========================= */

  useLatestAISuggestion(conversationId, dispatch)

  /* =========================
     AI RUN (PROGRESS)
  ========================= */

  const prevHashRef = useRef<string>('')

  const runQuery = useAppQuery<AIRun | null>({
    queryKey: ['ai', 'run', conversationId],

    queryFn: async () => {
      if (!conversationId) return null

      const res = await getLatestAIRun(conversationId)
      return res ? mapAIRunDTO(res) : null
    },

    enabled: !!conversationId,

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
     ✅ ALLOW SAME RUN ID UPDATES
     (progress / stage changes)
  ========================= */

  useEffect(() => {
    const run = runQuery.data
    if (!run) return

    const hash = `${run.id}-${run.progress}-${run.state}-${run.stage}`

    if (prevHashRef.current === hash) return
    prevHashRef.current = hash

    dispatch({
      type: 'AI_RUN_UPDATE',
      payload: run,
    })
  }, [runQuery.data, dispatch])
}