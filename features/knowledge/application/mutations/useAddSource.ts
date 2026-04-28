import { useQueryClient } from '@tanstack/react-query'
import { useAppMutation } from '@/core/query/useAppMutation'

import { knowledgeApi } from '@/features/knowledge/infrastructure/api/knowledge.api'
import { mapSourceDTO } from '@/features/knowledge/infrastructure/mappers/knowledge.mapper'

import {
  KnowledgeSource,
  KnowledgeSourceType,
} from '@/features/knowledge/domain/knowledge.types'

import { knowledgeKeys } from '../keys/knowledge.keys'

// ✅ ensure base exists
import { ensureKnowledgeBase } from '@/features/knowledge/application/utils/ensureKnowledgeBase'

// ✅ reuse existing mutation logic
import { useActivateSource } from './useActivateSource'

export function useAddSource() {
  const qc = useQueryClient()
  const activate = useActivateSource()

  return useAppMutation<
    KnowledgeSource,
    unknown,
    KnowledgeSourceType
  >({
    mutationFn: async (sourceType) => {
      // 🔥 ensure base exists first
      await ensureKnowledgeBase()

      const res = await knowledgeApi.addSource(sourceType)
      return mapSourceDTO(res)
    },

    onSuccess: async (newSource) => {
      /* -------------------------
         Optimistic insert
      ------------------------- */
      qc.setQueryData<KnowledgeSource[]>(
        knowledgeKeys.sources(),
        (old = []) =>
          old.some(s => s.id === newSource.id)
            ? old
            : [newSource, ...old]
      )

      /* -------------------------
         🔥 AUTO ACTIVATE
      ------------------------- */
      try {
        await activate.mutateAsync(newSource.id)
      } catch {
        // fail silently (backend still source of truth)
      }

      /* -------------------------
         Sync with backend
      ------------------------- */
      await qc.invalidateQueries({
        queryKey: knowledgeKeys.sources(),
      })
    },
  })
}