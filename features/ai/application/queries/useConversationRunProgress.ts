import { useAppQuery } from '@/core/query/useAppQuery'

import { aiApi } from '../../infrastructure/api/ai.api'
import { mapAgentRunProgressDTO } from '../../infrastructure/mappers/ai.mapper'
import { aiKeys } from '../keys/ai.keys'

export function useConversationRunProgress(conversationId?: string) {
  return useAppQuery({
    queryKey: conversationId
      ? aiKeys.conversationRun(conversationId)
      : aiKeys.runs(),

    queryFn: async () => {
      if (!conversationId) return null

      const res = await aiApi.getConversationRunProgress(conversationId)

      if (!res) return null

      return mapAgentRunProgressDTO(res)
    },

    enabled: !!conversationId,

    /* -----------------------------
       FIXED POLLING (CRITICAL)
    ----------------------------- */
    refetchInterval: (query) => {
      const data = query.state.data

      // 🔥 start polling even before first response
      if (!data) return 1500

      // stop when finished
      if (data.isFinal) return false

      return 1500
    },

    /* -----------------------------
       STABILITY
    ----------------------------- */
    staleTime: 0,
    gcTime: 5 * 60 * 1000,

    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchOnMount: true,
  })
}