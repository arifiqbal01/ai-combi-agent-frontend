import { useQueryClient } from '@tanstack/react-query'
import { useAppMutation } from '@/core/query/useAppMutation'

import { archiveSource } from '@/features/knowledge/infrastructure/api/knowledge.api'
import { knowledgeKeys } from '@/features/knowledge/application/keys/knowledge.keys'

export function useArchiveSource() {
  const qc = useQueryClient()

  return useAppMutation({
    mutationFn: (id: string) => archiveSource(id),

    onSuccess: async () => {
      await qc.invalidateQueries({
        queryKey: knowledgeKeys.sources(),
      })
    },
  })
}