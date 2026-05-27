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

    staleTime: 0,
    gcTime: 5 * 60 * 1000,

    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchInterval: false,
  })
}