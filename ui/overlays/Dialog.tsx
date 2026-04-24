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
        // 👇 lower than content
        'fixed inset-0 z-40 bg-black/40 backdrop-blur-sm',
        className
      )}
      {...props}
    />
  )
}

/* ================= CONTENT ================= */

export function DialogContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content>) {
  return (
    <DialogPrimitive.Portal>

      <DialogPrimitive.Overlay
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
      />

      <DialogPrimitive.Content
        className="fixed inset-0 z-50 flex items-center justify-center"
        {...props}
      >
        <div
          className={clsx(
            'w-full max-w-lg rounded-lg border bg-white p-4 shadow-lg',
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