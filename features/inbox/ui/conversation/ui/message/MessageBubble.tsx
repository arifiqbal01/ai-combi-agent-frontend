'use client'

import clsx from 'clsx'
import { MessageVariant } from './MessageVariant'

type Props = {
  variant: MessageVariant
  children: React.ReactNode
  grouped?: boolean
  direction?: 'in' | 'out'
}

export function MessageBubble({
  variant,
  children,
  grouped,
  direction
}: Props) {
  return (
    <div
      className={clsx(
        'relative',

        /* spacing */
        'px-4 py-3',

        /* typography */
        'text-[14px]',
        'leading-[22px]',
        'text-[rgb(var(--text-primary))]',

        /* containment */
        'w-fit max-w-full min-w-[140px] min-w-0',

        /* overflow */
        'overflow-hidden break-words [overflow-wrap:anywhere]',

        /* shape */
        'rounded-lg border',

        /* transitions */
        'transition-colors',

        /* =========================
           VARIANTS (LIGHT SYSTEM)
        ========================= */

        variant === 'agent' &&
          'bg-[rgb(var(--brand)/0.08)] border-[rgb(var(--brand)/0.15)]',

        variant === 'customer' &&
          'bg-[rgb(var(--bg-surface))] border-[rgb(var(--border-subtle))]',

        variant === 'ai' &&
          'bg-purple-50 border-purple-200 ring-1 ring-purple-200',

        variant === 'system' &&
          'text-xs text-[rgb(var(--text-secondary))] bg-transparent border-none text-center',

        /* =========================
           GROUPING (variant-based)
        ========================= */

        grouped && variant === 'agent' && 'rounded-tr-sm',
        grouped && variant === 'customer' && 'rounded-tl-sm'
      )}
    >
      {children}
    </div>
  )
}