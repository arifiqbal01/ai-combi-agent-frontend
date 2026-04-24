import { useMutation, useQueryClient } from '@tanstack/react-query'
import { uploadDocument } from '@/features/knowledge/infrastructure/api/knowledge.api'
import { knowledgeKeys } from '@/features/knowledge/application/keys/knowledge.keys'

type UploadPayload = {
  sourceId: string
  content: string
}

export function useUploadDocument() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: async ({ sourceId, content }: UploadPayload) => {
      return await uploadDocument(sourceId, content)
    },

    onSuccess: (_data, { sourceId }) => {
      // ✅ ALWAYS invalidate — let query handle mapping/sorting
      qc.invalidateQueries({
        queryKey: knowledgeKeys.documents(sourceId),
      })

      qc.invalidateQueries({
        queryKey: knowledgeKeys.sources(),
      })
    },
  })
}