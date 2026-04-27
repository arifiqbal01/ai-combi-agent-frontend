/* infrastructure/mappers/utils/message.utils.ts */

import {
  MessageDirection,
  MessageKind,
  MessageAuthorType,
  DeliveryStatus
} from '@/features/inbox/domain/message'

import {
  MessageDirectionDTO,
  ActorTypeDTO
} from '../../dto/message.dto'

import {
  Participant,
  ParticipantTransportRole
} from '@/features/inbox/domain/participant/participant.types'

/* =========================
   Direction normalization
========================= */

export function normalizeDirection(
  direction?: MessageDirectionDTO | string | null
): MessageDirection {

  switch (direction) {
    case 'outbound':
    case 'out':
      return MessageDirection.OUTBOUND

    case 'inbound':
    case 'in':
    default:
      return MessageDirection.INBOUND
  }
}

/* =========================
   Delivery normalization
========================= */

export function normalizeDeliveryStatus(
  status?: string | null
): DeliveryStatus {

  switch (status) {
    case 'pending':
      return DeliveryStatus.PENDING

    case 'sent':
      return DeliveryStatus.SENT

    case 'delivered':
      return DeliveryStatus.DELIVERED

    case 'read':
      return DeliveryStatus.READ

    case 'failed':
      return DeliveryStatus.FAILED

    default:
      return DeliveryStatus.PENDING // ✅ safer
  }
}

/* =========================
   Kind resolver
========================= */

export function resolveKind(
  actorType?: ActorTypeDTO | string | null
): MessageKind {

  switch (actorType) {
    case 'ai':
      return MessageKind.AI

    case 'system':
      return MessageKind.SYSTEM

    case 'human':
    default:
      return MessageKind.HUMAN
  }
}

/* =========================
   Author resolver
========================= */

export function resolveAuthor(
  dto: {
    actor_type?: ActorTypeDTO | string | null
    sender?: string | null
    direction?: MessageDirectionDTO | string
  }
): {
  name: string
  type: MessageAuthorType
} {

  const direction =
    normalizeDirection(dto.direction)

  if (dto.actor_type === 'ai') {
    return {
      name: 'AI Assistant',
      type: MessageAuthorType.AI
    }
  }

  if (dto.actor_type === 'system') {
    return {
      name: 'System',
      type: MessageAuthorType.SYSTEM
    }
  }

  if (direction === MessageDirection.OUTBOUND) {
    return {
      name: 'You',
      type: MessageAuthorType.HUMAN
    }
  }

  const sender =
    dto.sender?.split('@')[0]

  return {
    name: sender || 'Customer',
    type: MessageAuthorType.HUMAN
  }
}

/* =========================
   Flags resolver
========================= */

export function resolveFlags(
  actorType?: ActorTypeDTO | string | null,
  deliveryStatus?: DeliveryStatus
) {

  const isAI = actorType === 'ai'

  return {
    aiGenerated: isAI,
    autoSent: isAI,
    failed: deliveryStatus === DeliveryStatus.FAILED
  }
}

/* =========================
   Time formatter
========================= */

export function formatDisplayTime(
  iso: string
): string {

  const date = new Date(iso)

  if (Number.isNaN(date.getTime())) {
    return ''
  }

  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  })
}

/* =========================
   Participants resolver
========================= */

export function resolveParticipants(
  dto: {
    sender?: string | null
    direction?: MessageDirectionDTO | string
  },
  channelAccount?: string,
  conversationSender?: string
): Participant[] {

  const direction =
    normalizeDirection(dto.direction)

  if (direction === MessageDirection.INBOUND) {
    return [
      {
        address: dto.sender ?? '',
        role: ParticipantTransportRole.FROM
      },
      {
        address: channelAccount ?? '',
        role: ParticipantTransportRole.TO
      }
    ]
  }

  return [
    {
      address: channelAccount ?? '',
      role: ParticipantTransportRole.FROM
    },
    {
      address: conversationSender ?? '',
      role: ParticipantTransportRole.TO
    }
  ]
}