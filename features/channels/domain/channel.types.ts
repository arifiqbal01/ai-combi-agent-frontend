// domain/channel.types.ts

import {
  CHANNEL_STATUS,
  CONNECTION_STATE,
  CHANNEL_TYPES,
  PROVIDERS,
} from './channel.constants'

export type ChannelStatus =
  (typeof CHANNEL_STATUS)[keyof typeof CHANNEL_STATUS]

export type ConnectionState =
  (typeof CONNECTION_STATE)[keyof typeof CONNECTION_STATE]

export type Channel = {
  id: string

  label: string
  provider: string
  channelType: string

  status: ChannelStatus
  connectionState: ConnectionState

  createdAt: string
  lastSyncedAt?: string

  isConnected: boolean
  isActive: boolean

  requiresReconnect: boolean
}

export type ChannelType =
  (typeof CHANNEL_TYPES)[number]['value']

export type Provider =
  (typeof PROVIDERS)[ChannelType][number]['value']