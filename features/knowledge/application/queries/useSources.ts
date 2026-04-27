import { useAppQuery } from '@/core/query/useAppQuery'

import { knowledgeApi } from '@/features/knowledge/infrastructure/api/knowledge.api'
import { mapSourceDTO } from '@/features/knowledge/infrastructure/mappers/knowledge.mapper'
import { knowledgeKeys } from '../keys/knowledge.keys'

import {
  KnowledgeSource,
  KnowledgeStatus,
} from '@/features/knowledge/domain/knowledge.types'

export function useSources() {
  return useAppQuery<KnowledgeSource[]>({
    queryKey: knowledgeKeys.sources(),

    queryFn: async () => {
      const res = await knowledgeApi.listSources() // ✅ FIXED

      return res
        .map(mapSourceDTO)
        .filter(
          source => source.status !== KnowledgeStatus.ARCHIVED
        )
    },

    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,

    placeholderData: (prev) => prev,
  })
}