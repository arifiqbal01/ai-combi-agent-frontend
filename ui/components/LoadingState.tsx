// ui/components/LoadingState.tsx
'use client'

import { Stack, Text } from '@/ui'

export function LoadingState({
  label = 'Loading...',
}: {
  label?: string
}) {
  return (
    <Stack
      gap="sm"
      className="items-center justify-center py-16"
    >
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-border-subtle border-t-text-primary" />

      <Text size="sm" tone="muted">
        {label}
      </Text>
    </Stack>
  )
}