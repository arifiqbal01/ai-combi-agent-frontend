'use client'

import * as React from 'react'
import clsx from 'clsx'

type Size = 'xs' | 'sm' | 'md' | 'lg'
type Tone = 'default' | 'muted' | 'brand'

const SIZE_MAP: Record<Size, number> = {
  xs: 14,
  sm: 18,
  md: 22,
  lg: 26,
}

const TONE_MAP: Record<Tone, string> = {
  default: 'text-text-primary',
  muted: 'text-text-muted',
  brand: 'text-brand',
}

export function Icon({
  size = 'md',
  tone = 'default',
  className,
  children,
}: {
  size?: Size
  tone?: Tone
  className?: string
  children: React.ReactElement
}) {
  const px = SIZE_MAP[size]

  return (
    <span
      className={clsx(
        'inline-flex items-center justify-center',
        TONE_MAP[tone],
        className
      )}
      style={{ width: px, height: px }}
      aria-hidden
    >
      {React.cloneElement(children, {
        size: px,
        strokeWidth: 1.75,
      })}
    </span>
  )
}