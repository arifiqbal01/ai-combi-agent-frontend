import { useQuery } from '@tanstack/react-query'

import { getConversation } from '@/features/inbox/infrastructure/api/conversation.api'
import { mapConversationDetailDTO } from '@/features/inbox/infrastructure/mappers/conversation.mapper'
import { useTenantGuard } from '@/core/session/useTenantGuard'

export function useConversation(conversationId: string | null) {

  const { hasTenant } = useTenantGuard()

  return useQuery({
    queryKey: ['conversation', conversationId],

    queryFn: async () => {
      if (!conversationId) throw new Error('NO_CONVERSATION')

      const dto = await getConversation(conversationId)
      return mapConversationDetailDTO(dto)
    },

    enabled: !!conversationId && hasTenant,

    // ✅ CACHE IMPROVEMENTS
    staleTime: 30 * 1000,        // 30s → data considered fresh
    gcTime: 5 * 60 * 1000,       // keep in cache for 5 min

    refetchInterval: 5000,       // keep polling
    refetchOnWindowFocus: false, // avoid unnecessary refetch spam

    retry: (count, err: any) => {
      if (err?.message === 'NO_CONVERSATION') return false
      if (err?.message === 'NO_TENANT') return false
      return count < 2
    },
  })
}