import { useQueryClient } from '@tanstack/react-query'
import { useAppMutation } from '@/core/query/useAppMutation'

import { knowledgeApi } from '@/features/knowledge/infrastructure/api/knowledge.api'
import { knowledgeKeys } from '../keys/knowledge.keys'

import {
  KnowledgeDocument,
  KnowledgeStatus,
} from '@/features/knowledge/domain/knowledge.types'

export function useDeactivateDocument() {
  const qc = useQueryClient()

  return useAppMutation({
    mutationFn: ({
      sourceId,
      documentId,
    }: {
      sourceId: string
      documentId: string
    }) =>
      knowledgeApi.deactivateDocument(sourceId, documentId),

    onSuccess: async (_, variables) => {
      const { sourceId, documentId } = variables

      // ✅ update list
      qc.setQueryData<KnowledgeDocument[]>(
        knowledgeKeys.documents(sourceId),
        (old = []) =>
          old.map(doc =>
            doc.id === documentId
              ? { ...doc, status: KnowledgeStatus.INACTIVE }
              : doc
          )
      )

      // ✅ update single doc
      qc.setQueryData<KnowledgeDocument>(
        knowledgeKeys.document(documentId),
        (old) =>
          old
            ? { ...old, status: KnowledgeStatus.INACTIVE }
            : old
      )

      // 🔥 ensure backend sync
      await qc.invalidateQueries({
        queryKey: knowledgeKeys.documents(sourceId),
      })
    },
  })
}