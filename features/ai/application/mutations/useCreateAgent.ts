import { useQueryClient } from '@tanstack/react-query'
import { useAppMutation } from '@/core/query/useAppMutation'

import { aiApi } from '../../infrastructure/api/ai.api'
import { aiKeys } from '../keys/ai.keys'
import { CreateAgentDTO, AgentDTO } from '../../infrastructure/dto/ai.dto'

import { toast } from '@/ui'

type CreateVariables = CreateAgentDTO

export function useCreateAgent() {
  const queryClient = useQueryClient()

  return useAppMutation<
    AgentDTO,
    unknown,
    CreateVariables
  >({
    mutationFn: (variables) => aiApi.create(variables),

    onSuccess: async () => {
      toast.success('Agent created')

      await queryClient.invalidateQueries({
        queryKey: aiKeys.lists(),
      })
    },

    onError: () => {
      toast.error('Failed to create agent')
    },
  })
}