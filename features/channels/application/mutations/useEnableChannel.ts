import { useMutation, useQueryClient } from '@tanstack/react-query'
import { channelApi } from '../../infrastructure/api/channel.api'
import { channelKeys } from '../keys/channel.keys'

export function useEnableChannel() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => channelApi.enable(id),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: channelKeys.lists(),
      })

      queryClient.refetchQueries({
        queryKey: channelKeys.lists(),
      })
    },
  })
}