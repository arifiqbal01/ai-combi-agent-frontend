import { useAppMutation } from '@/core/query/useAppMutation'
import { knowledgeApi } from '@/features/knowledge/infrastructure/api/knowledge.api'

export function useCreateKnowledgeBase() {
  return useAppMutation<{ id: string }, unknown, void>({
    mutationFn: async () => {
      return await knowledgeApi.createBase()
    },
  })
}