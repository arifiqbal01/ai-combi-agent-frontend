'use client'

import { Inline, Text, Avatar } from '@/ui'
import { cn } from '@/lib/utils'

const COLORS = [
  'bg-red-100 text-red-700',
  'bg-blue-100 text-blue-700',
  'bg-green-100 text-green-700',
  'bg-purple-100 text-purple-700',
  'bg-orange-100 text-orange-700',
]

function getAvatarColor(seed: string) {
  let hash = 0

  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash)
  }

  return COLORS[Math.abs(hash) % COLORS.length]
}

type Props = {
  item: any
  active?: boolean
  onClick?: () => void
}

export function ConversationListItem({
  item,
  active,
  onClick
}: Props) {

  const isUnread = item.unreadCount > 0

  // ✅ Use raw backend value (no normalization)
  const sender = item.name || 'Unknown'

  const message =
    item.preview || item.subject || ''

  return (

    <div
      onClick={onClick}
      className={cn(
        'px-3 py-2 border-b border-border-subtle cursor-pointer transition-colors',
        'hover:bg-bg-muted',
        active && 'bg-bg-surface-soft'
      )}
    >

      <Inline align="center" className="gap-3">

        {/* AVATAR */}
        <Avatar
          label={sender}
          size="sm"
          className={getAvatarColor(sender)}
        />

        {/* CONTENT */}
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

            <Text size="xs" tone="muted" className="shrink-0">
              {item.lastMessageAt}
            </Text>

          </div>

          {/* MESSAGE PREVIEW */}
          <div className="flex justify-between items-center gap-2">

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
              <span className="
                text-[11px]
                font-semibold
                text-[rgb(var(--brand))]
                shrink-0
              ">
                {item.unreadCount}
              </span>
            )}

          </div>

        </div>

      </Inline>

    </div>
  )
}