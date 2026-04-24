'use client'

import { useAuth, useUser, useClerk } from '@clerk/nextjs'
import type { AuthAdapter } from '../auth.adapter'
import { useSessionStore } from '@/core/session/session.store'
import { queryClient } from '@/core/providers/query-provider'

export function useClerkAdapter(): AuthAdapter {
  const { getToken, isLoaded: authLoaded, isSignedIn } = useAuth()
  const { user, isLoaded: userLoaded } = useUser()
  const { signOut } = useClerk()

  const isLoaded = authLoaded && userLoaded
  const isAuthenticated = !!isSignedIn

  return {
    isLoaded,
    isAuthenticated,
    user: user
      ? {
          id: user.id,
          email:
            user.primaryEmailAddress?.emailAddress ?? null,
          name: user.fullName ?? null,
        }
      : null,

    getToken: async () => {
      try {
        return await getToken()
      } catch {
        return null
      }
    },

    signOut: async ({ redirectUrl } = {}) => {
      // 🧹 Clear client state FIRST
      localStorage.removeItem('tenant_id')
      sessionStorage.removeItem('invite_token')

      // 🔥 clear react-query cache (IMPORTANT)
      try {
        const { queryClient } = await import('@/core/providers/query-provider')
        queryClient.clear()
      } catch {}

      // 🚀 logout from Clerk
      await signOut(() => {
        window.location.href = redirectUrl ?? '/login'
      })
    }
  }
}