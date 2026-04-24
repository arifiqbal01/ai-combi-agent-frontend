'use client'

import { toast as sonnerToast } from 'sonner'

type ToastOptions = {
  title: string
  description?: string
  variant?: 'default' | 'success' | 'error' | 'info'
  action?: {
    label: string
    onClick: () => void
  }
}

type ToastInput = string | ToastOptions

function baseToast(input: ToastInput) {
  if (typeof input === 'object') {
    const { title, description, variant = 'default', action } = input

    if (variant === 'success') {
      return sonnerToast.success(title, { description, action })
    }

    if (variant === 'error') {
      return sonnerToast.error(title, { description, action })
    }

    return sonnerToast(title, { description, action })
  }

  return sonnerToast(input)
}

export const toast = Object.assign(baseToast, {
  success: (message: string, description?: string) =>
    sonnerToast.success(message, { description }),

  error: (message: string, description?: string) =>
    sonnerToast.error(message, { description }),

  info: (message: string, description?: string) =>
    sonnerToast(message, { description }),

  action: (
    message: string,
    options?: {
      description?: string
      action?: {
        label: string
        onClick: () => void
      }
    }
  ) => sonnerToast(message, options),
})