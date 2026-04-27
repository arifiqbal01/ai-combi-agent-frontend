'use client'

import clsx from 'clsx'

type Props = {
  align: 'left' | 'right' | 'center'
  grouped?: boolean
  children: React.ReactNode
}

export function MessageContainer({
  align,
  grouped,
  children
}: Props) {
  return (
    <div
      className={clsx(
        'w-full flex',

        // 🔥 FIX: stable horizontal alignment
        align === 'right' && 'justify-end',
        align === 'left' && 'justify-start',
        align === 'center' && 'justify-center',

        // 🔥 FIX: remove side padding inconsistency
        'px-2 md:px-4',

        grouped ? 'mt-1' : 'mt-3'
      )}
    >
      {/* 🔥 FIX: CONTROL WIDTH HERE (NOT IN BUBBLE) */}
      <div
        className={clsx(
          'w-full',
          'max-w-[85%] sm:max-w-[70%] md:max-w-[60%]', // consistent column width
          align === 'right' && 'ml-auto',
          align === 'left' && 'mr-auto'
        )}
      >
        {children}
      </div>
    </div>
  )
}