import { useQueryClient } from '@tanstack/react-query'
import { useAppMutation } from '@/core/query/useAppMutation'

import { knowledgeApi } from '@/features/knowledge/infrastructure/api/knowledge.api'

import {
  KnowledgeSource,
  KnowledgeStatus,
} from '@/features/knowledge/domain/knowledge.types'

import { knowledgeKeys } from '../keys/knowledge.keys'

export function useDeactivateSource() {
  const qc = useQueryClient()

  return useAppMutation({
    mutationFn: (id: string) =>
      knowledgeApi.deactivateSource(id), // ✅ FIXED

    onSuccess: async (_data, sourceId) => {
      qc.setQueryData<KnowledgeSource[]>(
        knowledgeKeys.sources(),
        (old = []) =>
          old.map(source =>
            source.id === sourceId
              ? { ...source, status: KnowledgeStatus.INACTIVE }
              : source
          )
      )

      await qc.invalidateQueries({
        queryKey: knowledgeKeys.sources(),
      })
    },
  })
}