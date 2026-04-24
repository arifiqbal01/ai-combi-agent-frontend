/* =========================
 application/mutations/useActivateSource.ts
========================= */

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addSource } from '@/features/knowledge/infrastructure/api/knowledge.api'
import { KnowledgeSource } from '../domain/knowledge.types'

export function useActivateSource() {
 const qc = useQueryClient()

 return useMutation({
  mutationFn: (id: string) => activateSource(id),

  onSuccess: (_, sourceId) => {
   qc.setQueryData(
    ['knowledge', 'sources'],
    (old: KnowledgeSource[] = []) =>
     old.map(source =>
      source.id === sourceId
       ? { ...source, status: 'ACTIVE' }
       : source
     )
   )
  },
 })
}