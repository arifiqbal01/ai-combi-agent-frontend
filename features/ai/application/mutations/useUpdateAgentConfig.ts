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

    onSuccess: async () => {
      toast.success('Agent configuration updated')

      await queryClient.invalidateQueries({
        queryKey: aiKeys.lists(),
      })
    },

    onError: () => {
      toast.error('Failed to update configuration')
    },
  })
}