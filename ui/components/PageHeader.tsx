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
    <Inline
      className="border-b border-border-subtle px-6 py-4"
      align="center"
    >
      <Stack className="flex-1">
        <Text size="lg" weight="semibold">
          {title}
        </Text>

        {description && (
          <Text size="sm" tone="muted">
            {description}
          </Text>
        )}
      </Stack>

      {actions && (
        <Inline gap="sm">
          {actions}
        </Inline>
      )}
    </Inline>
  )
}