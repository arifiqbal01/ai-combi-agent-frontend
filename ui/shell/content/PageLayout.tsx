'use client'

import { ReactNode } from 'react'
import { Stack, Inline, Text } from '@/ui'
import Content from './Content'

type Props = {
  title?: string
  description?: string
  actions?: ReactNode
  children: ReactNode
}

export default function PageLayout({
  title,
  description,
  actions,
  children,
}: Props) {
  return (
    <Content>

      <Stack className="h-full">

        {/* HEADER */}
        {(title || actions) && (
          <Inline
            className="border-b border-border-subtle px-6 py-4"
            align="center"
          >
            <Stack className="flex-1">
              {title && (
                <Text size="lg" weight="semibold">
                  {title}
                </Text>
              )}

              {description && (
                <Text size="sm" tone="muted">
                  {description}
                </Text>
              )}
            </Stack>

            {actions}
          </Inline>
        )}

        {/* BODY */}
        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-6xl px-6 py-6">
            {children}
          </div>
        </div>

      </Stack>

    </Content>
  )
}