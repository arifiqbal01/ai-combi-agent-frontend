import { useQueryClient } from '@tanstack/react-query'
import { useAppMutation } from '@/core/query/useAppMutation'

import { knowledgeApi } from '@/features/knowledge/infrastructure/api/knowledge.api'

import {
  KnowledgeSource,
  KnowledgeStatus,
} from '@/features/knowledge/domain/knowledge.types'

import { knowledgeKeys } from '../keys/knowledge.keys'

export function useActivateSource() {
  const qc = useQueryClient()

  return useAppMutation({
    mutationFn: (id: string) =>
      knowledgeApi.activateSource(id), // ✅ FIXED

    onSuccess: (_, sourceId) => {
      qc.setQueryData<KnowledgeSource[]>(
        knowledgeKeys.sources(),
        (old = []) =>
          old.map(source =>
            source.id === sourceId
              ? {
                  ...source,
                  status: KnowledgeStatus.ACTIVE,
                }
              : source
          )
      )
    },
  })
}