'use client'

import { ReactNode } from 'react'
import clsx from 'clsx'

type Props = {
  children: ReactNode
  className?: string
}

export function PageSection({
  children,
  className,
}: Props) {
  return (
    <div className="flex-1 min-h-0 overflow-y-auto">
      <div
        className={clsx(
          // 🔥 Removed horizontal padding on mobile
          'py-2 md:px-6 md:py-4',
          className
        )}
      >
        {children}
      </div>
    </div>
  )
}