// features/users/infrastructure/mappers/user.mapper.ts

import {
  TenantUserDTO,
  TenantMeDTO,
} from '../dto/user.dto'

import {
  User,
  CurrentUser,
  UserRole,
} from '@/features/users/domain/user.types'

// -----------------------------
// Role Normalization (CRITICAL)
// -----------------------------
const VALID_ROLES: UserRole[] = [
  'owner',
  'admin',
  'agent',
  'viewer',
]

const mapRole = (role: string): UserRole => {
  if (VALID_ROLES.includes(role as UserRole)) {
    return role as UserRole
  }

  // fallback (never break UI)
  return 'viewer'
}

// -----------------------------
// User Mapper
// -----------------------------
export const mapUser = (dto: TenantUserDTO): User => {
  return {
    id: dto.user_id,
    email: dto.email,
    name: dto.name,
    role: mapRole(dto.role),
    status: dto.status,
    createdAt: dto.created_at,
  }
}

// -----------------------------
// List Mapper
// -----------------------------
export const mapUsers = (dto: {
  items: TenantUserDTO[]
  total: number
}) => {
  return {
    items: dto.items.map(mapUser),
    total: dto.total,
  }
}

// -----------------------------
// Current User Mapper
// -----------------------------
export const mapCurrentUser = (
  dto: TenantMeDTO
): CurrentUser => {
  return {
    tenantId: dto.tenant_id,
    userId: dto.user_id,
    email: dto.email,
    name: dto.name,
    role: mapRole(dto.role),
  }
}