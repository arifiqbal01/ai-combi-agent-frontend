import { useAppQuery } from '@/core/query/useAppQuery'

import { aiApi } from '../../infrastructure/api/ai.api'
import { mapAgents } from '../../infrastructure/mappers/ai.mapper'
import { aiKeys } from '../keys/ai.keys'

export function useAgents(enabled?: boolean) {
  return useAppQuery({
    queryKey: aiKeys.list({ enabled }),

    queryFn: async () => {
      const res = await aiApi.list(
        enabled !== undefined ? { enabled } : undefined
      )
      return mapAgents(res)
    },

    // ✅ CACHE
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,

    // ✅ UX
    placeholderData: (prev) => prev,

    // ✅ REFRESH
    refetchOnWindowFocus: true,
  })
}