'use client'

import type { ReactNode } from 'react'
import ShellLayout from '@/ui/shell/layout/ShellLayout'
import { TooltipProvider, LoadingState } from '@/ui'
import { Toaster } from 'sonner'
import { useBootstrap } from '@/core/session/useBootstrap'

export default function AppLayout({
  children,
}: {
  children: ReactNode
}) {
  const ready = useBootstrap()

  return (
    <TooltipProvider delayDuration={150}>
      <ShellLayout>
        {!ready ? (
          <div className="p-6 space-y-4">
          <div className="h-6 w-40 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-64 bg-gray-200 rounded animate-pulse" />

          <div className="mt-6 space-y-3">
            <div className="h-12 bg-gray-100 rounded animate-pulse" />
            <div className="h-12 bg-gray-100 rounded animate-pulse" />
            <div className="h-12 bg-gray-100 rounded animate-pulse" />
          </div>
        </div>
        ) : (
          children
        )}
      </ShellLayout>

      <Toaster
        position="top-right"
        richColors
        closeButton
      />
    </TooltipProvider>
  )
}