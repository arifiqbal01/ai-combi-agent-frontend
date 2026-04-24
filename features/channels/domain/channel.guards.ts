// domain/channel.guards.ts

import {
  CHANNEL_STATUS,
  CONNECTION_STATE,
} from './channel.constants'

import {
  ChannelStatus,
  ConnectionState,
} from './channel.types'

/**
 * Normalize backend connection state → domain state
 */
export function normalizeConnectionState(
  state?: string
): ConnectionState {
  switch (state) {
    case 'valid':
      return CONNECTION_STATE.CONNECTED

    case 'invalid':
      return CONNECTION_STATE.ERROR

    // 🔥 unified reconnect states
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
  status?: string
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