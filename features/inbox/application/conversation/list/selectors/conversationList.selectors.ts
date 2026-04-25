import { useAppQuery } from '@/core/query/useAppQuery'

import {
  listConversations
} from '@/features/inbox/infrastructure/api/conversation.api'

import {
  mapConversationListItemDTO
} from '@/features/inbox/infrastructure/mappers/conversation.mapper'

import {
  ConversationSummary
} from '@/features/inbox/domain/conversation/conversation.types'

export function useConversationList() {

  const query = useAppQuery<ConversationSummary[]>({
    queryKey: ['conversations'],

    queryFn: async () => {
      const conversations = await listConversations()

      return conversations.map(
        mapConversationListItemDTO
      )
    },

    staleTime: 60 * 1000,
    gcTime: 10 * 60 * 1000,

    refetchInterval: 5000,
  })

  return {
    items: query.data ?? [],
    loading: query.isLoading,
    refresh: query.refetch
  }
}