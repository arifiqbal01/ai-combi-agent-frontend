import { useMutation, useQueryClient } from '@tanstack/react-query'
import { channelApi } from '../../infrastructure/api/channel.api'
import { channelKeys } from '../keys/channel.keys'

export function useCreateChannel() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: channelApi.create,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: channelKeys.all })
    },
  })
}