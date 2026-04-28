'use client'

import { useEffect } from 'react'
import { useAppQuery } from '@/core/query/useAppQuery'

import { listAISuggestions } from '@/features/inbox/infrastructure/api/ai.api'
import { mapAISuggestions } from '@/features/inbox/infrastructure/mappers/ai.mapper'
import { AISuggestion } from '@/features/inbox/domain/ai/ai.types'

import {
  ConversationDispatch
} from '@/features/inbox/application/conversation/types/conversation.actions'

type Props = {
  conversationId: string | null
  dispatch: ConversationDispatch
}

export function useAISuggestionList({
  conversationId,
  dispatch,
}: Props) {

  const query = useAppQuery<AISuggestion[]>({
    queryKey: ['ai', 'list', conversationId],

    queryFn: async () => {
      if (!conversationId) return []

      const res = await listAISuggestions(conversationId)

      return mapAISuggestions(res.suggestions ?? [])
    },

    enabled: !!conversationId,
    refetchInterval: 5000,
    staleTime: 0,
  })

  /* =========================
     DISPATCH SUGGESTIONS
  ========================= */

  useEffect(() => {
    if (!query.data) return

    query.data.forEach((suggestion) => {
      dispatch({
        type: 'AI_SUGGESTION',
        payload: suggestion,
      })
    })
  }, [query.data, dispatch])

  /* =========================
     DISPATCH ERROR (FIXED)
  ========================= */

  useEffect(() => {
    if (!query.error) return

    dispatch({
      type: 'AI_SUGGESTION_ERROR',
      payload:
        query.error instanceof Error
          ? query.error
          : new Error('AI suggestion error'),
    })
  }, [query.error, dispatch])

  return {
    refresh: query.refetch,
    loading: query.isLoading,
  }
}