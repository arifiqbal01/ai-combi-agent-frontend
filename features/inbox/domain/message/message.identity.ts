import {
  Message,
  MessageVariant,
  MessageDirection,
  MessageAuthorType,
  MessageKind,
  MessageIdentity
} from './message.types'

/* =========================
   Variant resolver (FIXED)
========================= */

function resolveVariant(
  message: Message
): MessageVariant {

  /* -------------------------
     AI (STRONGEST SIGNAL)
  ------------------------- */

  if (
    message.author.type === MessageAuthorType.AI ||
    message.kind === MessageKind.AI ||
    message.flags?.aiGenerated
  ) {
    return MessageVariant.AI
  }

  /* -------------------------
     SYSTEM
  ------------------------- */

  if (
    message.author.type === MessageAuthorType.SYSTEM ||
    message.kind === MessageKind.SYSTEM
  ) {
    return MessageVariant.SYSTEM
  }

  /* -------------------------
     AGENT (HUMAN OUTBOUND ONLY)
  ------------------------- */

  if (
    message.direction === MessageDirection.OUTBOUND &&
    message.author.type === MessageAuthorType.HUMAN
  ) {
    return MessageVariant.AGENT
  }

  /* -------------------------
     DEFAULT = CUSTOMER
  ------------------------- */

  return MessageVariant.CUSTOMER
}

/* =========================
   Display name
========================= */

function resolveDisplayName(
  message: Message,
  variant: MessageVariant
) {

  if (variant === MessageVariant.AI)
    return 'AI Assistant'

  if (variant === MessageVariant.SYSTEM)
    return 'System'

  if (variant === MessageVariant.AGENT)
    return 'You'

  return (
    message.author.name ||
    'Customer'
  )
}

/* =========================
   Identity resolver
========================= */

export function resolveMessageIdentity(
  message: Message
): MessageIdentity {

  const variant =
    resolveVariant(message)

  const actorType =
    message.author.type

  const isAI =
    variant === MessageVariant.AI

  const isSystem =
    variant === MessageVariant.SYSTEM

  const isHuman =
    actorType === MessageAuthorType.HUMAN

  const isOutbound =
    message.direction === MessageDirection.OUTBOUND

  const isInbound =
    message.direction === MessageDirection.INBOUND

  return {

    actorType,

    variant,

    direction:
      message.direction,

    isAI,

    isHuman,

    isSystem,

    isOutbound,

    isInbound,

    /* FIXED: proper automation detection */
    isAutomated:

      isAI ||

      message.flags?.autoSent ||

      message.kind === MessageKind.AUTO ||

      false,

    displayName:

      resolveDisplayName(
        message,
        variant
      )

  }
}

/* =========================
   Convenience helpers
========================= */

export function isCustomerMessage(
  message: Message
) {
  return resolveMessageIdentity(message)
    .variant === MessageVariant.CUSTOMER
}

export function isAgentMessage(
  message: Message
) {
  return resolveMessageIdentity(message)
    .variant === MessageVariant.AGENT
}

export function isAIIdentity(
  message: Message
) {
  return resolveMessageIdentity(message)
    .isAI
}