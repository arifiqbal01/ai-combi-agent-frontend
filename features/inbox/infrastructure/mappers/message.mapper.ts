/* infrastructure/mappers/message.mapper.ts */

import {
  MessageDTO,
} from '../dto/message.dto'

import {
  Message,
} from '@/features/inbox/domain/message'

import {
  Participant,
} from '@/features/inbox/domain/participant/participant.types'

import {
  mapAttachments,
} from './attachment.mapper'

import {
  mapParticipantDTO,
} from './participant.mapper'

import {
  processMessages,
} from '@/features/inbox/application/message/message.pipeline'

import {
  normalizeDirection,
  normalizeDeliveryStatus,
  resolveKind,
  resolveAuthor,
  resolveFlags,
  formatDisplayTime,
  resolveParticipants,
} from './utils/message.utils'

/* =========================
   Message mapper
========================= */

export function mapMessageDTO(
  dto: MessageDTO,
  channelAccount?: string,
  conversationParticipant?: Participant
): Message {

  if (!dto.timestamp) {
    throw new Error(
      `MessageDTO missing timestamp: ${dto.id}`
    )
  }

  const direction =
    normalizeDirection(dto.direction)

  const kind =
    resolveKind(dto.actor_type)

  const createdAt =
    dto.timestamp

  const deliveryStatus =
    normalizeDeliveryStatus(
      dto.delivery_status
    )

  return {
    id: dto.id,

    clientId:
      dto.client_id ?? undefined,

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

    sender:
      dto.sender
        ? mapParticipantDTO(dto.sender)
        : undefined,

    attachments:
      mapAttachments(
        dto.attachments ?? []
      ),

    participants:
      resolveParticipants(
        dto,
        channelAccount,
        conversationParticipant
      ),

    flags:
      resolveFlags(
        dto.actor_type,
        deliveryStatus
      ),

    meta: {
      createdAt,

      displayTime:
        formatDisplayTime(
          createdAt
        ),

      status:
        deliveryStatus,
    },
  }
}

/* =========================
   Message list mapper
========================= */

export function mapMessages(
  messages:
    | MessageDTO[]
    | null
    | undefined,

  channelAccount?: string,

  conversationParticipant?: Participant
): Message[] {

  if (!messages?.length) {
    return []
  }

  const mapped: Message[] =
    messages.map(
      (message) =>
        mapMessageDTO(
          message,
          channelAccount,
          conversationParticipant
        )
    )

  return processMessages(
    mapped
  )
}