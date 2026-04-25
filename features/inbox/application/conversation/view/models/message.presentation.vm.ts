import {
  Message,
  MessageVariant,
  MessageSyncState,
  DeliveryStatus
} from '@/features/inbox/domain/message/message.types'

import {
  resolveMessageIdentity
} from '@/features/inbox/domain/message/message.identity'

import {
  getMessageBody,
  hasAttachments
} from '@/features/inbox/domain/message/message.selectors'

import {
  Attachment
} from '@/features/inbox/domain/attachment/attachment.types'

export type MessagePresentationModel = {

  id: string
  clientId?: string
  serverId: string

  variant: MessageVariant

  authorName: string

  bodyHtml: string

  attachments: Attachment[]
  hasAttachments: boolean

  time: string

  status?: DeliveryStatus
  showStatus: boolean

  showAuthor: boolean
  grouped: boolean

  direction: 'in' | 'out'
  align: 'left' | 'right' | 'center'

  isAI: boolean
  isAutomated: boolean
}

const ALIGNMENT_MAP: Record<
  MessageVariant,
  'left' | 'right' | 'center'
> = {
  customer: 'left',
  agent: 'right',
  ai: 'right',
  system: 'center',
  internal: 'center'
}

/* =========================
   STATUS RESOLVER (FIXED)
========================= */

function resolveDeliveryStatus(
  message: Message
): DeliveryStatus | undefined {

  const syncMessage =
    message as Message & { syncState?: MessageSyncState }

  if (syncMessage.syncState) {
    return syncMessage.syncState as DeliveryStatus
  }

  return message.meta?.status
}

/* =========================
   PRESENTATION MAPPER
========================= */

export function mapMessageToPresentation(
  message: Message,
  grouped: boolean
): MessagePresentationModel {

  const identity =
    resolveMessageIdentity(message)

  const variant = identity.variant

  const stableId =
    message.clientId || message.id

  const status =
    resolveDeliveryStatus(message)

  return {

    id: stableId,
    clientId: message.clientId,
    serverId: message.id,

    variant,

    authorName: identity.displayName,

    bodyHtml: getMessageBody(message),

    attachments: message.attachments ?? [],
    hasAttachments: hasAttachments(message),

    time: message.meta.displayTime,

    status,

    showStatus:
      identity.isOutbound &&
      identity.isHuman,

    showAuthor:
      !grouped &&
      variant !== MessageVariant.SYSTEM,

    grouped,

    direction:
      identity.isInbound ? 'in' : 'out',

    align:
      ALIGNMENT_MAP[variant],

    isAI: identity.isAI,
    isAutomated: identity.isAutomated
  }
}