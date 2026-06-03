// features/inbox/infrastructure/dto/conversation.dto.ts

import { MessageDTO } from './message.dto'
import { ParticipantDTO } from './participant.dto'

export type ConversationListItemDTO = {
  id: string

  participant?: ParticipantDTO | null

  subject?: string
  preview?: string

  unread_count?: number

  last_message_at: string

  channel_type?: string
  channel_account?: string
}

export type ConversationDetailDTO = {
  id: string

  participant?: ParticipantDTO | null

  subject?: string

  unread_count?: number

  last_message_at: string

  channel_type?: string
  channel_account?: string

  messages?: MessageDTO[]
}

export type ConversationListResponseDTO = {
  conversations: ConversationListItemDTO[]

  limit: number
  offset: number
  total?: number | null
}