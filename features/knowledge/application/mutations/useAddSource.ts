/* =========================
 application/mutations/useAddSource.ts
========================= */

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addSource } from '@/features/knowledge/infrastructure/api/knowledge.api'
import { mapSourceDTO } from '@/features/knowledge/infrastructure/mappers/knowledge.mapper'

import {
 KnowledgeSource,
 KnowledgeSourceType,
} from '../domain/knowledge.types'

export function useAddSource() {
 const qc = useQueryClient()

 return useMutation<KnowledgeSource, unknown, KnowledgeSourceType>({
  mutationFn: async (sourceType) => {
   const res = await addSource(sourceType)
   return mapSourceDTO(res)
  },

  onSuccess: (newSource) => {
   qc.setQueryData(
    ['knowledge', 'sources'],
    (old: KnowledgeSource[] = []) => [newSource, ...old]
   )
  },
 })
}