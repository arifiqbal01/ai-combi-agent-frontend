import {
  Conversation
} from '@/features/inbox/domain/conversation/conversation.types'

import {
  TimelineGroup
} from '@/features/inbox/domain/timeline/timeline.types'

import {
  buildTimeline
} from '@/features/inbox/domain/timeline/timeline.service'

import {
  mapTimeline
} from '@/features/inbox/domain/timeline/timeline.mapper'

export function useConversationTimeline(
  conversation: Conversation | null
): TimelineGroup[] {

  if (!conversation?.messages?.length) {
    return []
  }

  const items =
    buildTimeline(conversation.messages)

  return mapTimeline(items)
}