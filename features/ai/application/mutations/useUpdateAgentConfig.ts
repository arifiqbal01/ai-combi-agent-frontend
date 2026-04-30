import { useQueryClient } from '@tanstack/react-query'
import { useAppMutation } from '@/core/query/useAppMutation'

import { aiApi } from '../../infrastructure/api/ai.api'
import { aiKeys } from '../keys/ai.keys'

import {
  UpdateAgentConfigDTO,
  UpdateAgentConfigResponseDTO,
} from '../../infrastructure/dto/ai.dto'

import { toast } from '@/ui'

type Variables = {
  id: string
  body: UpdateAgentConfigDTO
}

export function useUpdateAgentConfig() {
  const queryClient = useQueryClient()

  return useAppMutation<
    UpdateAgentConfigResponseDTO,
    unknown,
    Variables
  >({
    mutationFn: (variables) =>
      aiApi.updateConfig(variables.id, variables.body),

    onSuccess: async (res, variables) => {
      if (res.status === 'no_changes') {
        toast.info('No changes made')
        return
      }

      toast.success('Agent configuration updated')

      await Promise.all([
        queryClient.refetchQueries({
          queryKey: aiKeys.lists(),
          type: 'active',
        }),
        queryClient.refetchQueries({
          queryKey: aiKeys.detail(variables.id),
          type: 'active',
        }),
      ])
    },

    onError: (error: any) => {
      const apiError = error?.response?.data

      // 🔥 Handle domain-specific error
      if (apiError?.error === 'agent_disabled') {
        toast.error(
          'Cannot update configuration while agent is disabled. Please enable it first.'
        )
        return
      }

      // fallback
      toast.error('Failed to update configuration')
    },
  })
}