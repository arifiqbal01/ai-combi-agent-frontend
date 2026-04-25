import { useQueryClient } from '@tanstack/react-query'
import { useAppMutation } from '@/core/query/useAppMutation'

import { addSource } from '@/features/knowledge/infrastructure/api/knowledge.api'
import { mapSourceDTO } from '@/features/knowledge/infrastructure/mappers/knowledge.mapper'

import {
  KnowledgeSource,
  KnowledgeSourceType,
} from '@/features/knowledge/domain/knowledge.types'

import { knowledgeKeys } from '../keys/knowledge.keys'

export function useAddSource() {
  const qc = useQueryClient()

  return useAppMutation<KnowledgeSource, unknown, KnowledgeSourceType>({
    mutationFn: async (sourceType) => {
      const res = await addSource(sourceType)
      return mapSourceDTO(res)
    },

    onSuccess: async (newSource) => {
      // ✅ Optimistic insert (deduplicated)
      qc.setQueryData<KnowledgeSource[]>(
        knowledgeKeys.sources(),
        (old = []) =>
          old.some(s => s.id === newSource.id)
            ? old
            : [newSource, ...old]
      )

      // 🔒 Optional safety: ensure server truth (ordering/extra fields)
      await qc.invalidateQueries({
        queryKey: knowledgeKeys.sources(),
      })
    },
  })
}