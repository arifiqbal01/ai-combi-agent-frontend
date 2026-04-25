// features/inbox/infrastructure/dto/conversation.dto.ts

import { MessageDTO } from './message.dto'

export type ConversationListItemDTO = {
  id: string
  subject?: string
  preview?: string
  unread_count?: number
  last_message_at: string
  channel_type?: string
  sender?: string
  channel_account?: string
}

export type ConversationDetailDTO = {
  id: string
  subject?: string
  unread_count?: number
  last_message_at: string
  channel_type?: string
  sender?: string
  channel_account?: string

  messages?: MessageDTO[] // ✅ FIXED
}

export type ConversationListResponseDTO = {
  data: ConversationListItemDTO[]
}