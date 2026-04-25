import { useQueryClient } from '@tanstack/react-query'
import { useAppMutation } from '@/core/query/useAppMutation'

import { uploadDocument } from '@/features/knowledge/infrastructure/api/knowledge.api'
import { knowledgeKeys } from '@/features/knowledge/application/keys/knowledge.keys'

type UploadPayload = {
  sourceId: string
  content: string
}

export function useUploadDocument() {
  const qc = useQueryClient()

  return useAppMutation({
    mutationFn: async ({ sourceId, content }: UploadPayload) => {
      return await uploadDocument(sourceId, content)
    },

    onSuccess: async (_data, { sourceId }) => {
      // ✅ invalidate documents of this source
      await qc.invalidateQueries({
        queryKey: knowledgeKeys.documents(sourceId),
      })

      // ✅ refresh sources list (status/count might change)
      await qc.invalidateQueries({
        queryKey: knowledgeKeys.sources(),
      })
    },
  })
}