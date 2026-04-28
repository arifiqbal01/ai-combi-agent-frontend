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

    onSuccess: (_, variables) => {
      qc.setQueryData<KnowledgeDocument[]>(
        knowledgeKeys.documents(variables.sourceId),
        (old = []) =>
          old.map(doc =>
            doc.id === variables.documentId
              ? { ...doc, status: KnowledgeStatus.ACTIVE }
              : doc
          )
      )
    },
  })
}