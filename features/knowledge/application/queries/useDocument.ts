import { useAppQuery } from '@/core/query/useAppQuery'

import { knowledgeApi } from '@/features/knowledge/infrastructure/api/knowledge.api'
import { mapDocumentDetailDTO } from '@/features/knowledge/infrastructure/mappers/knowledge.mapper'

import { KnowledgeDocument } from '@/features/knowledge/domain/knowledge.types'

export function useDocument(
  sourceId?: string,
  documentId?: string
) {
  return useAppQuery<KnowledgeDocument>({
    queryKey: ['document', documentId],

    enabled: !!sourceId && !!documentId,

    queryFn: async () => {
      const dto = await knowledgeApi.getDocument(
        sourceId!,
        documentId!
      )

      return mapDocumentDetailDTO(dto)
    },

    staleTime: 60 * 1000,
    gcTime: 10 * 60 * 1000,

    placeholderData: (prev) => prev,
  })
}