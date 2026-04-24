'use client'

import clsx from 'clsx'

type Variant = 'default' | 'soft' | 'elevated' | 'interactive'

const VARIANTS: Record<Variant, string> = {
  default: 'bg-bg-surface border border-border-subtle',
  soft: 'bg-bg-surface-soft',
  elevated: 'bg-bg-surface border border-border-subtle shadow-sm',
  interactive:
    'bg-bg-surface hover:bg-bg-muted transition-colors cursor-pointer'
}

export function Surface({
  children,
  variant = 'default',
  className,
  ...props
}: {
  children: React.ReactNode
  variant?: Variant
  className?: string
} & React.HTMLAttributes<HTMLDivElement>) {

  return (
    <div
      {...props}
      className={clsx(
        VARIANTS[variant],
        className
      )}
    >
      {children}
    </div>
  )
}