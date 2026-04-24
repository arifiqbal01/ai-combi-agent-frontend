export const conversationStreamEvents = [
  'connected',
  'message_received',
  'message_sent',
  'message_delivered',
  'message_read',
  'message_failed',
  'ai_run_updated',
  'ai_suggestion_ready',
  'conversation_updated',
  'unread_changed',
  'heartbeat',
] as const

export type ConversationStreamEvent =
  (typeof conversationStreamEvents)[number]

type Handlers = Partial<
  Record<ConversationStreamEvent, (payload: any) => void>
>

export function buildConversationHandlers(
  handlers: Handlers
) {
  const map: Record<string, (payload: any) => void> = {}

  conversationStreamEvents.forEach((event) => {
    map[event] = (payload: any) => {
      handlers?.[event]?.(payload)
    }
  })

  return map
}