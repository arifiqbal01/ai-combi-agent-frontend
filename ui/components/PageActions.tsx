'use client'

import { ReactNode } from 'react'
import { Inline } from '@/ui'

export function PageActions({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <Inline gap="sm" className={className}>
      {children}
    </Inline>
  )
}