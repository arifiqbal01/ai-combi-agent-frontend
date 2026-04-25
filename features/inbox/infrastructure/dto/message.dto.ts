/* infrastructure/dto/message.dto.ts */

export type MessageDirectionDTO =
  | 'inbound'
  | 'outbound'

export type ActorTypeDTO =
  | 'human'
  | 'ai'
  | 'system'

export type MessageAttachmentDTO = {
  id: string
  file_name: string
  mime_type: string
  file_size: number
  storage_key: string
}

export type MessageDTO = {
  id: string

  client_id?: string | null

  direction: MessageDirectionDTO

  body: string | null
  body_text?: string | null
  preview?: string | null

  sender?: string | null

  actor_type?: ActorTypeDTO | null
  actor_id?: string | null

  timestamp: string

  delivery_status?:
    | 'pending'
    | 'sent'
    | 'delivered'
    | 'read'
    | 'failed'

  attachments: MessageAttachmentDTO[]
}

export type MessageResponseDTO = {
  message_id: string
  client_id?: string | null

  delivery_status:
    | 'pending'
    | 'sent'
    | 'delivered'
    | 'read'
    | 'failed'
}

/* =========================
   SEND MESSAGE REQUEST DTO
========================= */

export type MessageParticipantDTO = {
  address: string
  role: 'to' | 'from' | 'cc' | 'bcc'
}

export type NewMessageRequestDTO = {
  body: string
  subject?: string

  client_id?: string

  channel_account_id?: string

  participants?: MessageParticipantDTO[]

  attachments?: {
    id?: string
    file_name: string
    mime_type: string
    file_size: number
    storage_key?: string
  }[]
}