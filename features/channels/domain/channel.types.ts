// domain/channel.types.ts

import {
  CHANNEL_STATUS,
  CONNECTION_STATE,
  CHANNEL_TYPES,
} from './channel.constants'

export type ChannelStatus =
  (typeof CHANNEL_STATUS)[keyof typeof CHANNEL_STATUS]

export type ConnectionState =
  (typeof CONNECTION_STATE)[keyof typeof CONNECTION_STATE]

export type ChannelType =
  (typeof CHANNEL_TYPES)[number]['value']

export type Channel = {
  id: string

  label: string
  channelType: ChannelType

  status: ChannelStatus
  connectionState: ConnectionState

  createdAt: string
  lastSyncedAt?: string

  isConnected: boolean
  isActive: boolean
  requiresReconnect: boolean
}