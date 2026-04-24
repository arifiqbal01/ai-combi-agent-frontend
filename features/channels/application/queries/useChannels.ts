import * as ReactQuery from '@tanstack/react-query'
import { channelApi } from '../../infrastructure/api/channel.api'
import { mapChannels } from '../../infrastructure/mappers/channel.mapper'
import { channelKeys } from '../keys/channel.keys'

export function useChannels() {

  return ReactQuery.useQuery({
    queryKey: channelKeys.lists(),

    queryFn: async () => {
      const res = await channelApi.list()
      return mapChannels(res)
    },

    // ✅ CACHE (channels rarely change)
    staleTime: 5 * 60 * 1000,     // 5 minutes
    gcTime: 10 * 60 * 1000,       // keep cache 10 minutes

    // ✅ UX
    placeholderData: (prev) => prev,

    // ✅ REFRESH STRATEGY
    refetchInterval: false,       // ❌ remove polling (not needed)
    refetchOnWindowFocus: true,   // optional (keep or disable based on preference)
  })
}