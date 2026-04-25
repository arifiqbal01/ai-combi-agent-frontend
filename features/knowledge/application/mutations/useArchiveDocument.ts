import { useQueryClient } from '@tanstack/react-query'
import { useAppMutation } from '@/core/query/useAppMutation'

import { archiveDocument } from '@/features/knowledge/infrastructure/api/knowledge.api'
import { knowledgeKeys } from '@/features/knowledge/application/keys/knowledge.keys'

type Payload = {
  sourceId: string
  documentId: string
}

export function useArchiveDocument() {
  const qc = useQueryClient()

  return useAppMutation({
    mutationFn: ({ sourceId, documentId }: Payload) =>
      archiveDocument(sourceId, documentId),

    onSuccess: async (_data, { sourceId }) => {
      // ✅ refetch documents (avoid ghost items)
      await qc.invalidateQueries({
        queryKey: knowledgeKeys.documents(sourceId),
      })

      // ✅ refetch sources (update counts/status)
      await qc.invalidateQueries({
        queryKey: knowledgeKeys.sources(),
      })
    },
  })
}