/* infrastructure/mappers/message.mapper.ts */

import {
  MessageDTO
} from '../dto/message.dto'

import {
  Message
} from '@/features/inbox/domain/message'

import {
  mapAttachments
} from './attachment.mapper'

import {
  processMessages
} from '@/features/inbox/application/message/message.pipeline'

import {
  normalizeDirection,
  normalizeDeliveryStatus,
  resolveKind,
  resolveAuthor,
  resolveFlags,
  formatDisplayTime,
  resolveParticipants
} from './utils/message.utils'

/* =========================
   Message mapper
========================= */

export function mapMessageDTO(
  dto: MessageDTO,
  channelAccount?: string,
  conversationSender?: string
): Message {

  if (!dto.timestamp) {
    throw new Error(`MessageDTO missing timestamp: ${dto.id}`)
  }

  const direction =
    normalizeDirection(dto.direction)

  const kind =
    resolveKind(dto.actor_type)

  const createdAt = dto.timestamp

  const deliveryStatus =
    normalizeDeliveryStatus(dto.delivery_status)

  return {
    id: dto.id,

    clientId: dto.client_id ?? undefined,

    direction,

    kind,

    author:
      resolveAuthor(dto),

    subject: undefined,

    bodyText:
      dto.body_text ??
      dto.preview ??
      undefined,

    bodyHtml:
      dto.body ?? '',

    attachments:
      mapAttachments(dto.attachments ?? []),

    participants:
      resolveParticipants(
        dto,
        channelAccount,
        conversationSender
      ),

    flags:
      resolveFlags(
        dto.actor_type,
        deliveryStatus
      ),

    meta: {
      createdAt,
      displayTime:
        formatDisplayTime(createdAt),
      status: deliveryStatus
    }
  }
}

/* =========================
   Message list mapper
========================= */

export function mapMessages(
  messages: MessageDTO[] | null | undefined,
  channelAccount?: string,
  conversationSender?: string
): Message[] {

  if (!messages?.length)
    return []

  const mapped: Message[] =
    messages.map((message) =>
      mapMessageDTO(
        message,
        channelAccount,
        conversationSender
      )
    )

  return processMessages(mapped)
}