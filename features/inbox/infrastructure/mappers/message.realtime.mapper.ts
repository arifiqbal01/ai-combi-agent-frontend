import {

 Message,
 MessageDirection,
 MessageKind,
 MessageAuthorType,
 DeliveryStatus

} from '@/features/inbox/domain/message'

import {

 ParticipantTransportRole

} from '@/features/inbox/domain/participant/participant.types'

import { processMessage } from '@/features/inbox/application/message/message.pipeline'

import {
  normalizeDirection,
  normalizeDeliveryStatus,
  resolveKind,
  resolveAuthor,
  resolveFlags,
  formatDisplayTime
} from './utils/message.utils'

/* =========================
 Realtime mapper (FIXED)
========================= */

export function mapRealtimeMessageDTO(
  dto: any
): Message {

  const createdAt =
    dto.timestamp ||
    dto.updated_at ||
    new Date().toISOString()

  const direction =
    normalizeDirection(dto.direction)

  const deliveryStatus =
    normalizeDeliveryStatus(
      dto.delivery_status
    )

  const kind =
    resolveKind(dto)

  const author =
    resolveAuthor(dto)

  const message: Message = {

    id:
      dto.message_id || dto.id,

    clientId:
      dto.client_id ||
      dto.clientId ||
      undefined,

    direction,

    kind,

    author,

    subject: undefined,

    bodyText:
      dto.body_text ||
      dto.preview ||
      '',

    bodyHtml:
      dto.body ||
      dto.preview ||
      '',

    attachments:
      dto.attachments || [],

    participants: [],

    flags: {

      aiGenerated:
        dto.actor_type === 'ai',

      autoSent:
        dto.actor_type === 'ai',

      failed:
        deliveryStatus === DeliveryStatus.FAILED

    },

    meta: {

      createdAt,

      displayTime:
        new Date(createdAt).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        }),

      status:
        deliveryStatus

    }

  }

  /* ✅ CRITICAL: run pipeline */
  return processMessage(message)
}