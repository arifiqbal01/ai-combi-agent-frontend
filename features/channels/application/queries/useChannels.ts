import { useAppQuery } from '@/core/query/useAppQuery'

import { channelApi } from '../../infrastructure/api/channel.api'
import { mapChannels } from '../../infrastructure/mappers/channel.mapper'
import { channelKeys } from '../keys/channel.keys'

export function useChannels() {
  return useAppQuery({
    queryKey: channelKeys.lists(),

    queryFn: async () => {
      const res = await channelApi.list()
      return mapChannels(res)
    },

    // ✅ CACHE (channels rarely change)
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,

    // ✅ UX
    placeholderData: (prev) => prev,

    // ✅ REFRESH STRATEGY
    refetchInterval: false,
    refetchOnWindowFocus: true,
  })
}