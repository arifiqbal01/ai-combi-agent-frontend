// channelItem.helpers.ts

import { Channel } from '../../../domain/channel.types'
import { CONNECTION_STATE } from '../../../domain/channel.constants'

export function getChannelState(channel: Channel) {
  const isConnected =
    channel.connectionState === CONNECTION_STATE.CONNECTED

  const isDisconnected =
    channel.connectionState === CONNECTION_STATE.DISCONNECTED

  const isError =
    channel.connectionState === CONNECTION_STATE.ERROR ||
    channel.connectionState === CONNECTION_STATE.RECONNECT

  return {
    isConnected,
    isDisconnected,
    isError,
  }
}