'use client'

import { useEffect } from 'react'
import { useAppQuery } from '@/core/query/useAppQuery'

import { listAISuggestions } from '@/features/inbox/infrastructure/api/ai.api'
import { mapAISuggestions } from '@/features/inbox/infrastructure/mappers/ai.mapper'
import { AISuggestion } from '@/features/inbox/domain/ai/ai.types'

type Action =
  | { type: 'AI_SUGGESTION'; payload: AISuggestion }
  | { type: 'AI_SUGGESTION_ERROR'; payload: unknown }

type Props = {
  conversationId: string | null
  dispatch: React.Dispatch<Action>
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

    // ✅ ONLY local condition
    enabled: !!conversationId,

    // ✅ polling still valid
    refetchInterval: 5000,
    staleTime: 0,
  })

  /* dispatch side-effect */
  useEffect(() => {
    if (!query.data) return

    query.data.forEach((suggestion) => {
      dispatch({
        type: 'AI_SUGGESTION',
        payload: suggestion,
      })
    })
  }, [query.data, dispatch])

  useEffect(() => {
    if (!query.error) return

    dispatch({
      type: 'AI_SUGGESTION_ERROR',
      payload: query.error,
    })
  }, [query.error, dispatch])

  return {
    refresh: query.refetch,
    loading: query.isLoading,
  }
}