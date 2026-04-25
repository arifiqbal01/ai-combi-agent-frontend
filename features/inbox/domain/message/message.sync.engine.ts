import {
  Message,
  SyncableMessage,
  MessageSyncState,
  MessageDirection,
  MessageKind,
  MessageAuthorType,
  DeliveryStatus
} from './message.types'

import {
  Attachment
} from '../attachment/attachment.types'

import {
  isFailed
} from './message.delivery.rules'

export function markSending(
  message: SyncableMessage
): SyncableMessage {
  return {
    ...message,
    syncState: MessageSyncState.SENDING,
    meta: {
      ...message.meta,
      status: DeliveryStatus.PENDING
    }
  }
}

export function markSent(
  message: SyncableMessage
): SyncableMessage {
  if (message.meta.status === DeliveryStatus.READ) {
    return message
  }

  return {
    ...message,
    syncState: MessageSyncState.SENT,
    meta: {
      ...message.meta,
      status: DeliveryStatus.SENT
    }
  }
}

export function markDelivered(
  message: SyncableMessage
): SyncableMessage {
  if (message.meta.status === DeliveryStatus.READ) {
    return message
  }

  return {
    ...message,
    syncState: MessageSyncState.DELIVERED,
    meta: {
      ...message.meta,
      status: DeliveryStatus.DELIVERED
    }
  }
}

export function markRead(
  message: SyncableMessage
): SyncableMessage {
  return {
    ...message,
    syncState: MessageSyncState.READ,
    meta: {
      ...message.meta,
      status: DeliveryStatus.READ
    }
  }
}

export function markFailed(
  message: SyncableMessage
): SyncableMessage {
  if (
    message.meta.status === DeliveryStatus.DELIVERED ||
    message.meta.status === DeliveryStatus.READ
  ) {
    return message
  }

  return {
    ...message,
    syncState: MessageSyncState.FAILED,
    meta: {
      ...message.meta,
      status: DeliveryStatus.FAILED
    }
  }
}

export function canRetryMessage(
  message: SyncableMessage
): boolean {
  if (message.syncState === MessageSyncState.FAILED) {
    return true
  }

  if (isFailed(message.meta.status)) {
    return true
  }

  return false
}

export function retryMessage(
  message: SyncableMessage
): SyncableMessage {
  return {
    ...message,
    syncState: MessageSyncState.SENDING,
    meta: {
      ...message.meta,
      status: DeliveryStatus.PENDING
    }
  }
}

export function createOptimisticMessage(
  body: string,
  attachments: Attachment[] = []
): SyncableMessage {

  const now = new Date().toISOString()

  const tempId =
    `temp-${crypto.randomUUID?.() ?? `${Date.now()}`}`

  const clientId =
    crypto.randomUUID?.() ?? `${Date.now()}-client`

  const normalizedAttachments: Attachment[] =
    attachments.map((a) => ({
      ...a,
      id: a.id ?? `temp-file-${crypto.randomUUID?.() ?? Date.now()}`
    }))

  return {
    id: tempId,
    tempId,
    clientId,

    direction: MessageDirection.OUTBOUND,
    kind: MessageKind.HUMAN,

    subject: undefined,

    bodyText: body,
    bodyHtml: body,

    author: {
      name: 'You',
      type: MessageAuthorType.HUMAN
    },

    attachments: normalizedAttachments,
    participants: [],

    meta: {
      createdAt: now,
      displayTime: new Date(now).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      }),
      status: DeliveryStatus.PENDING
    },

    syncState: MessageSyncState.SENDING
  }
}