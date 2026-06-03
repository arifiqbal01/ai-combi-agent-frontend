import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { useAppMutation } from '@/core/query/useAppMutation'

import { channelApi } from '../../infrastructure/api/channel.api'
import { channelKeys } from '../keys/channel.keys'

export function useTestConnection() {
  const queryClient = useQueryClient()

  return useAppMutation({
    mutationFn: (id: string) => channelApi.test(id),

    onSuccess: async (result) => {
      if (
        result.connection_state === 'valid' ||
        result.connection_state === 'connected'
      ) {
        toast.success(
          'Channel connection is healthy'
        )
      } else {
        toast.error(
          'Channel connection failed'
        )
      }

      await queryClient.invalidateQueries({
        queryKey: channelKeys.lists(),
      })
    },
  })
}