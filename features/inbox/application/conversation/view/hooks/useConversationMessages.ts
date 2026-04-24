// /features/inbox/application/conversation/view/hooks/useConversationMessages.ts
import { Conversation }
from '@/features/inbox/domain/conversation/conversation.types'

import {

 Message

} from '@/features/inbox/domain/message/message.types'

export function useConversationMessages(

 conversation:Conversation | null

){

 if(!conversation)
  return []

 return conversation.messages || []

}