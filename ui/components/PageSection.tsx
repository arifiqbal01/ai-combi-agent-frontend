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
    <div className={clsx('flex flex-col', className)}>
      {children}
    </div>
  )
}