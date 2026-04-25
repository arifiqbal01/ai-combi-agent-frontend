import {
  Message,
  DeliveryStatus,
  MessageSyncState
} from './message.types'

function mapSyncToDelivery(
  status: MessageSyncState
): DeliveryStatus {
  switch (status) {
    case 'sending':
    case 'pending':
      return 'pending'
    case 'sent':
      return 'sent'
    case 'delivered':
      return 'delivered'
    case 'read':
      return 'read'
    case 'failed':
      return 'failed'
    default:
      return 'pending'
  }
}

export function applyDeliveryUpdate(
  messages: Message[],
  messageId?: string,
  clientId?: string,
  syncStatus?: MessageSyncState
): Message[] {

  if (!syncStatus) return messages

  const status = mapSyncToDelivery(syncStatus)

  return messages.map((m) => {

    const isTarget =
      m.id === messageId ||
      (clientId && m.clientId === clientId)

    if (!isTarget) return m

    if (
      m.meta?.status === 'read' &&
      status !== 'read'
    ) {
      return m
    }

    return {
      ...m,
      meta: {
        ...m.meta,
        status
      }
    }
  })
}