'use client'

import clsx from 'clsx'
import { MessageVariant } from '@/features/inbox/domain/message'

type Props = {
  variant: MessageVariant
  children: React.ReactNode
  grouped?: boolean
}

export function MessageBubble({
  variant,
  children,
  grouped
}: Props) {

  return (
    <div
      className={clsx(
        'relative',
        'px-4 py-3',
        'text-[14px]',
        'leading-[22px]',
        'text-[rgb(var(--text-primary))]',
        'w-fit max-w-full min-w-[140px]',
        'overflow-hidden break-words [overflow-wrap:anywhere]',
        'rounded-lg border',
        'transition-colors',

        /* VARIANTS */

        variant === MessageVariant.AGENT &&
          'bg-[rgb(var(--brand)/0.08)] border-[rgb(var(--brand)/0.15)]',

        variant === MessageVariant.CUSTOMER &&
          'bg-[rgb(var(--bg-surface))] border-[rgb(var(--border-subtle))]',

        variant === MessageVariant.AI &&
          'bg-purple-50 border-purple-200 ring-1 ring-purple-200',

        variant === MessageVariant.SYSTEM &&
          'text-xs text-[rgb(var(--text-secondary))] bg-transparent border-none text-center',

        /* GROUPING */

        grouped && variant === MessageVariant.AGENT && 'rounded-tr-sm',
        grouped && variant === MessageVariant.CUSTOMER && 'rounded-tl-sm'
      )}
    >
      {children}
    </div>
  )
}