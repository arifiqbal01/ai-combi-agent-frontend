'use client'

import { Channel } from '../../../domain/channel.types'
import { Stack, Inline, Text, Badge } from '@/ui'
import { getChannelState } from './channelItem.helpers'

export function ChannelHeader({ channel }: { channel: Channel }) {
  const { isConnected, isError } = getChannelState(channel)

  return (
    <Stack gap="xs">

      {/* TITLE + STATUS */}
      <Inline className="justify-between items-center gap-2">

        <Text weight="semibold" className="truncate">
          {channel.label}
        </Text>

        <Inline
          gap="xs"
          className="shrink-0 max-w-[55%] justify-end"
        >
          <Badge variant={channel.isActive ? 'success' : 'warning'}>
            {channel.isActive ? 'Enabled' : 'Disabled'}
          </Badge>

          <Badge
            variant={
              isConnected
                ? 'success'
                : isError
                ? 'danger'
                : 'default'
            }
          >
            {isConnected
              ? 'Connected'
              : isError
              ? 'Error'
              : 'Disconnected'}
          </Badge>
        </Inline>

      </Inline>

      {/* META */}
      <Text size="sm" tone="muted" className="truncate">
        {channel.provider} • {channel.channelType}
      </Text>

    </Stack>
  )
}