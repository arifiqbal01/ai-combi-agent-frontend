'use client'

import { Channel } from '../../../domain/channel.types'
import { Stack } from '@/ui'

import { ChannelHeader } from './ChannelHeader'
import { ChannelMeta } from './ChannelMeta'
import { ChannelActions } from './ChannelActions'

export function ChannelItem({ channel }: { channel: Channel }) {
  return (
    <div
      className="
        px-4 py-3
        bg-surface
        border border-border-subtle
        rounded-xl

        transition
        hover:border-border-default
        hover:bg-surface-hover
      "
    >
      <Stack gap="sm">
        <ChannelHeader channel={channel} />
        <ChannelMeta channel={channel} />
        <ChannelActions channel={channel} />
      </Stack>
    </div>
  )
}