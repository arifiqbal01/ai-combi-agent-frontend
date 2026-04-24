// features/auth/domain/auth.guards.ts

import { AuthUser } from './auth.types'

// -----------------------------
// Guards
// -----------------------------
export const isValidAuthUser = (
  user: any
): user is AuthUser => {
  return (
    user &&
    typeof user.userId === 'string'
  )
}

// -----------------------------
// Tenant Guard (separate concern)
// -----------------------------
export const hasTenantSelected = (
  tenantId: string | null | undefined
) => {
  return !!tenantId
}