import { useQueryClient } from '@tanstack/react-query'
import { useAppMutation } from '@/core/query/useAppMutation'

import { aiApi } from '../../infrastructure/api/ai.api'
import { aiKeys } from '../keys/ai.keys'
import { AgentStatusDTO } from '../../infrastructure/dto/ai.dto'

import { toast } from '@/ui'

type Variables = {
  id: string
}

export function useEnableAgent() {
  const queryClient = useQueryClient()

  return useAppMutation<
    AgentStatusDTO,
    unknown,
    Variables
  >({
    mutationFn: (variables) =>
      aiApi.enable(variables.id),

    onSuccess: async () => {
      toast.success('Agent enabled')

      // ✅ Refetch only active queries (consistent + efficient)
      await queryClient.refetchQueries({
        queryKey: aiKeys.lists(),
        type: 'active',
      })
    },

    onError: () => {
      toast.error('Failed to enable agent')
    },
  })
}