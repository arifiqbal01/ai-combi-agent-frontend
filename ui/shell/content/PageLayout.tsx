'use client'

import { ReactNode } from 'react'
import { Stack, Inline, Text, AppPanel } from '@/ui'

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
    <Stack className="flex-1 min-h-0">
      {/* FIXED PAGE HEADER */}
      {(title || actions) && (
        <div className="shrink-0 border-b border-border-subtle bg-[rgb(var(--bg-surface-neutral))]">
          <div className="mx-auto w-full max-w-5xl px-4 md:px-6 py-4">
            <Inline align="center" className="justify-between gap-4">
              <Stack className="flex-1 min-w-0">
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

              {actions && (
                <div className="shrink-0">
                  {actions}
                </div>
              )}
            </Inline>
          </div>
        </div>
      )}

      {/* SCROLL CONTENT */}
      <AppPanel scroll>
        <div className="mx-auto w-full max-w-5xl px-4 md:px-6 py-6">
          {children}
        </div>
      </AppPanel>
    </Stack>
  )
}