/* =========================
 application/mutations/useDeactivateSource.ts
========================= */

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deactivateSource } from '@/features/knowledge/infrastructure/api/knowledge.api'
import { KnowledgeSource } from '../domain/knowledge.types'

export function useDeactivateSource() {
 const qc = useQueryClient()

 return useMutation({
  mutationFn: (id: string) => deactivateSource(id),

  onSuccess: (_, sourceId) => {
   qc.setQueryData(
    ['knowledge', 'sources'],
    (old: KnowledgeSource[] = []) =>
     old.map(source =>
      source.id === sourceId
       ? { ...source, status: 'INACTIVE' }
       : source
     )
   )
  },
 })
}