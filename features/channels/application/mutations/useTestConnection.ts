import { useQueryClient } from '@tanstack/react-query'
import { useAppMutation } from '@/core/query/useAppMutation'

import { channelApi } from '../../infrastructure/api/channel.api'
import { channelKeys } from '../keys/channel.keys'

export function useTestConnection() {
  const queryClient = useQueryClient()

  return useAppMutation({
    mutationFn: (id: string) => channelApi.test(id),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: channelKeys.lists(),
      })
    },
  })
}