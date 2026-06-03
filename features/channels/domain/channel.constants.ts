// domain/channel.constants.ts

export const CHANNEL_STATUS = {
  ENABLED: 'enabled',
  DISABLED: 'disabled',
  UNKNOWN: 'unknown',
} as const

export const CONNECTION_STATE = {
  CONNECTED: 'connected',
  DISCONNECTED: 'disconnected',
  ERROR: 'error',
  RECONNECT: 'reconnect',
} as const

export const CHANNEL_TYPES = [
  { value: 'gmail', label: 'Gmail' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'facebook_messenger', label: 'Facebook Messenger' },
] as const

export type ChannelType = typeof CHANNEL_TYPES[number]['value']

export const CHANNEL_LIFECYCLE_STATUS = {
  ACTIVE: 'active',
  ARCHIVED: 'archived',
} as const