import { useQueryClient } from '@tanstack/react-query'
import { useAppMutation } from '@/core/query/useAppMutation'

import { channelApi } from '../../infrastructure/api/channel.api'
import { channelKeys } from '../keys/channel.keys'
import {
  ConnectRequestDTO,
  ConnectResponseDTO,
} from '../../infrastructure/dto/channel.dto'

export function useConnectChannel() {
  const queryClient = useQueryClient()

  return useAppMutation({
    mutationFn: ({
      id,
      body,
    }: {
      id: string
      body?: ConnectRequestDTO
    }) => channelApi.connect(id, body),

    onSuccess: async (data: ConnectResponseDTO) => {
      // 🔥 OAuth redirect (external flow)
      if (data.status === 'oauth_required' && data.redirect_url) {
        window.location.href = data.redirect_url
        return
      }

      // 🔥 Manual flow → UI decides next step
      if (data.status === 'manual_required') {
        return
      }

      // 🔥 Connected → refresh channels
      if (data.status === 'connected') {
        await queryClient.invalidateQueries({
          queryKey: channelKeys.lists(),
        })
      }
    },
  })
}