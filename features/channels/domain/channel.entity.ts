// domain/channel.entity.ts

import { Channel } from './channel.types'

import {
  normalizeStatus,
  normalizeConnectionState,
  normalizeChannelType,
} from './channel.guards'

import {
  CHANNEL_STATUS,
  CONNECTION_STATE,
} from './channel.constants'

/**
 * Build full domain entity (single source of derived logic)
 */
export function createChannelEntity(raw: {
  id: string
  label: string
  channel_type: string

  status?: string
  connection_state?: string

  created_at: string
  last_synced_at?: string
}): Channel {
  const status = normalizeStatus(raw.status)

  const connectionState = normalizeConnectionState(
    raw.connection_state
  )

  const channelType = normalizeChannelType(
    raw.channel_type
  )

  const isConnected =
    connectionState === CONNECTION_STATE.CONNECTED

  const isActive =
    status === CHANNEL_STATUS.ENABLED

  const requiresReconnect =
    connectionState === CONNECTION_STATE.RECONNECT

  return {
    id: raw.id,
    label: raw.label,
    channelType,

    status,
    connectionState,

    createdAt: raw.created_at,
    lastSyncedAt: raw.last_synced_at,

    isConnected,
    isActive,
    requiresReconnect,
  }
}