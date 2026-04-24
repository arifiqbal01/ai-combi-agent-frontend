'use client'

import { ReactNode } from 'react'
import { Inline } from '@/ui'

export function PageActions({
  children,
}: {
  children: ReactNode
}) {
  return (
    <Inline gap="sm">
      {children}
    </Inline>
  )
}