'use client'

import * as React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

type Item = {
  value: string
  title: React.ReactNode
  content: React.ReactNode
}

type Props = {
  items: Item[]
  type?: 'single' | 'multiple'
  defaultValue?: string | string[]
}

/* ------------------ Radix Wrappers ------------------ */

const Accordion = AccordionPrimitive.Root

const AccordionItem = AccordionPrimitive.Item

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header>
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        'flex w-full items-center justify-between py-2 text-left',
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = 'AccordionTrigger'

const AccordionContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn('overflow-hidden text-sm', className)}
    {...props}
  >
    <div className="pt-2 pb-4">{children}</div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = 'AccordionContent'

/* ------------------ Section ------------------ */

export function AccordionSection({
  items,
  type = 'single',
  defaultValue,
}: Props) {

  if (type === 'single') {
    return (
      <AccordionPrimitive.Root
        type="single"
        collapsible
        defaultValue={defaultValue as string}
        className="w-full"
      >
        {items.map((item) => (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionTrigger>{item.title}</AccordionTrigger>
            <AccordionContent>{item.content}</AccordionContent>
          </AccordionItem>
        ))}
      </AccordionPrimitive.Root>
    )
  }

  return (
    <AccordionPrimitive.Root
      type="multiple"
      defaultValue={defaultValue as string[]}
      className="w-full"
    >
      {items.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger>{item.title}</AccordionTrigger>
          <AccordionContent>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </AccordionPrimitive.Root>
  )
}