'use client'

import { useState } from 'react'
import { X, ChevronDown } from 'lucide-react'
import clsx from 'clsx'

type Option = {
  value: string
  label: string
}

type MultiSelectProps = {
  options: Option[]
  value: string[]
  onChange: (value: string[]) => void
  placeholder?: string
  disabled?: boolean
}

export function MultiSelect({
  options,
  value,
  onChange,
  placeholder = 'Select',
  disabled,
}: MultiSelectProps) {
  const [open, setOpen] = useState(false)

  const selected = options.filter(o =>
    value.includes(o.value)
  )

  function toggle(optionValue: string) {
    onChange(
      value.includes(optionValue)
        ? value.filter(v => v !== optionValue)
        : [...value, optionValue]
    )
  }

  function remove(optionValue: string) {
    onChange(value.filter(v => v !== optionValue))
  }

  return (
    <div className="relative">
      {/* Control */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen(v => !v)}
        className={clsx(
          'flex w-full items-center justify-between rounded-md border px-3 py-2 text-sm',
          'border-border-strong bg-bg-surface text-text-primary',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      >
        <div className="flex flex-wrap gap-1">
          {selected.length === 0 && (
            <span className="text-text-muted">
              {placeholder}
            </span>
          )}

          {selected.map(item => (
            <span
              key={item.value}
              className="inline-flex items-center gap-1 rounded bg-bg-muted px-2 py-0.5 text-xs"
            >
              {item.label}
              <button
                type="button"
                onClick={e => {
                  e.stopPropagation()
                  remove(item.value)
                }}
                className="text-text-muted hover:text-text-primary"
              >
                <X size={12} />
              </button>
            </span>
          ))}
        </div>

        <ChevronDown size={16} />
      </button>

      {/* Dropdown */}
      {open && (
        <ul className="absolute z-20 mt-1 w-full rounded-md border border-border-subtle bg-bg-surface shadow-md">
          {options.map(option => {
            const selected = value.includes(option.value)

            return (
              <li
                key={option.value}
                role="option"
                aria-selected={selected}
                onClick={() => toggle(option.value)}
                className={clsx(
                  'cursor-pointer px-3 py-2 text-sm',
                  selected
                    ? 'bg-bg-muted text-text-primary'
                    : 'hover:bg-bg-muted'
                )}
              >
                {option.label}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
