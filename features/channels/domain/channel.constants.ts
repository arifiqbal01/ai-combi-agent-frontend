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
] as const

export const PROVIDERS = {
  email: [
    { value: 'gmail', label: 'Gmail' },
    { value: 'smtp_imap', label: 'SMTP / IMAP' },
  ],
} as const