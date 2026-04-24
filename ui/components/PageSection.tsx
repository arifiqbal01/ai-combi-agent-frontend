'use client'

import { ReactNode } from 'react'
import { Stack, Text, Surface } from '@/ui'

type Props = {
  title?: string
  description?: string
  children: ReactNode
}

export function PageSection({
  title,
  description,
  children,
}: Props) {
  return (
    <Surface variant="default" className="p-4 rounded-md">
      <Stack gap="md">

        {(title || description) && (
          <Stack gap="xs">
            {title && (
              <Text weight="semibold">{title}</Text>
            )}
            {description && (
              <Text size="sm" tone="muted">
                {description}
              </Text>
            )}
          </Stack>
        )}

        {children}

      </Stack>
    </Surface>
  )
}