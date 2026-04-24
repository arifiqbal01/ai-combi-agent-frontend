import { useQueryClient } from '@tanstack/react-query'

import { useSources } from '@/features/knowledge/application/queries/useSources'
import { useAddSource } from '@/features/knowledge/application/mutations/useAddSource'
import { useUploadDocument } from '@/features/knowledge/application/mutations/useUploadDocument'

import { KnowledgeSourceType } from '@/features/knowledge/domain/knowledge.types'
import { knowledgeKeys } from '@/features/knowledge/application/keys/knowledge.keys'

export function useSmartKnowledge() {
  const queryClient = useQueryClient()

  const { data: sources = [] } = useSources()

  const addSource = useAddSource()
  const upload = useUploadDocument()

  async function getGeneralSource() {
    const existing = sources.find(
      s => s.type === KnowledgeSourceType.GENERAL
    )

    if (existing) return existing

    const created = await addSource.mutateAsync(
      KnowledgeSourceType.GENERAL
    )

    // ✅ refresh sources after creating
    queryClient.invalidateQueries({
      queryKey: knowledgeKeys.sources(),
    })

    return created
  }

  async function addKnowledge(
    content: string,
    sourceId?: string
  ) {
    if (!content.trim()) return

    let finalSourceId = sourceId

    if (!finalSourceId) {
      const source = await getGeneralSource()
      finalSourceId = source.id
    }

    // ✅ OPTIMISTIC UPDATE (instant UI)
    const tempId = 'temp-' + Date.now()

    queryClient.setQueryData(
      knowledgeKeys.documents(finalSourceId),
      (old: any[] = []) => [
        {
          id: tempId,
          content,
          preview: content,
          status: 'PROCESSING',
          createdAt: new Date().toISOString(),
        },
        ...old,
      ]
    )

    try {
      await upload.mutateAsync({
        sourceId: finalSourceId,
        content,
      })

      // ✅ refresh real data
      queryClient.invalidateQueries({
        queryKey: knowledgeKeys.documents(finalSourceId),
      })

      queryClient.invalidateQueries({
        queryKey: knowledgeKeys.sources(),
      })

    } catch (err) {
      // ❌ rollback optimistic
      queryClient.setQueryData(
        knowledgeKeys.documents(finalSourceId),
        (old: any[] = []) =>
          old.filter(d => d.id !== tempId)
      )

      throw err
    }
  }

  return {
    addKnowledge,
    isAdding:
      addSource.isPending || upload.isPending,
  }
}