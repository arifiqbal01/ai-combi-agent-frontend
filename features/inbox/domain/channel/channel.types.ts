/* domain/channel/channel.types.ts */

export const ChannelType = {
  EMAIL: 'email',

  SMS: 'sms',

  WHATSAPP: 'whatsapp',

  INSTAGRAM: 'instagram',

  FACEBOOK_MESSENGER: 'facebook_messenger',

  TELEGRAM: 'telegram',

  SLACK: 'slack',

  // frontend/internal use
  SYSTEM: 'system',
} as const

export type ChannelType =
  typeof ChannelType[
    keyof typeof ChannelType
  ]