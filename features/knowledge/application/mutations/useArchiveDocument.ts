import { useQueryClient } from '@tanstack/react-query'
import { useAppMutation } from '@/core/query/useAppMutation'

import { knowledgeApi } from '@/features/knowledge/infrastructure/api/knowledge.api'
import { knowledgeKeys } from '@/features/knowledge/application/keys/knowledge.keys'

type Payload = {
  sourceId: string
  documentId: string
}

export function useArchiveDocument() {
  const qc = useQueryClient()

  return useAppMutation({
    mutationFn: ({ sourceId, documentId }: Payload) =>
      knowledgeApi.archiveDocument(sourceId, documentId), // ✅ FIXED

    onSuccess: async (_data, { sourceId }) => {
      await qc.invalidateQueries({
        queryKey: knowledgeKeys.documents(sourceId),
      })

      await qc.invalidateQueries({
        queryKey: knowledgeKeys.sources(),
      })
    },
  })
}