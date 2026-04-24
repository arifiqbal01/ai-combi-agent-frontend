/* =========================
 application/mutations/useArchiveDocument.ts
========================= */

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { archiveDocument } from '@/features/knowledge/infrastructure/api/knowledge.api'
import { knowledgeKeys } from '@/features/knowledge/application/keys/knowledge.keys'

type Payload = {
 sourceId: string
 documentId: string
}

export function useArchiveDocument() {
 const qc = useQueryClient()

 return useMutation({
  mutationFn: ({ sourceId, documentId }: Payload) =>
   archiveDocument(sourceId, documentId),

  onSuccess: (_, { sourceId }) => {
   // ✅ refetch documents (fix ghost items)
   qc.invalidateQueries({
    queryKey: knowledgeKeys.documents(sourceId),
   })

   // ✅ refetch sources (fix count)
   qc.invalidateQueries({
    queryKey: knowledgeKeys.sources(),
   })
  },
 })
}