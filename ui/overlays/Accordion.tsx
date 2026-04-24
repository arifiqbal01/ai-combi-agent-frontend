'use client'

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

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

export function AccordionSection({
  items,
  type = 'single',
  defaultValue,
}: Props) {
  return (
    <Accordion
      type={type}
      collapsible={type === 'single'}
      defaultValue={defaultValue}
      className="w-full"
    >
      {items.map(item => (
        <AccordionItem
          key={item.value}
          value={item.value}
        >
          <AccordionTrigger>
            {item.title}
          </AccordionTrigger>

          <AccordionContent>
            {item.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}