'use client'

import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'

import { getLatestAISuggestion } from '@/features/inbox/infrastructure/api/ai.api'
import { mapAISuggestionDTO } from '@/features/inbox/infrastructure/mappers/ai.mapper'
import { useTenantGuard } from '@/core/session/useTenantGuard'

export function useLatestAISuggestion(
  conversationId: string | null,
  dispatch: any
){

  const { hasTenant } = useTenantGuard()

  const query = useQuery({
    queryKey: ['ai', 'latest', conversationId],

    queryFn: async () => {
      if (!conversationId) return null

      const res = await getLatestAISuggestion(conversationId)
      return res?.suggestion
        ? mapAISuggestionDTO(res.suggestion)
        : null
    },

    enabled: !!conversationId && hasTenant,

    refetchInterval: 5000, // 🔥 keep AI fresh
    staleTime: 0,
  })

  /* dispatch side-effect */
  useEffect(() => {
    if (!query.data) return

    dispatch({
      type: 'AI_SUGGESTION',
      payload: query.data
    })
  }, [query.data, dispatch])
}