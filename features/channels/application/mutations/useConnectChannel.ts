import { useQueryClient } from '@tanstack/react-query'
import { useAppMutation } from '@/core/query/useAppMutation'

import { channelApi } from '../../infrastructure/api/channel.api'
import { channelKeys } from '../keys/channel.keys'
import {
  ConnectRequestDTO,
  ConnectResponseDTO,
} from '../../infrastructure/dto/channel.dto'

import { toast } from '@/ui'

type ConnectVariables = {
  id: string
  body?: ConnectRequestDTO
}

export function useConnectChannel() {
  const queryClient = useQueryClient()

  return useAppMutation<
    ConnectResponseDTO, // TData
    unknown,            // TError ✅ MUST EXIST
    ConnectVariables    // TVariables ✅ NOW CORRECT
  >({
    mutationFn: (variables) =>
      channelApi.connect(variables.id, variables.body),

    onSuccess: async (data) => {

      if (data.status === 'oauth_required') {
        if ('redirect_url' in data && data.redirect_url) {
          window.location.href = data.redirect_url
        }
        return
      }

      if (data.status === 'manual_required') return

      const isConnected =
        data.status === 'connected' ||
        (data.status === 'valid' &&
          'connected' in data &&
          data.connected)

      if (isConnected) {
        toast.success('Channel connected')

        await queryClient.invalidateQueries({
          queryKey: channelKeys.lists(),
        })
        return
      }

      if (data.status === 'valid') {
        toast.success('Credentials valid')
        return
      }

      if (data.status === 'invalid') {
        toast.error('Invalid credentials or configuration')
      }
    },

    onError: () => {
      toast.error('Connection failed')
    },
  })
}