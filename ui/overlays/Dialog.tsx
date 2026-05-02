'use client'

import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import clsx from 'clsx'

/* ================= ROOT ================= */

export const Dialog = DialogPrimitive.Root
export const DialogTrigger = DialogPrimitive.Trigger
export const DialogPortal = DialogPrimitive.Portal
export const DialogClose = DialogPrimitive.Close

/* ================= OVERLAY ================= */

export function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      className={clsx(
        'fixed inset-0 z-40 bg-black/40 backdrop-blur-sm',
        className
      )}
      {...props}
    />
  )
}

/* ================= CONTENT ================= */

type DialogContentProps =
  React.ComponentProps<typeof DialogPrimitive.Content> & {
    variant?: 'centered' | 'fullscreen'
  }

export function DialogContent({
  className,
  children,
  variant = 'centered',
  ...props
}: DialogContentProps) {
  const isFullscreen = variant === 'fullscreen'

  return (
    <DialogPrimitive.Portal>

      {/* ✅ Overlay */}
      <DialogOverlay />

      {/* ✅ Content */}
      <DialogPrimitive.Content
        className={clsx(
          'fixed z-50',

          isFullscreen
            ? 'inset-0 flex items-center justify-center p-2'
            : 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg px-3',

          'outline-none'
        )}
        {...props}
      >
        <div
          className={clsx(
            'w-full shadow-xl',

            isFullscreen
              ? 'h-full bg-black rounded-lg overflow-hidden'
              : 'rounded-xl border bg-white p-4',

            className
          )}
        >
          {children}
        </div>
      </DialogPrimitive.Content>

    </DialogPrimitive.Portal>
  )
}

/* ================= HEADER ================= */

export function DialogHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        'flex flex-col gap-1.5',
        className
      )}
      {...props}
    />
  )
}

/* ================= TITLE ================= */

export function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      className={clsx(
        'text-sm font-semibold text-text-primary',
        className
      )}
      {...props}
    />
  )
}

/* ================= DESCRIPTION ================= */

export function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      className={clsx(
        'text-sm text-text-secondary',
        className
      )}
      {...props}
    />
  )
}