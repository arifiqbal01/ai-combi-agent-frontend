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
  { value: 'email', label: 'Email' },
  { value: 'messaging', label: 'Messaging' },
] as const

export const PROVIDERS = {
  email: [
    { value: 'gmail', label: 'Gmail' },
    { value: 'imap_email', label: 'IMAP Email' },
  ],
  sms: [],
  messaging: [
    { value: 'whatsapp_cloud', label: 'WhatsApp Cloud' },
    { value: 'instagram', label: 'Instagram' },
    { value: 'slack_api', label: 'Slack' },
  ],
} as const

export type ChannelType = typeof CHANNEL_TYPES[number]['value']

export type ChannelProvider =
  | 'gmail'
  | 'imap_email'
  | 'whatsapp_cloud'
  | 'instagram'
  | 'slack_api'