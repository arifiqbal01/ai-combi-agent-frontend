import { useQueryClient } from '@tanstack/react-query'
import { useAppMutation } from '@/core/query/useAppMutation'

import { channelApi } from '../../infrastructure/api/channel.api'
import { channelKeys } from '../keys/channel.keys'

export function useArchiveChannel() {
  const queryClient = useQueryClient()

  return useAppMutation({
    mutationFn: (accountId: string) =>
      channelApi.archive(accountId),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: channelKeys.all,
      })
    },
  })
}