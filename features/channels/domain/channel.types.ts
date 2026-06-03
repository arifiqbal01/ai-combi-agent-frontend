// domain/channel.types.ts

import {
  CHANNEL_STATUS,
  CONNECTION_STATE,
  CHANNEL_TYPES,
  CHANNEL_LIFECYCLE_STATUS,
} from './channel.constants'

export type ChannelStatus =
  (typeof CHANNEL_STATUS)[keyof typeof CHANNEL_STATUS]

export type ConnectionState =
  (typeof CONNECTION_STATE)[keyof typeof CONNECTION_STATE]

export type ChannelType =
  (typeof CHANNEL_TYPES)[number]['value']

export type ChannelLifecycleStatus =
  (typeof CHANNEL_LIFECYCLE_STATUS)[keyof typeof CHANNEL_LIFECYCLE_STATUS]

export type Channel = {
  id: string

  label: string
  channelType: ChannelType

  provider: string

  status: ChannelStatus
  lifecycleStatus: ChannelLifecycleStatus

  connectionState: ConnectionState

  archivedAt?: string

  createdAt: string
  lastSyncedAt?: string

  isConnected: boolean
  isActive: boolean
  isArchived: boolean

  requiresReconnect: boolean
}