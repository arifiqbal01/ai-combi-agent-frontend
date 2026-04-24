'use client'

import * as React from 'react'
import clsx from 'clsx'

/* ================= INPUT ================= */

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  hasError?: boolean
}

export const Input = React.forwardRef<
  HTMLInputElement,
  InputProps
>(function Input(
  { className, hasError, disabled, ...props },
  ref
) {
  return (
    <input
      ref={ref}
      disabled={disabled}
      className={clsx(
        'w-full rounded-md border bg-bg-surface px-3 py-2 text-sm',
        'text-text-primary placeholder:text-text-muted',
        'focus-visible:outline-none focus-visible:ring-2',
        hasError
          ? 'border-red-500 focus-visible:ring-red-500/30'
          : 'border-border-strong focus-visible:ring-brand/30',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      {...props}
    />
  )
})

/* ================= TEXTAREA ================= */

type TextareaProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    hasError?: boolean
  }

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  TextareaProps
>(function Textarea(
  { className, hasError, disabled, ...props },
  ref
) {
  return (
    <textarea
      ref={ref}
      disabled={disabled}
      className={clsx(
        'w-full resize-y rounded-md border bg-bg-surface px-3 py-2 text-sm',
        'text-text-primary placeholder:text-text-muted',
        'focus-visible:outline-none focus-visible:ring-2',
        hasError
          ? 'border-red-500 focus-visible:ring-red-500/30'
          : 'border-border-strong focus-visible:ring-brand/30',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      {...props}
    />
  )
})