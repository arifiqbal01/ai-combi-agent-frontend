'use client'

import * as React from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import { Check, ChevronDown, ChevronUp } from 'lucide-react'

import { cn } from '@/lib/utils'

export const Select = SelectPrimitive.Root
export const SelectValue = SelectPrimitive.Value

/* =========================
   TRIGGER
========================= */

export const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      'flex h-10 w-full items-center justify-between rounded-md border border-border-strong bg-bg-surface px-3 text-sm',
      'focus:outline-none focus:ring-2 focus:ring-brand/30',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      '[&>span]:truncate', // prevent overflow issues
      className
    )}
    {...props}
  >
    {children}

    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = 'SelectTrigger'

/* =========================
   CONTENT
========================= */

export const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      position="popper"
      sideOffset={4}
      className={cn(
        'z-50 overflow-hidden rounded-md border border-border-subtle bg-bg-surface shadow-md',
        'min-w-[var(--radix-select-trigger-width)]',
        className
      )}
      {...props}
    >
      <SelectPrimitive.ScrollUpButton className="flex items-center justify-center py-1">
        <ChevronUp className="h-4 w-4" />
      </SelectPrimitive.ScrollUpButton>

      <SelectPrimitive.Viewport className="p-1">
        {children}
      </SelectPrimitive.Viewport>

      <SelectPrimitive.ScrollDownButton className="flex items-center justify-center py-1">
        <ChevronDown className="h-4 w-4" />
      </SelectPrimitive.ScrollDownButton>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = 'SelectContent'

/* =========================
   ITEM
========================= */

export const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm',
      'pl-8', // ✅ unified padding
      'focus:bg-bg-muted focus:text-text-primary',
      'hover:bg-bg-muted',
      className
    )}
    {...props}
  >
    <SelectPrimitive.ItemIndicator className="absolute left-2 inline-flex items-center">
      <Check className="h-4 w-4" />
    </SelectPrimitive.ItemIndicator>

    <SelectPrimitive.ItemText>
      {children}
    </SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = 'SelectItem'