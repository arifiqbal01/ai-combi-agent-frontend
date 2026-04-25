'use client'

import { useAuth } from '@clerk/nextjs'
import { useAppContext } from '@/core/app/useAppContext'

export function useBootstrap() {
  const { isLoaded, isSignedIn } = useAuth()
  const app = useAppContext()

  const ready =
    isLoaded &&
    isSignedIn &&
    app.isBootstrapped   // ✅

  return {
    ready,
    hasTenant: app.hasTenant,
  }
}