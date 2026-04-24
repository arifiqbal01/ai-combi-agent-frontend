export type UserStatus = 'active' | 'invited' | 'disabled'

// -----------------------------
// Roles
// -----------------------------
export type UserRole =
  | 'owner'
  | 'admin'
  | 'agent'
  | 'viewer'

// 🔥 derive type FROM constant (not duplicated)
export const ASSIGNABLE_ROLES = [
  'admin',
  'agent',
  'viewer',
] as const

export type AssignableRole =
  typeof ASSIGNABLE_ROLES[number]

// -----------------------------
// Entities
// -----------------------------
export type User = {
  id: string
  email: string
  name: string | null
  role: UserRole
  status: UserStatus
  createdAt: string
}

export type CurrentUser = {
  tenantId: string
  userId: string
  email: string
  name: string | null
  role: UserRole
}