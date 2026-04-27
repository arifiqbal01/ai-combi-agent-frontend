import { useQueryClient } from '@tanstack/react-query'
import { useAppMutation } from '@/core/query/useAppMutation'

import { knowledgeApi } from '@/features/knowledge/infrastructure/api/knowledge.api'
import { knowledgeKeys } from '@/features/knowledge/application/keys/knowledge.keys'

type UploadPayload = {
  sourceId: string
  content: string
}

export function useUploadDocument() {
  const qc = useQueryClient()

  return useAppMutation({
    mutationFn: async ({ sourceId, content }: UploadPayload) => {
      return await knowledgeApi.uploadDocument(sourceId, content) // ✅ FIXED
    },

    onSuccess: async (_data, { sourceId }) => {
      await qc.invalidateQueries({
        queryKey: knowledgeKeys.documents(sourceId),
      })

      await qc.invalidateQueries({
        queryKey: knowledgeKeys.sources(),
      })
    },
  })
}