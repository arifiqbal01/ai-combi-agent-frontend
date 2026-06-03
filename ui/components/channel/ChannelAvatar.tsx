import clsx from 'clsx'
import { ChannelIcon } from './ChannelIcon'
import type { ChannelType } from '@/features/inbox/domain/channel/channel.types'

type Size = 'sm' | 'md' | 'lg'

const SIZE_MAP = {
  sm: 'h-7 w-7',
  md: 'h-9 w-9',
  lg: 'h-12 w-12',
}

type Props = {
  channel: ChannelType
  channelAccount?: string
  size?: Size
}

export function ChannelAvatar({
  channel,
  channelAccount,
  size = 'md',
}: Props) {
  return (
    <div
      className={clsx(
        'flex items-center justify-center shrink-0',
        SIZE_MAP[size]
      )}
    >
      <ChannelIcon
        channelType={channel}
        channelAccount={channelAccount}
        size={size === 'sm' ? 22 : size === 'md' ? 26 : 32}
      />
    </div>
  )
}