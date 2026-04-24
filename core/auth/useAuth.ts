'use client'

import { useClerkAdapter } from './providers/clerk.adapter'
import type { AuthAdapter } from './auth.adapter'

// 🔥 swap provider here in future
export function useAuth(): AuthAdapter {
  return useClerkAdapter()
}