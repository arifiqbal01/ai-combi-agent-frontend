'use client'

import clsx from 'clsx'

type Size =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'

type Tone =
  | 'default'
  | 'muted'
  | 'secondary'
  | 'brand'
  | 'danger'

type Weight =
  | 'normal'
  | 'medium'
  | 'semibold'
  | 'bold'

type Props = {
  children: React.ReactNode
  size?: Size
  tone?: Tone
  weight?: Weight
  className?: string
  as?: React.ElementType
} & React.HTMLAttributes<HTMLElement>

const SIZE_MAP: Record<Size, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
}

const TONE_MAP: Record<Tone, string> = {
  default: 'text-text-primary',
  muted: 'text-text-muted',
  secondary: 'text-text-secondary',
  brand: 'text-brand',
  danger: 'text-red-600',
}

const WEIGHT_MAP: Record<Weight, string> = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
}

export function Text({
  children,
  size = 'md',
  tone = 'default',
  weight = 'normal',
  className,
  as = 'span',
  ...props // ✅ capture all props
}: Props) {
  const Comp = as

  return (
    <Comp
      {...props} // ✅ forward props (onClick, etc.)
      className={clsx(
        SIZE_MAP[size],
        TONE_MAP[tone],
        WEIGHT_MAP[weight],
        className
      )}
    >
      {children}
    </Comp>
  )
}