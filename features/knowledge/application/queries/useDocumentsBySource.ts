import { useAppQuery } from '@/core/query/useAppQuery'

import { knowledgeApi } from '@/features/knowledge/infrastructure/api/knowledge.api'
import { mapDocumentDTO } from '@/features/knowledge/infrastructure/mappers/knowledge.mapper'

import {
  KnowledgeDocument,
  KnowledgeStatus,
} from '@/features/knowledge/domain/knowledge.types'

export function useDocumentsBySource(sourceId?: string) {
  return useAppQuery<KnowledgeDocument[]>({
    queryKey: ['documents', sourceId],

    enabled: !!sourceId,

    queryFn: async () => {
      const res = await knowledgeApi.listDocuments(sourceId!) // ✅ FIXED

      return res
        .map(mapDocumentDTO)
        .filter(d => d.status !== KnowledgeStatus.ARCHIVED)
        .sort(
          (a, b) =>
            new Date(b.createdAt || 0).getTime() -
            new Date(a.createdAt || 0).getTime()
        )
    },

    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,

    placeholderData: (prev) => prev,

    refetchInterval: (query) => {
      const data = query.state.data as KnowledgeDocument[] | undefined

      const hasProcessing = data?.some(
        d => d.status === KnowledgeStatus.PROCESSING
      )

      return hasProcessing ? 3000 : false
    },
  })
}