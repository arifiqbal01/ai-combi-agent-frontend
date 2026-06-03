import { Channel } from './channel.types'

import {
  normalizeStatus,
  normalizeConnectionState,
  normalizeChannelType,
  normalizeLifecycleStatus,
} from './channel.guards'

import {
  CHANNEL_STATUS,
  CONNECTION_STATE,
  CHANNEL_LIFECYCLE_STATUS,
} from './channel.constants'

/**
 * Build full domain entity
 * (single source of derived logic)
 */
export function createChannelEntity(raw: {
  id: string

  label: string
  provider?: string

  channel_type: string

  status?: string
  lifecycle_status?: string
  connection_state?: string

  archived_at?: string

  created_at: string
  last_synced_at?: string
}): Channel {

  const status = normalizeStatus(
    raw.status
  )

  const lifecycleStatus =
    normalizeLifecycleStatus(
      raw.lifecycle_status
    )

  const connectionState =
    normalizeConnectionState(
      raw.connection_state
    )

  const channelType =
    normalizeChannelType(
      raw.channel_type
    )

  const isConnected =
    connectionState ===
    CONNECTION_STATE.CONNECTED

  const isArchived =
    lifecycleStatus ===
    CHANNEL_LIFECYCLE_STATUS.ARCHIVED

  const isActive =
    status === CHANNEL_STATUS.ENABLED &&
    !isArchived

  const requiresReconnect =
    connectionState ===
    CONNECTION_STATE.RECONNECT

  return {
    id: raw.id,

    label: raw.label,

    provider: raw.provider ?? 'unknown',

    channelType,

    status,
    lifecycleStatus,
    connectionState,

    archivedAt: raw.archived_at,

    createdAt: raw.created_at,
    lastSyncedAt: raw.last_synced_at,

    isConnected,
    isActive,
    isArchived,

    requiresReconnect,
  }
}