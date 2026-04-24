// features/auth/infrastructure/dto/auth.dto.ts

export type MeResponseDTO = {
  user_id: string
  email: string | null
  platform_role: string | null
}

// -----------------------------
// Tenants List (bootstrap)
// -----------------------------
export type TenantItemDTO = {
  tenant_id: string
  name: string
  role: string
}

export type MyTenantsResponseDTO = {
  tenants: TenantItemDTO[]
}

// -----------------------------
// Tenant Context
// -----------------------------
export type TenantMeResponseDTO = {
  tenant_id: string
  user_id: string
  role: string | null
  email?: string
  name?: string | null
}

// -----------------------------
// Accept Invite
// -----------------------------
export type AcceptInviteRequestDTO = {
  token: string
}

export type AcceptInviteResponseDTO = {
  message: string
  tenant_id: string
}