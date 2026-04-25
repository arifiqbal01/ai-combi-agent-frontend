import {
  ChannelType
} from '@/features/inbox/domain/channel/channel.types'

export type MessagePolicy = {
  limits: {
    maxMessageLength: number
    maxAttachments: number
    maxFileSizeMB: number
  }

  capabilities: {
    canReply: boolean
    canAttach: boolean
    canAI: boolean
  }
}

type MessagePolicyOverride = {
  limits?: Partial<MessagePolicy['limits']>
  capabilities?: Partial<MessagePolicy['capabilities']>
}

export const DEFAULT_POLICY: Readonly<MessagePolicy> = {
  limits: {
    maxMessageLength: 5000,
    maxAttachments: 10,
    maxFileSizeMB: 25
  },

  capabilities: {
    canReply: true,
    canAttach: true,
    canAI: true
  }
}

/**
 * MUST match ChannelType EXACTLY
 */
const CHANNEL_POLICY: Record<ChannelType, MessagePolicyOverride> = {
  [ChannelType.EMAIL]: {},

  [ChannelType.WHATSAPP]: {
    limits: {
      maxMessageLength: 1024,
      maxAttachments: 1,
      maxFileSizeMB: 16
    }
  },

  [ChannelType.INSTAGRAM]: {
    capabilities: {
      canAttach: false
    }
  },

  [ChannelType.SLACK]: {},

  // ✅ REQUIRED (was missing)
  [ChannelType.SYSTEM]: {
    capabilities: {
      canReply: false,
      canAttach: false,
      canAI: false
    }
  }
}

export function resolveMessagePolicy(
  channel?: ChannelType | null
): MessagePolicy {

  const override =
    channel ? CHANNEL_POLICY[channel] : undefined

  return {
    limits: {
      ...DEFAULT_POLICY.limits,
      ...override?.limits
    },

    capabilities: {
      ...DEFAULT_POLICY.capabilities,
      ...override?.capabilities
    }
  }
}

export function getDefaultMessagePolicy(): MessagePolicy {
  return {
    limits: { ...DEFAULT_POLICY.limits },
    capabilities: { ...DEFAULT_POLICY.capabilities }
  }
}