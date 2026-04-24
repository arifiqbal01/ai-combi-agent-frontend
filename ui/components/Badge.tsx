'use client'

import clsx from 'clsx'

type Variant =
  | 'default'
  | 'success'
  | 'warning'
  | 'danger'

type Props = {
  children: React.ReactNode
  variant?: Variant
  className?: string
}

const VARIANTS: Record<Variant, string> = {
  default: 'bg-bg-muted text-text-secondary',
  success: 'bg-green-100 text-green-700',
  warning: 'bg-yellow-100 text-yellow-700',
  danger: 'bg-red-100 text-red-700',
}

export function Badge({
  children,
  variant = 'default',
  className,
}: Props) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded px-2 py-0.5 text-xs font-medium',
        VARIANTS[variant],
        className
      )}
    >
      {children}
    </span>
  )
}