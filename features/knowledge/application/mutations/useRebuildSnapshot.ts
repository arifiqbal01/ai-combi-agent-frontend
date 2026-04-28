import { useAppMutation } from '@/core/query/useAppMutation'
import { knowledgeApi } from '@/features/knowledge/infrastructure/api/knowledge.api'

import { RebuildSnapshotResponseDTO } from '@/features/knowledge/infrastructure/dto/knowledge.dto'

import { toast } from '@/ui'

export function useRebuildSnapshot() {
  return useAppMutation<
    RebuildSnapshotResponseDTO,
    unknown,
    void
  >({
    mutationFn: () => knowledgeApi.rebuildSnapshot(),

    onSuccess: () => {
      toast.success('Knowledge snapshot rebuilt')
    },

    onError: () => {
      toast.error('Failed to rebuild snapshot')
    },
  })
}