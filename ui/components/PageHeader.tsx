'use client'

import { ReactNode } from 'react'
import { Stack, Inline, Text } from '@/ui'

type Props = {
  title: string
  description?: string
  actions?: ReactNode
}

export function PageHeader({
  title,
  description,
  actions,
}: Props) {
  return (
    <div
      className="
        shrink-0
        border-b border-border-subtle
        px-3 md:px-6
        py-2 md:py-4
      "
    >
      {/* 🔥 TOP ROW: TITLE + ACTION (ALWAYS INLINE) */}
      <Inline className="items-center justify-between gap-2">

        <Text size="lg" weight="semibold" className="truncate">
          {title}
        </Text>

        {actions && (
          <div className="shrink-0">
            {actions}
          </div>
        )}
      </Inline>

      {/* 🔥 DESCRIPTION BELOW */}
      {description && (
        <Text size="xs" tone="muted" className="mt-1 truncate">
          {description}
        </Text>
      )}
    </div>
  )
}