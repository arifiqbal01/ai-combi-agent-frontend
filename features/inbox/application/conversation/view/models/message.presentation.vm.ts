/* application/conversation/view/models/message.presentation.vm.ts */

import {
  Message,
  MessageVariant,
  MessageSyncState
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

  status?: string
  showStatus: boolean

  showAuthor: boolean
  grouped: boolean

  direction: 'in' | 'out'
  align: 'left' | 'right' | 'center'

  /* NEW (important for UI clarity) */
  isAI: boolean
  isAutomated: boolean

}

/* =========================
   ALIGNMENT (STRICT VARIANT)
========================= */

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
   STATUS RESOLVER
========================= */

function resolveDeliveryStatus(
  message: Message
): string | undefined {

  // Prefer sync state if exists
  if ((message as any).syncState) {
    return (message as any).syncState
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

  /* CRITICAL: single source */
  const variant = identity.variant

  /* CRITICAL: stable identity */
  const stableId =
    message.clientId || message.id

  const status =
    resolveDeliveryStatus(message)

  return {

    /* identity */
    id: stableId,
    clientId: message.clientId,
    serverId: message.id,

    variant,

    /* author */
    authorName: identity.displayName,

    /* content */
    bodyHtml: getMessageBody(message),

    attachments: message.attachments || [],
    hasAttachments: hasAttachments(message),

    /* meta */
    time: message.meta.displayTime,

    status,

    /* =========================
       DISPLAY RULES
    ========================= */

    /* only outbound human shows delivery */
    showStatus:
      identity.isOutbound &&
      identity.isHuman,

    /* hide author for grouped + system */
    showAuthor:
      !grouped &&
      variant !== MessageVariant.SYSTEM,

    grouped,

    /* =========================
       DIRECTION (UI SAFE)
    ========================= */

    direction:
      identity.isInbound ? 'in' : 'out',

    /* STRICT: variant-driven alignment */
    align:
      ALIGNMENT_MAP[variant],

    /* =========================
       AI FLAGS (important)
    ========================= */

    isAI: identity.isAI,

    isAutomated:
      identity.isAutomated

  }
}