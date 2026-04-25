import { useQueryClient } from '@tanstack/react-query'

import { useSources } from '@/features/knowledge/application/queries/useSources'
import { useAddSource } from '@/features/knowledge/application/mutations/useAddSource'
import { useUploadDocument } from '@/features/knowledge/application/mutations/useUploadDocument'

import {
  KnowledgeSourceType,
  KnowledgeStatus,
  KnowledgeDocument,
} from '@/features/knowledge/domain/knowledge.types'

import { knowledgeKeys } from '@/features/knowledge/application/keys/knowledge.keys'

export function useSmartKnowledge() {
  const queryClient = useQueryClient()

  const { data: sources = [] } = useSources()

  const addSource = useAddSource()
  const upload = useUploadDocument()

  /* -------------------------
     Ensure GENERAL source (safe)
  ------------------------- */
  async function getGeneralSource() {
    const cached =
      queryClient.getQueryData<typeof sources>(
        knowledgeKeys.sources()
      ) || []

    const existing = cached.find(
      s => s.type === KnowledgeSourceType.GENERAL
    )

    if (existing) return existing

    const created = await addSource.mutateAsync(
      KnowledgeSourceType.GENERAL
    )

    return created
  }

  /* -------------------------
     Add knowledge
  ------------------------- */
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

    if (!finalSourceId) return

    const tempId = 'temp-' + Date.now()

    /* -------------------------
       Optimistic update (safe)
    ------------------------- */
    queryClient.setQueryData<KnowledgeDocument[]>(
      knowledgeKeys.documents(finalSourceId),
      (old = []) => {
        if (old.some(d => d.id === tempId)) return old

        return [
          {
            id: tempId,
            sourceId: finalSourceId,
            version: 'draft',
            content,
            preview: content,
            status: KnowledgeStatus.PROCESSING,
            createdAt: new Date().toISOString(),
          },
          ...old,
        ]
      }
    )

    try {
      await upload.mutateAsync({
        sourceId: finalSourceId,
        content,
      })

      // ✅ No manual invalidation needed (handled in mutation)

    } catch (err) {
      /* -------------------------
         Rollback
      ------------------------- */
      queryClient.setQueryData<KnowledgeDocument[]>(
        knowledgeKeys.documents(finalSourceId),
        (old = []) =>
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