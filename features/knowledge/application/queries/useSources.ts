/* =========================
 application/queries/useSources.ts
========================= */

import { useQuery } from '@tanstack/react-query'

import { listSources } from '@/features/knowledge/infrastructure/api/knowledge.api'
import { mapSourceDTO } from '@/features/knowledge/infrastructure/mappers/knowledge.mapper'
import { knowledgeKeys } from '../keys/knowledge.keys'

import {
  KnowledgeSource,
  KnowledgeStatus,
} from '@/features/knowledge/domain/knowledge.types'

export function useSources() {
  return useQuery<KnowledgeSource[]>({
    queryKey: knowledgeKeys.sources(),

    queryFn: async () => {
      const res = await listSources()

      return res
        .map(mapSourceDTO)
        .filter(
          source => source.status !== KnowledgeStatus.ARCHIVED
        )
    },

    // ✅ CACHE (sources are stable)
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,

    // ✅ UX
    placeholderData: (prev) => prev,
  })
}