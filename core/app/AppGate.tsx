'use client'

import { useAuth } from '@clerk/nextjs'
import { useAppContext } from '@/core/app/useAppContext'
import { Button, Stack, Text } from '@/ui'

function AppLoader() {
  return (
    <div className="flex h-screen items-center justify-center">
      <span>Loading...</span>
    </div>
  )
}

function NotAuthenticated() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Stack gap="md" className="items-center">
        <Text size="lg" weight="semibold">
          Please login to continue
        </Text>

        <Button
          onClick={() => {
            window.location.href = '/login'
          }}
        >
          Go to Login
        </Button>
      </Stack>
    </div>
  )
}

export function AppGate({ children }: { children: React.ReactNode }) {
  const { isLoaded, isSignedIn } = useAuth()
  const app = useAppContext()

  if (!isLoaded) return <AppLoader />
  if (!isSignedIn) return <NotAuthenticated />
  if (!app.isBootstrapped) return <AppLoader />

  return <>{children}</>
}