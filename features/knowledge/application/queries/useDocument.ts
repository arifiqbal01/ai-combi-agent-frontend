/* =========================
 application/queries/useDocument.ts
========================= */

import { useQuery } from '@tanstack/react-query'

import { getDocument } from '@/features/knowledge/infrastructure/api/knowledge.api'

import {
  KnowledgeStatus,
} from '@/features/knowledge/domain/knowledge.types'

export type KnowledgeDocumentDetail = {
  id: string
  sourceId: string
  version: string
  status: KnowledgeStatus
  content: string
}

export function useDocument(
  sourceId?: string,
  documentId?: string
) {
  return useQuery<KnowledgeDocumentDetail>({
    // ✅ FIXED (no empty key)
    queryKey: ['document', documentId],

    enabled: !!sourceId && !!documentId,

    queryFn: async () => {
      const res = await getDocument(sourceId!, documentId!)

      // ✅ DO NOT cache null — let UI decide
      return {
        id: res.id,
        sourceId: res.source_id,
        version: res.version,
        status: res.status,
        content: res.content,
      }
    },

    // ✅ CACHE (detail is semi-static)
    staleTime: 60 * 1000,
    gcTime: 10 * 60 * 1000,

    // ✅ UX
    placeholderData: (prev) => prev,
  })
}