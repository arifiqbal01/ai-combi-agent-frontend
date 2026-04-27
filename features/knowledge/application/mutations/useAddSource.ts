import { useQueryClient } from '@tanstack/react-query'
import { useAppMutation } from '@/core/query/useAppMutation'

import { knowledgeApi } from '@/features/knowledge/infrastructure/api/knowledge.api'
import { mapSourceDTO } from '@/features/knowledge/infrastructure/mappers/knowledge.mapper'

import {
  KnowledgeSource,
  KnowledgeSourceType,
} from '@/features/knowledge/domain/knowledge.types'

import { knowledgeKeys } from '../keys/knowledge.keys'

// ✅ add this
import { ensureKnowledgeBase } from '@/features/knowledge/application/utils/ensureKnowledgeBase'

export function useAddSource() {
  const qc = useQueryClient()

  return useAppMutation<KnowledgeSource, unknown, KnowledgeSourceType>({
    mutationFn: async (sourceType) => {
      // 🔥 ensure base exists first
      await ensureKnowledgeBase()

      const res = await knowledgeApi.addSource(sourceType)
      return mapSourceDTO(res)
    },

    onSuccess: async (newSource) => {
      qc.setQueryData<KnowledgeSource[]>(
        knowledgeKeys.sources(),
        (old = []) =>
          old.some(s => s.id === newSource.id)
            ? old
            : [newSource, ...old]
      )

      await qc.invalidateQueries({
        queryKey: knowledgeKeys.sources(),
      })
    },
  })
}