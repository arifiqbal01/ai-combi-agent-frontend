import { useAppQuery } from '@/core/query/useAppQuery'

import { aiApi } from '../../infrastructure/api/ai.api'
import { mapAgentRunProgressDTO } from '../../infrastructure/mappers/ai.mapper'
import { aiKeys } from '../keys/ai.keys'

export function useAgentRunProgress(runId?: string) {
  return useAppQuery({
    queryKey: runId
      ? aiKeys.runProgress(runId)
      : aiKeys.runs(),

    queryFn: async () => {
      if (!runId) throw new Error('RUN_ID_REQUIRED')

      const res = await aiApi.getRunProgress(runId)
      return mapAgentRunProgressDTO(res)
    },

    enabled: !!runId,

    /* -----------------------------
       Polling
    ----------------------------- */
    refetchInterval: (query) => {
      const data = query.state.data as any

      if (!data) return 1500
      if (data.isFinal) return false

      return 1500
    },

    /* -----------------------------
       Stability
    ----------------------------- */
    staleTime: 0,
    gcTime: 5 * 60 * 1000,

    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  })
}