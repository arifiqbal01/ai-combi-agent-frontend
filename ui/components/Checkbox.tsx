'use client'

import * as React from 'react'
import clsx from 'clsx'

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: React.ReactNode
}

export const Checkbox = React.forwardRef<
  HTMLInputElement,
  Props
>(function Checkbox(
  { label, className, disabled, id, ...props },
  ref
) {
  const generatedId = React.useId()
  const inputId = id ?? generatedId

  return (
    <div
      className={clsx(
        'flex items-center gap-2',
        disabled && 'opacity-50'
      )}
    >
      <input
        ref={ref}
        id={inputId}
        type="checkbox"
        disabled={disabled}
        className={clsx(
          'h-4 w-4 rounded border border-border-strong bg-bg-surface',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30',
          'checked:bg-brand checked:border-brand',
          className
        )}
        {...props}
      />

      {label && (
        <label
          htmlFor={inputId}
          className="text-sm text-text-primary select-none cursor-pointer"
        >
          {label}
        </label>
      )}
    </div>
  )
})