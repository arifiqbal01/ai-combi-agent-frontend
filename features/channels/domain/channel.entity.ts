// domain/channel.entity.ts

import { Channel } from './channel.types'

import {
  normalizeStatus,
  normalizeConnectionState,
} from './channel.guards'

import {
  CHANNEL_STATUS,
  CONNECTION_STATE,
} from './channel.constants'

/**
 * Build full domain entity (SINGLE SOURCE OF DERIVED LOGIC)
 */
export function createChannelEntity(raw: {
  id: string
  label: string
  provider: string
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

  const isConnected =
    connectionState === CONNECTION_STATE.CONNECTED

  const isActive =
    status === CHANNEL_STATUS.ENABLED

  const requiresReconnect =
    connectionState === CONNECTION_STATE.RECONNECT

  return {
    id: raw.id,
    label: raw.label,
    provider: raw.provider,
    channelType: raw.channel_type,

    status,
    connectionState,

    createdAt: raw.created_at,
    lastSyncedAt: raw.last_synced_at,

    isConnected,
    isActive,
    requiresReconnect,
  }
}