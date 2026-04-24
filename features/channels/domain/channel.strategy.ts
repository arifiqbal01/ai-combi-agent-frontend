// domain/channel.guards.ts

export function normalizeConnectionState(
  state?: string
): ConnectionState {
  switch (state) {
    case 'valid':
      return 'connected'

    case 'invalid':
      return 'error'

    // 🔥 all reconnect-required states unified
    case 'expired':
    case 'revoked':
    case 'requires_reauth':
    case 'reconnect':
      return 'reconnect'

    case 'unknown':
    case undefined:
    case null:
      return 'disconnected'

    default:
      return 'disconnected'
  }
}