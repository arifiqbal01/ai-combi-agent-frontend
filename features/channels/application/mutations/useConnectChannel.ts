import { useMutation, useQueryClient } from '@tanstack/react-query'
import { channelApi } from '../../infrastructure/api/channel.api'
import { channelKeys } from '../keys/channel.keys'
import {
  ConnectRequestDTO,
  ConnectResponseDTO,
} from '../../infrastructure/dto/channel.dto'

export function useConnectChannel() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      body,
    }: {
      id: string
      body?: ConnectRequestDTO
    }) => channelApi.connect(id, body),

    onSuccess: async (data: ConnectResponseDTO) => {

      // 🔥 OAuth redirect
      if (data.status === 'oauth_required' && data.redirect_url) {
        window.location.href = data.redirect_url
        return
      }

      // 🔥 Manual flow → UI handles
      if (data.status === 'manual_required') {
        return
      }

      // 🔥 Connected
      if (data.status === 'connected') {
        await queryClient.invalidateQueries({
          queryKey: channelKeys.lists(),
        })

        queryClient.refetchQueries({
          queryKey: channelKeys.lists(),
        })
      }
    },
  })
}