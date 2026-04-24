// features/auth/domain/auth.types.ts

export type AuthUser = {
  userId: string
  email: string | null
  platformRole: string | null
}

export type TenantContext = {
  tenantId: string
  userId: string
  role: string | null
  email: string | null
  name: string | null
}

export type TenantSummary = {
  tenantId: string
  name: string
  role: string
}