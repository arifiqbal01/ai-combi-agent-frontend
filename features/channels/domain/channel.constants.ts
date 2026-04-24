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