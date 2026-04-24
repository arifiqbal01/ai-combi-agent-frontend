/* infrastructure/mappers/utils/message.utils.ts */

import {
  MessageDirection,
  MessageKind,
  MessageAuthorType,
  DeliveryStatus
} from '@/features/inbox/domain/message'

/* =========================
   Direction normalization
========================= */

export function normalizeDirection(
  direction?: string
): MessageDirection {

  if (
    direction === 'out' ||
    direction === 'outbound'
  ) {
    return MessageDirection.OUTBOUND
  }

  return MessageDirection.INBOUND
}

/* =========================
   Delivery normalization
========================= */

export function normalizeDeliveryStatus(
  status?: string | null
): DeliveryStatus {

  if (!status)
    return DeliveryStatus.SENT

  if (status === DeliveryStatus.PENDING)
    return DeliveryStatus.PENDING

  if (status === DeliveryStatus.DELIVERED)
    return DeliveryStatus.DELIVERED

  if (status === DeliveryStatus.READ)
    return DeliveryStatus.READ

  if (status === DeliveryStatus.FAILED)
    return DeliveryStatus.FAILED

  return DeliveryStatus.SENT
}

/* =========================
   Kind resolver
========================= */

export function resolveKind(
  actorType?: string | null
): MessageKind {

  if (actorType === 'ai')
    return MessageKind.AI

  if (actorType === 'system')
    return MessageKind.SYSTEM

  return MessageKind.HUMAN
}

/* =========================
   Author resolver
========================= */

export function resolveAuthor(
  dto: {
    actor_type?: string | null
    sender?: string | null
    direction?: string
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
  actorType?: string | null,
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
) {

  const date = new Date(iso)

  return date.toLocaleTimeString(
    [],
    {
      hour: '2-digit',
      minute: '2-digit'
    }
  )
}

/* =========================
   Participants resolver
========================= */

import {
  Participant,
  ParticipantTransportRole
} from '@/features/inbox/domain/participant/participant.types'

export function resolveParticipants(
  dto: {
    sender?: string | null
    direction?: string
  },
  channelAccount?: string,
  conversationSender?: string
): Participant[] {

  const direction =
    normalizeDirection(dto.direction)

  if (direction === MessageDirection.INBOUND) {
    return [
      {
        address: dto.sender || '',
        role: ParticipantTransportRole.FROM
      },
      {
        address: channelAccount || '',
        role: ParticipantTransportRole.TO
      }
    ]
  }

  return [
    {
      address: channelAccount || '',
      role: ParticipantTransportRole.FROM
    },
    {
      address: conversationSender || '',
      role: ParticipantTransportRole.TO
    }
  ]
}