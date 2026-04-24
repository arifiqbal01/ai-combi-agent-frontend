'use client'

import clsx from 'clsx'

type Gap = 'xs' | 'sm' | 'md'

const GAP = {
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-3',
}

export function Inline({
  children,
  gap = 'sm',
  align = 'center',
  className,
  ...props
}: {
  children: React.ReactNode
  gap?: Gap
  align?: 'start' | 'center' | 'end'
  className?: string
} & React.HTMLAttributes<HTMLDivElement>) {

  return (
    <div
      {...props} // 🔥 THIS IS THE FIX
      className={clsx(
        'flex',
        GAP[gap],
        align === 'center' && 'items-center',
        align === 'start' && 'items-start',
        align === 'end' && 'items-end',
        className
      )}
    >
      {children}
    </div>
  )
}