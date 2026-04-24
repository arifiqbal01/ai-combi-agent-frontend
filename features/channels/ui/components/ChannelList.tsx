'use client'

import { Channel } from '../../domain/channel.types'
import { Stack, Text, Surface } from '@/ui'
import { ChannelItem } from './channel-item/ChannelItem'

export function ChannelList({
  channels,
}: {
  channels: Channel[]
}) {
  if (!channels.length) {
    return (
      <Text tone="muted">
        No channels yet.
      </Text>
    )
  }

  return (
    <Surface variant="soft" className="p-3 rounded-lg">
      <Stack gap="md">
        {channels.map((channel) => (
          <ChannelItem
            key={channel.id}
            channel={channel}
          />
        ))}
      </Stack>
    </Surface>
  )
}