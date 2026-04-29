'use client'

import { useEffect } from 'react'
import { useAppQuery } from '@/core/query/useAppQuery'

import { getLatestAISuggestion } from '@/features/inbox/infrastructure/api/ai.api'
import { mapAISuggestionDTO } from '@/features/inbox/infrastructure/mappers/ai.mapper'
import { AISuggestion } from '@/features/inbox/domain/ai/ai.types'

type Action =
  | { type: 'AI_SUGGESTION'; payload: AISuggestion }

export function useLatestAISuggestion(
  conversationId: string | null,
  dispatch: React.Dispatch<Action>
){
  const query = useAppQuery<AISuggestion | null>({
    queryKey: ['ai', 'latest', conversationId],

    queryFn: async () => {
      if (!conversationId) return null

      const res = await getLatestAISuggestion(conversationId)

      // ✅ FIX: backend returns flat object (NOT { suggestion })
      if (!res) return null

      return mapAISuggestionDTO(res as any)
    },

    enabled: !!conversationId,

    refetchInterval: 5000,
    staleTime: 0,
  })

  /* dispatch side-effect */
  useEffect(() => {
    if (!query.data) return

    dispatch({
      type: 'AI_SUGGESTION',
      payload: query.data,
    })
  }, [query.data, dispatch])
}