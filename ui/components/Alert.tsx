'use client'

import clsx from 'clsx'
import { Surface, Inline, Text } from '@/ui'

type Variant =
  | 'default'
  | 'success'
  | 'warning'
  | 'danger'

const VARIANTS: Record<Variant, string> = {
  default:
    'bg-bg-surface border border-border-subtle',

  success:
    'bg-green-50 border border-green-200',

  warning:
    'bg-yellow-50 border border-yellow-200',

  danger:
    'bg-red-50 border border-red-200',
}

export function Alert({
  children,
  variant = 'default',
  className,
}: {
  children: React.ReactNode
  variant?: Variant
  className?: string
}) {
  return (
    <Surface
      className={clsx(
        'px-4 py-3 rounded-lg',
        VARIANTS[variant],
        className
      )}
    >
      {children}
    </Surface>
  )
}

'use client'

export function AlertTitle({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Text weight="semibold">
      {children}
    </Text>
  )
}

export function AlertDescription({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Text size="sm" tone="muted">
      {children}
    </Text>
  )
}