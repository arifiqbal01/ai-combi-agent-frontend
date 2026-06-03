'use client'

import { Inline, Text } from '@/ui'
import { ChannelAvatar } from '@/ui/components/channel/ChannelAvatar'
import { cn } from '@/lib/utils'

type Props = {
  item: any
  active?: boolean
  onClick?: () => void
}

export function ConversationListItem({
  item,
  active,
  onClick,
}: Props) {
  const isUnread = item.unreadCount > 0

  const sender = item.name || 'Unknown'

  const message =
    item.preview || item.subject || ''

  return (
    <div
      onClick={onClick}
      className={cn(
        'px-3 py-3 border-b border-border-subtle cursor-pointer transition-colors',
        'hover:bg-bg-muted active:scale-[0.99]',
        active &&
          'bg-bg-surface-soft border-l-2 border-[rgb(var(--brand))]'
      )}
    >
      <Inline align="center" className="gap-3">
        <ChannelAvatar
          channel={item.channel}
          channelAccount={item.channelAccount}
          size="sm"
        />

        <div className="flex-1 min-w-0">
          {/* TOP ROW */}
          <div className="flex justify-between items-center gap-2">
            <Text
              size="sm"
              weight={isUnread ? 'semibold' : 'medium'}
              className="truncate"
            >
              {sender}
            </Text>

            <Text
              size="xs"
              tone="muted"
              className="shrink-0"
            >
              {item.lastMessageAt}
            </Text>
          </div>

          {/* MESSAGE PREVIEW */}
          <div className="flex justify-between items-center gap-2 mt-0.5">
            <Text
              size="xs"
              tone="muted"
              className={cn(
                'truncate',
                isUnread && 'text-text-primary'
              )}
            >
              {message}
            </Text>

            {isUnread && (
              <span
                className="
                  min-w-[18px]
                  h-[18px]
                  px-1
                  flex
                  items-center
                  justify-center
                  rounded-full
                  text-[10px]
                  font-semibold
                  bg-[rgb(var(--brand))]
                  text-white
                  shrink-0
                "
              >
                {item.unreadCount}
              </span>
            )}
          </div>
        </div>
      </Inline>
    </div>
  )
}