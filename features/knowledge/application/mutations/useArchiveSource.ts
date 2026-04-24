/* =========================
 application/mutations/useArchiveSource.ts
========================= */

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { archiveSource } from '@/features/knowledge/infrastructure/api/knowledge.api'
import { knowledgeKeys } from '@/features/knowledge/application/keys/knowledge.keys'

export function useArchiveSource() {
 const qc = useQueryClient()

 return useMutation({
  mutationFn: (id: string) => archiveSource(id),

  onSuccess: () => {
   qc.invalidateQueries({
    queryKey: knowledgeKeys.sources(),
   })
  },
 })
}