'use client'

import type { ReactNode } from 'react'
import clsx from 'clsx'

type Props = {
  children: ReactNode
  className?: string
  padded?: boolean
}

export default function ContentBody({
  children,
  className,
  padded = true,
}: Props) {
  return (
    <div
      className={clsx(
        'h-full min-h-0 w-full',
        padded && 'px-6 py-5',
        'mx-auto max-w-[1400px]', // optional but clean
        className
      )}
    >
      {children}
    </div>
  )
}