'use client'

import clsx from 'clsx'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  scroll?: boolean
}

export function AppPanel({
  children,
  className,
  scroll = false,
}: Props) {
  return (
    <div
      className={clsx(
        'flex flex-col flex-1 min-h-0 min-w-0',
        'overflow-hidden',
        className
      )}
    >
      {/* 🔥 THIS IS THE REAL SCROLL CONTAINER */}
      <div
        className={clsx(
          'flex-1 min-h-0',
          scroll && 'overflow-y-auto overscroll-contain'
        )}
      >
        {children}
      </div>
    </div>
  )
}