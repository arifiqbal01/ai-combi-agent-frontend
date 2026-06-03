// domain/channel.guards.ts

import {
  CHANNEL_STATUS,
  CONNECTION_STATE,
  CHANNEL_TYPES,
  CHANNEL_LIFECYCLE_STATUS,
} from './channel.constants'

import {
  ChannelStatus,
  ConnectionState,
  ChannelType,
  ChannelLifecycleStatus,
} from './channel.types'

/**
 * Normalize backend connection state → domain state
 */
export function normalizeConnectionState(
  state?: string | null
): ConnectionState {
  switch (state) {
    case 'valid':
      return CONNECTION_STATE.CONNECTED

    case 'invalid':
      return CONNECTION_STATE.ERROR

    case 'expired':
    case 'revoked':
    case 'requires_reauth':
    case 'reconnect':
      return CONNECTION_STATE.RECONNECT

    case 'unknown':
    case undefined:
    case null:
      return CONNECTION_STATE.DISCONNECTED

    default:
      return CONNECTION_STATE.DISCONNECTED
  }
}

/**
 * Normalize backend status → domain status
 */
export function normalizeStatus(
  status?: string | null
): ChannelStatus {
  switch (status) {
    case 'enabled':
      return CHANNEL_STATUS.ENABLED

    case 'disabled':
      return CHANNEL_STATUS.DISABLED

    default:
      return CHANNEL_STATUS.UNKNOWN
  }
}

/**
 * Normalize backend channel type → domain type
 */
export function normalizeChannelType(
  channelType?: string | null
): ChannelType {
  const validTypes = CHANNEL_TYPES.map(
    channel => channel.value
  )

  if (
    channelType &&
    validTypes.includes(channelType as ChannelType)
  ) {
    return channelType as ChannelType
  }

  // Default fallback
  return 'gmail'
}

/**
 * Normalize backend lifecycle status → domain lifecycle status
 */
export function normalizeLifecycleStatus(
  status?: string | null
): ChannelLifecycleStatus {
  switch (status) {
    case CHANNEL_LIFECYCLE_STATUS.ARCHIVED:
      return CHANNEL_LIFECYCLE_STATUS.ARCHIVED

    default:
      return CHANNEL_LIFECYCLE_STATUS.ACTIVE
  }
}