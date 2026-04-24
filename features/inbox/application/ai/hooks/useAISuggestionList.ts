'use client'

import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'

import { listAISuggestions } from '@/features/inbox/infrastructure/api/ai.api'
import { mapAISuggestions } from '@/features/inbox/infrastructure/mappers/ai.mapper'
import { useTenantGuard } from '@/core/session/useTenantGuard'

type Props = {
  conversationId: string | null
  dispatch: any
}

export function useAISuggestionList({
  conversationId,
  dispatch
}: Props){

  const { hasTenant } = useTenantGuard()

  const query = useQuery({
    queryKey: ['ai', 'list', conversationId],

    queryFn: async () => {
      if (!conversationId) return []

      const res = await listAISuggestions(conversationId)

      return mapAISuggestions(
        res.suggestions ?? []
      )
    },

    enabled: !!conversationId && hasTenant,

    refetchInterval: 5000,
    staleTime: 0,

    retry: (count, err: any) => {
      if (err?.message === 'NO_TENANT') return false
      return count < 2
    }
  })

  /* dispatch side-effect */
  useEffect(() => {
    if (!query.data) return

    query.data.forEach((suggestion) => {
      dispatch({
        type: 'AI_SUGGESTION',
        payload: suggestion
      })
    })
  }, [query.data, dispatch])

  useEffect(() => {
    if (!query.error) return

    dispatch({
      type: 'AI_SUGGESTION_ERROR',
      payload: query.error
    })
  }, [query.error, dispatch])

  return {
    refresh: query.refetch,
    loading: query.isLoading
  }
}