'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import clsx from 'clsx'
import { Loader2 } from 'lucide-react'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  size?: Size
  asChild?: boolean
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const VARIANTS: Record<Variant, string> = {
  primary:
    'bg-brand text-white hover:opacity-90 focus-visible:ring-brand/30',
  secondary:
    'bg-bg-muted text-text-primary hover:bg-bg-muted/80 focus-visible:ring-brand/30',
  ghost:
    'bg-transparent text-text-secondary hover:bg-bg-muted focus-visible:ring-brand/30',
}

const SIZES: Record<Size, string> = {
  sm: 'h-8 px-3 text-sm gap-1.5',
  md: 'h-9 px-4 text-sm gap-2',
  lg: 'h-10 px-5 text-base gap-2',
}

export function Button({
  variant = 'primary',
  size = 'md',
  asChild,
  loading,
  disabled,
  className,
  children,
  leftIcon,
  rightIcon,
  ...props
}: Props) {
  const Comp = asChild ? Slot : 'button'

  const isDisabled = disabled || loading

  return (
    <Comp
      className={clsx(
        'inline-flex items-center justify-center rounded-md font-medium transition',
        'focus-visible:outline-none focus-visible:ring-2',
        VARIANTS[variant],
        SIZES[size],
        isDisabled && 'opacity-50 pointer-events-none',
        className
      )}
      disabled={!asChild ? isDisabled : undefined}
      aria-disabled={isDisabled}
      aria-busy={loading || undefined}
      {...props}
    >
      {/* LEFT ICON / LOADER */}
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        leftIcon
      )}

      {/* CONTENT */}
      <span className="inline-flex items-center">
        {children}
      </span>

      {/* RIGHT ICON */}
      {!loading && rightIcon}
    </Comp>
  )
}