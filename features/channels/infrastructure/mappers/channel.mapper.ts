// features/channels/infrastructure/mappers/channel.mapper.ts

import {
  ChannelAccountDTO,
  TestConnectionDTO,
} from '../dto/channel.dto'

import { Channel } from '../../domain/channel.types'

import { createChannelEntity } from '../../domain/channel.entity'

import { normalizeConnectionState } from '../../domain/channel.guards'

import { CONNECTION_STATE } from '../../domain/channel.constants'

/* ----------------------------------------
   Map Single Channel
---------------------------------------- */
export function mapChannelDTO(
  dto: ChannelAccountDTO
): Channel {
  return createChannelEntity(dto)
}

/* ----------------------------------------
   Map + Sort Channels
---------------------------------------- */
export function mapChannels(
  dtos: ChannelAccountDTO[]
): Channel[] {
  return dtos
    .map(mapChannelDTO)
    .sort((a, b) => {
      if (a.requiresReconnect !== b.requiresReconnect) {
        return a.requiresReconnect ? -1 : 1
      }

      if (a.isConnected !== b.isConnected) {
        return a.isConnected ? -1 : 1
      }

      if (a.isActive !== b.isActive) {
        return a.isActive ? -1 : 1
      }

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