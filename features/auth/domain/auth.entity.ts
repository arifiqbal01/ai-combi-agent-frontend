// features/auth/domain/auth.entity.ts

import { AuthUser } from './auth.types'

// -----------------------------
// Session Shape (LOCAL)
// -----------------------------
export type AuthSession = {
  token: string
  userId: string
  tenantId: string | null
}

// -----------------------------
// Auth Checks
// -----------------------------
export const isAuthenticated = (
  token: string | null
) => {
  return !!token
}

// -----------------------------
// Session Builder
// -----------------------------
export const buildSession = (
  token: string,
  user: AuthUser,
  tenantId?: string
): AuthSession | null => {
  if (!token || !user?.userId) return null

  return {
    token,
    userId: user.userId,
    tenantId: tenantId ?? null,
  }
}