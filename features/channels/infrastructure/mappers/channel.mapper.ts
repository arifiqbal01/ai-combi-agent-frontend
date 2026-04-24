// features/channels/infrastructure/mappers/channel.mapper.ts

import {
  ChannelAccountDTO,
  TestConnectionDTO,
} from '../dto/channel.dto'

import { Channel } from '../../domain/channel.types'

import {
  normalizeStatus,
  normalizeConnectionState,
} from '../../domain/channel.guards'

import {
  CHANNEL_STATUS,
  CONNECTION_STATE,
} from '../../domain/channel.constants'

/* ----------------------------------------
   Map Single Channel
---------------------------------------- */
export function mapChannelDTO(dto: ChannelAccountDTO): Channel {
  const status = normalizeStatus(dto.status)
  const connectionState = normalizeConnectionState(
    dto.connection_state
  )

  const isConnected =
    connectionState === CONNECTION_STATE.CONNECTED

  const isActive =
    status === CHANNEL_STATUS.ENABLED

  const requiresReconnect =
    connectionState === CONNECTION_STATE.RECONNECT

  return {
    id: dto.id,

    label: dto.label,
    provider: dto.provider,
    channelType: dto.channel_type,

    status,
    connectionState,

    createdAt: dto.created_at,
    lastSyncedAt: dto.last_synced_at,

    isConnected,
    isActive,
    requiresReconnect,
  }
}

/* ----------------------------------------
   Map + Sort Channels (UX priority)
---------------------------------------- */
export function mapChannels(
  dtos: ChannelAccountDTO[]
): Channel[] {
  return dtos
    .map(mapChannelDTO)
    .sort((a, b) => {
      // 🔥 Priority 1: requires reconnect
      if (a.requiresReconnect !== b.requiresReconnect) {
        return a.requiresReconnect ? -1 : 1
      }

      // 🔥 Priority 2: connected
      if (a.isConnected !== b.isConnected) {
        return a.isConnected ? -1 : 1
      }

      // 🔥 Priority 3: active
      if (a.isActive !== b.isActive) {
        return a.isActive ? -1 : 1
      }

      // 🔥 Priority 4: newest first
      return (
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
      )
    })
}

/* ----------------------------------------
   Map Test Connection Response
---------------------------------------- */
export function mapTestConnection(
  dto: TestConnectionDTO,
  channel: Channel
): Channel {
  const connectionState = normalizeConnectionState(
    dto.connection_state
  )

  return {
    ...channel,
    connectionState,

    isConnected:
      connectionState === CONNECTION_STATE.CONNECTED,

    requiresReconnect:
      connectionState === CONNECTION_STATE.RECONNECT,
  }
}