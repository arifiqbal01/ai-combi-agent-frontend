'use client'

import type { ReactNode } from 'react'

import ShellLayout from '@/ui/shell/layout/ShellLayout'
import { TooltipProvider } from '@/ui'
import { Toaster } from 'sonner'

import { AppGate } from '@/core/app/AppGate'
import { ClerkErrorBoundary } from '@/core/errors/ClerkErrorBoundary'

export default function AppLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <ClerkErrorBoundary>
      <AppGate>
        <TooltipProvider delayDuration={150}>
          <ShellLayout>
            {children}
          </ShellLayout>

          <Toaster
            position="top-right"
            richColors
            closeButton
          />
        </TooltipProvider>
      </AppGate>
    </ClerkErrorBoundary>
  )
}