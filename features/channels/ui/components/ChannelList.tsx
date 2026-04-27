'use client'

import { Channel } from '../../domain/channel.types'
import { Stack } from '@/ui'
import { ChannelItem } from './channel-item/ChannelItem'

export function ChannelList({
  channels,
}: {
  channels: Channel[]
}) {
  return (
    <Stack
      gap="sm"
      className="px-1 md:px-0 md:gap-4"
    >
      {channels.map((channel) => (
        <ChannelItem
          key={channel.id}
          channel={channel}
        />
      ))}
    </Stack>
  )
}