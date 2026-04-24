import { useQuery } from '@tanstack/react-query'

import {
  listConversations
} from '@/features/inbox/infrastructure/api/conversation.api'

import {
  mapConversationListItemDTO
} from '@/features/inbox/infrastructure/mappers/conversation.mapper'

import { useTenantGuard } from '@/core/session/useTenantGuard'

export function useConversationList() {
  const { hasTenant } = useTenantGuard()

  const query = useQuery({
    queryKey: ['conversations'],

    queryFn: async () => {
      const res = await listConversations()

      return res.conversations.map(
        mapConversationListItemDTO
      )
    },

    enabled: hasTenant,

    // ✅ CACHE STRATEGY
    staleTime: 60 * 1000,        // 1 min fresh
    gcTime: 10 * 60 * 1000,      // keep in cache 10 min

    // ✅ LIVE UPDATES
    refetchInterval: 5000,       // polling
    refetchOnWindowFocus: false, // avoid double refetch

    // ✅ UX IMPROVEMENT (important)
    placeholderData: (prev) => prev, // keep previous data during refetch

    retry: (count, err: any) => {
      if (err?.message === 'NO_TENANT') return false
      return count < 2
    },
  })

  return {
    items: query.data ?? [],
    loading: query.isLoading,
    isReady: hasTenant,
    isEmpty: !query.isLoading && (query.data?.length ?? 0) === 0,
    refresh: query.refetch,
  }
}