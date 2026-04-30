'use client'

import * as React from 'react'
import clsx from 'clsx'

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: React.ReactNode
  onCheckedChange?: (checked: boolean) => void
}

export const Switch = React.forwardRef<
  HTMLInputElement,
  Props
>(function Switch(
  {
    label,
    className,
    disabled,
    id,
    onCheckedChange,
    ...props
  },
  ref
) {
  const generatedId = React.useId()
  const inputId = id ?? generatedId

  return (
    <div
      className={clsx(
        'flex items-center gap-3',
        disabled && 'opacity-50 cursor-not-allowed'
      )}
    >
      <label className="relative inline-flex h-5 w-9 cursor-pointer">
        <input
          ref={ref}
          id={inputId}
          type="checkbox"
          disabled={disabled}
          className={clsx('peer sr-only', className)}
          {...props}
          onChange={(e) => {
            onCheckedChange?.(e.target.checked)
          }}
        />

        <span
          className="
            absolute inset-0 rounded-full bg-bg-muted transition
            peer-checked:bg-brand
            peer-focus-visible:ring-2 peer-focus-visible:ring-brand/30
          "
        />

        <span
          className="
            absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition
            peer-checked:translate-x-4
          "
        />
      </label>

      {label && (
        <label
          htmlFor={inputId}
          className={clsx(
            'text-sm text-text-primary select-none',
            disabled ? 'cursor-not-allowed' : 'cursor-pointer'
          )}
        >
          {label}
        </label>
      )}
    </div>
  )
})