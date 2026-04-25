'use client'

import React from 'react'
import { Stack, Text, Button } from '@/ui'

type State = {
  hasError: boolean
}

export class ClerkErrorBoundary extends React.Component<
  { children: React.ReactNode },
  State
> {
  state: State = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: unknown) {
    console.error('Clerk failed:', error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-screen items-center justify-center">
          <Stack gap="md" className="items-center">
            <Text size="lg" weight="semibold">
              Authentication service unavailable
            </Text>

            <Text size="sm" tone="muted">
              Please try again in a moment
            </Text>

            <Button onClick={() => window.location.reload()}>
              Retry
            </Button>
          </Stack>
        </div>
      )
    }

    return this.props.children
  }
}