import {

 buildTimeline

} from '@/features/inbox/domain/timeline/timeline.service'

import {

 mapTimeline

} from '@/features/inbox/domain/timeline/timeline.mapper'

export function useConversationTimeline(

 conversation:Conversation | null

){

 if(!conversation?.messages)
  return []

 const items=

  buildTimeline(
   conversation.messages
  )

 return mapTimeline(items)

}