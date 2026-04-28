import { useQueryClient } from '@tanstack/react-query'
import { useAppMutation } from '@/core/query/useAppMutation'

import { knowledgeApi } from '@/features/knowledge/infrastructure/api/knowledge.api'
import { knowledgeKeys } from '../keys/knowledge.keys'

import {
  KnowledgeDocument,
  KnowledgeStatus,
} from '@/features/knowledge/domain/knowledge.types'

export function useActivateDocument() {
  const qc = useQueryClient()

  return useAppMutation({
    mutationFn: ({
      sourceId,
      documentId,
    }: {
      sourceId: string
      documentId: string
    }) =>
      knowledgeApi.activateDocument(sourceId, documentId),

    onSuccess: async (_, variables) => {
      const { sourceId, documentId } = variables

      // ✅ update list
      qc.setQueryData<KnowledgeDocument[]>(
        knowledgeKeys.documents(sourceId),
        (old = []) =>
          old.map(doc =>
            doc.id === documentId
              ? { ...doc, status: KnowledgeStatus.ACTIVE }
              : doc
          )
      )

      // ✅ update single doc cache
      qc.setQueryData<KnowledgeDocument>(
        knowledgeKeys.document(documentId),
        (old) =>
          old
            ? { ...old, status: KnowledgeStatus.ACTIVE }
            : old
      )

      // 🔥 ensure backend sync
      await qc.invalidateQueries({
        queryKey: knowledgeKeys.documents(sourceId),
      })
    },
  })
}