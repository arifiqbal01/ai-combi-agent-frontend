// features/channels/application/useSmartChannels.ts

import { useChannels } from './queries/useChannels'
import { useCreateChannel } from './mutations/useCreateChannel'
import { useEnableChannel } from './mutations/useEnableChannel'
import { useDisableChannel } from './mutations/useDisableChannel'
import { useConnectChannel } from './mutations/useConnectChannel'

export function useSmartChannels() {
  const channels = useChannels()

  const create = useCreateChannel()
  const enable = useEnableChannel()
  const disable = useDisableChannel()
  const connect = useConnectChannel()

  return {
    channels: channels.data ?? [],
    isLoading: channels.isLoading,

    createChannel: create.mutate,
    enableChannel: enable.mutate,
    disableChannel: disable.mutate,

    // 🔥 unified action
    connectChannel: connect.mutate,
  }
}