import { useQueryClient } from '@tanstack/react-query'
import { useAppMutation } from '@/core/query/useAppMutation'

import { aiApi } from '../../infrastructure/api/ai.api'
import { aiKeys } from '../keys/ai.keys'
import { AgentStatusDTO } from '../../infrastructure/dto/ai.dto'

import { toast } from '@/ui'

type Variables = {
  id: string
}

export function useDisableAgent() {
  const queryClient = useQueryClient()

  return useAppMutation<
    AgentStatusDTO,
    unknown,
    Variables
  >({
    mutationFn: (variables) =>
      aiApi.disable(variables.id),

    onSuccess: async () => {
      toast.success('Agent disabled')

      await queryClient.invalidateQueries({
        queryKey: aiKeys.lists(),
      })
    },

    onError: () => {
      toast.error('Failed to disable agent')
    },
  })
}