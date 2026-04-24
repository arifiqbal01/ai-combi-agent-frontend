'use client'

import { ReactNode } from 'react'

type FormFieldProps = {
  label?: string
  helpText?: string
  error?: string
  children: ReactNode
}

export function FormField({
  label,
  helpText,
  error,
  children,
}: FormFieldProps) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm font-medium text-text-primary">
          {label}
        </label>
      )}

      {children}

      {error ? (
        <p className="text-xs text-red-600">
          {error}
        </p>
      ) : (
        helpText && (
          <p className="text-xs text-text-secondary">
            {helpText}
          </p>
        )
      )}
    </div>
  )
}
