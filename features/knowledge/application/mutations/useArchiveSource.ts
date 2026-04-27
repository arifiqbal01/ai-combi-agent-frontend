import { useQueryClient } from '@tanstack/react-query'
import { useAppMutation } from '@/core/query/useAppMutation'

import { knowledgeApi } from '@/features/knowledge/infrastructure/api/knowledge.api'
import { knowledgeKeys } from '@/features/knowledge/application/keys/knowledge.keys'

export function useArchiveSource() {
  const qc = useQueryClient()

  return useAppMutation({
    mutationFn: (id: string) =>
      knowledgeApi.archiveSource(id), // ✅ FIXED

    onSuccess: async () => {
      await qc.invalidateQueries({
        queryKey: knowledgeKeys.sources(),
      })
    },
  })
}