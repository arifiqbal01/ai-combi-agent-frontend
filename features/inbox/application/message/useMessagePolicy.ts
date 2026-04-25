import {
  resolveMessagePolicy,
  getDefaultMessagePolicy
} from '@/features/inbox/domain/message/message.policy'

import {
  useConversation
} from '@/features/inbox/application/conversation/view/hooks/useConversation'

export function useMessagePolicy(
  conversationId: string | null
){

  const { data: conversation } =
    useConversation(conversationId)

  if (!conversation) {
    return getDefaultMessagePolicy()
  }

  return resolveMessagePolicy(
    conversation.channel // ✅ FIXED
  )
}