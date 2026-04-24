'use client'

import { Channel } from '../../../domain/channel.types'
import { Stack, Inline, Text, Badge } from '@/ui'
import { getChannelState } from './channelItem.helpers'

export function ChannelHeader({ channel }: { channel: Channel }) {
  const { isConnected, isError } = getChannelState(channel)

  return (
    <Inline className="justify-between items-start flex-wrap gap-2">

      {/* LEFT */}
      <Stack gap="xs" className="min-w-0">
        <Text weight="semibold" className="truncate">
          {channel.label}
        </Text>

        <Text size="sm" tone="muted">
          {channel.provider} • {channel.channelType}
        </Text>
      </Stack>

      {/* RIGHT (STATUS) */}
      <Inline gap="xs" className="flex-wrap">

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
  )
}