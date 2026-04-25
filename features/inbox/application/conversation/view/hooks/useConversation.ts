import { useAppQuery } from '@/core/query/useAppQuery'

import { getConversation } from '@/features/inbox/infrastructure/api/conversation.api'
import { mapConversationDetailDTO } from '@/features/inbox/infrastructure/mappers/conversation.mapper'

import {
  Conversation
} from '@/features/inbox/domain/conversation/conversation.types'

export function useConversation(
  conversationId: string | null
) {

  return useAppQuery<Conversation>({
    queryKey: ['conversation', conversationId],

    queryFn: async () => {
      if (!conversationId) {
        throw new Error('NO_CONVERSATION')
      }

      const dto = await getConversation(conversationId)

      return mapConversationDetailDTO(dto)
    },

    // only local condition
    enabled: !!conversationId,

    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,

    refetchInterval: 5000,
    refetchOnWindowFocus: false,
  })
}