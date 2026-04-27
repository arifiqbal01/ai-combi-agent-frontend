'use client'

import type { ReactNode } from 'react'
import clsx from 'clsx'

export default function Content({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <main
      className={clsx(
        'flex flex-col',
        'flex-1 min-h-0 min-w-0',

        // ✅ FIX: lock page, no scrolling here
        'overflow-hidden',

        'bg-[rgb(var(--bg-surface-neutral))]',
        className
      )}
    >
      {children}
    </main>
  )
}