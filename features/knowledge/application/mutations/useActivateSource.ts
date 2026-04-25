import { useQueryClient } from '@tanstack/react-query'
import { useAppMutation } from '@/core/query/useAppMutation'

import { activateSource } from '@/features/knowledge/infrastructure/api/knowledge.api'

import {
  KnowledgeSource,
  KnowledgeStatus,
} from '@/features/knowledge/domain/knowledge.types'

import { knowledgeKeys } from '../keys/knowledge.keys'

export function useActivateSource() {
  const qc = useQueryClient()

  return useAppMutation({
    mutationFn: (id: string) => activateSource(id),

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