import { useAppQuery } from '@/core/query/useAppQuery'

import { aiApi } from '../../infrastructure/api/ai.api'
import { mapAgents } from '../../infrastructure/mappers/ai.mapper'
import { aiKeys } from '../keys/ai.keys'

export function useAgents() {
  return useAppQuery({
    queryKey: aiKeys.lists(),

    queryFn: async () => {
      const res = await aiApi.list()
      return mapAgents(res)
    },

    staleTime: 0,
    gcTime: 10 * 60 * 1000,

    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
  })
}