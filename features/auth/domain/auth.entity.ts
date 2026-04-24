// features/auth/domain/auth.entity.ts

import {
  AuthUser,
  AuthSession,
} from './auth.types'

// -----------------------------
// Auth Checks
// -----------------------------
export const isAuthenticated = (
  token: string | null
) => {
  return !!token
}

// -----------------------------
// Session Builder (NO tenant dependency)
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