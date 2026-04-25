import { Message } from '../message/message.types'
import { buildTimeline } from './timeline.service'
import { mapTimeline } from './timeline.mapper'

export function buildGroupedTimeline(
  messages: Message[],
  lastReadMessageId?: string
) {
  const items = buildTimeline(messages, lastReadMessageId)
  return mapTimeline(items)
}