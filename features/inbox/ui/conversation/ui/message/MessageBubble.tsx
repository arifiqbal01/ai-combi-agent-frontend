'use client'

import clsx from 'clsx'
import { MessageVariant } from '@/features/inbox/domain/message'

type Props = {
  variant: MessageVariant
  children: React.ReactNode
}

export function MessageBubble({
  variant,
  children
}: Props) {

  const isAgent = variant === MessageVariant.AGENT
  const isCustomer = variant === MessageVariant.CUSTOMER
  const isAI = variant === MessageVariant.AI
  const isSystem = variant === MessageVariant.SYSTEM

  return (
    <div
      className={clsx(

        'relative',

        'px-3 py-2 sm:px-4 sm:py-2.5',

        'text-[14px] leading-[20px]',
        'text-[rgb(var(--text-primary))]',

        'w-full',

        'break-words [overflow-wrap:anywhere]',

        // ✅ FIX: consistent radius
        'rounded-2xl',

        'border',

        'transition-colors',

        /* variants */

        isAgent &&
          'bg-[rgb(var(--brand)/0.15)] border-transparent',

        isCustomer &&
          'bg-[rgb(var(--bg-surface))] border-[rgb(var(--border-subtle))]',

        isAI &&
          'bg-purple-50 border-purple-200',

        isSystem &&
          'text-xs text-[rgb(var(--text-secondary))] bg-transparent border-none text-center px-0 py-1'
      )}
    >
      {children}
    </div>
  )
}