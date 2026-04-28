import { useAppQuery } from '@/core/query/useAppQuery'

import { knowledgeApi } from '@/features/knowledge/infrastructure/api/knowledge.api'
import { mapDocumentDTO } from '@/features/knowledge/infrastructure/mappers/knowledge.mapper'

import { KnowledgeStatus } from '@/features/knowledge/domain/knowledge.types'

export function useHasKnowledge() {
  return useAppQuery<boolean>({
    queryKey: ['knowledge', 'has'],

    queryFn: async () => {
      // 🔥 Step 1: get sources
      const sources = await knowledgeApi.listSources()

      if (!sources.length) return false

      // 🔥 Step 2: check first source only (fast path)
      const firstSource = sources[0]

      const docs = await knowledgeApi.listDocuments(firstSource.id)

      const validDocs = docs
        .map(mapDocumentDTO)
        .filter(
          (d) => d.status !== KnowledgeStatus.ARCHIVED
        )

      return validDocs.length > 0
    },

    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,

    placeholderData: (prev) => prev,
    refetchInterval: false,
  })
}