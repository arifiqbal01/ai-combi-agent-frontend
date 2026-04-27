import { useQueryClient } from '@tanstack/react-query'
import { useAppMutation } from '@/core/query/useAppMutation'

import { channelApi } from '../../infrastructure/api/channel.api'
import { channelKeys } from '../keys/channel.keys'
import {
  ConnectRequestDTO,
  ConnectResponseDTO,
} from '../../infrastructure/dto/channel.dto'

import { toast } from '@/ui'

export function useConnectChannel() {
  const queryClient = useQueryClient()

  return useAppMutation({
    mutationFn: ({ id, body }) =>
      channelApi.connect(id, body),

    onSuccess: async (data) => {

      if (data.status === 'oauth_required') {
        if ('redirect_url' in data && data.redirect_url) {
          window.location.href = data.redirect_url
        }
        return
      }

      if (data.status === 'manual_required') {
        return
      }

      if (data.status === 'connected') {
        toast.success('Channel connected') // ✅ HERE
        await queryClient.invalidateQueries({
          queryKey: channelKeys.lists(),
        })
        return
      }

      if (data.status === 'valid') {
        toast.success('Credentials valid') // ✅ HERE
        await queryClient.invalidateQueries({
          queryKey: channelKeys.lists(),
        })
        return
      }

      if (data.status === 'invalid') {
        toast.error('Invalid credentials or configuration') // ✅ HERE
        return
      }
    },

    onError: () => {
      toast.error('Connection failed')
    },
  })
}