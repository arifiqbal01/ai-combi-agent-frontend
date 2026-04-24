'use client'

import { Channel } from '../../../domain/channel.types'
import { Surface, Stack } from '@/ui'

import { ChannelHeader } from './ChannelHeader'
import { ChannelMeta } from './ChannelMeta'
import { ChannelActions } from './ChannelActions'

export function ChannelItem({ channel }: { channel: Channel }) {
  return (
    <Surface
      variant="elevated"
      className="p-4 rounded-lg transition-all hover:shadow-md"
    >
      <Stack gap="md">

        {/* HEADER */}
        <ChannelHeader channel={channel} />

        {/* META */}
        <ChannelMeta channel={channel} />

        {/* ACTIONS */}
        <ChannelActions channel={channel} />

      </Stack>
    </Surface>
  )
}