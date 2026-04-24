'use client'

import clsx from 'clsx'

type Size = 'sm' | 'md' | 'lg'

type Props = {
  label?: string
  src?: string
  size?: Size
  className?: string
}

const SIZE_MAP: Record<Size, string> = {
  sm: 'h-7 w-7 text-xs',
  md: 'h-9 w-9 text-sm',
  lg: 'h-12 w-12 text-base',
}

export function Avatar({
  label,
  src,
  size = 'md',
  className,
}: Props) {
  const initial =
    label?.trim()?.charAt(0)?.toUpperCase() ?? '?'

  return (
    <div
      className={clsx(
        'flex items-center justify-center overflow-hidden rounded-full bg-bg-muted font-medium text-text-primary select-none',
        SIZE_MAP[size],
        className
      )}
    >
      {src ? (
        <img
          src={src}
          alt={label ?? 'Avatar'}
          className="h-full w-full object-cover"
        />
      ) : (
        <span>{initial}</span>
      )}
    </div>
  )
}