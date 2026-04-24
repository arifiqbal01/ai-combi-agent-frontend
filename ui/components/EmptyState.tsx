'use client'

import { ReactNode } from 'react'
import { Stack, Text, Button } from '@/ui'

type Props = {
  title: string
  description?: string
  actionLabel?: string
  onAction?: () => void
  icon?: ReactNode
}

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  icon,
}: Props) {
  return (
    <Stack
      gap="md"
      className="items-center justify-center py-16 text-center"
    >
      {icon}

      <Stack gap="xs" className="items-center">
        <Text weight="semibold">{title}</Text>

        {description && (
          <Text size="sm" tone="muted">
            {description}
          </Text>
        )}
      </Stack>

      {actionLabel && onAction && (
        <Button onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </Stack>
  )
}