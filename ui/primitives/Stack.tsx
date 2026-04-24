'use client'

import clsx from 'clsx'

type Gap = 'xs' | 'sm' | 'md' | 'lg'

const GAP: Record<Gap, string> = {
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-3',
  lg: 'gap-4',
}

export function Stack({
  children,
  gap = 'sm',
  className,
}: {
  children: React.ReactNode
  gap?: Gap
  className?: string
}) {
  return (
    <div className={clsx('flex flex-col', GAP[gap], className)}>
      {children}
    </div>
  )
}