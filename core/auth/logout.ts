'use client'

import { useAuth } from './useAuth'

let isLoggingOut = false

export function useLogout() {
  const auth = useAuth()

  async function logout() {
    if (isLoggingOut) return
    isLoggingOut = true

    try {
      await auth.signOut({
        redirectUrl: '/sign-in',
      })
    } finally {
      isLoggingOut = false
    }
  }

  return logout
}