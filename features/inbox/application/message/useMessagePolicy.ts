import { resolveMessagePolicy }
from '@/features/inbox/domain/message/message.policy'

import { useConversation }
from '../conversation/useConversation'

export function useMessagePolicy(){

 const conversation =
  useConversation()

 return resolveMessagePolicy(
  conversation?.channel
 )

}