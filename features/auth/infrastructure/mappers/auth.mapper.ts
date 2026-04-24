// features/auth/infrastructure/mappers/auth.mapper.ts

import {
  MeResponseDTO,
  TenantMeResponseDTO,
  MyTenantsResponseDTO,
  TenantItemDTO,
} from '../dto/auth.dto'

import {
  AuthUser,
  TenantContext,
  TenantSummary,
} from '@/features/auth/domain/auth.types'

// -----------------------------
// User Mapper
// -----------------------------
export const mapAuthUser = (
  dto: MeResponseDTO
): AuthUser => {
  return {
    userId: dto.user_id,
    email: dto.email ?? null,
    platformRole: dto.platform_role,
  }
}

// -----------------------------
// Tenant Context Mapper
// -----------------------------
export const mapTenantContext = (
  dto: TenantMeResponseDTO
): TenantContext => {
  return {
    tenantId: dto.tenant_id,
    userId: dto.user_id,
    role: dto.role,
    email: dto.email ?? null,
    name: dto.name ?? null,
  }
}

// -----------------------------
// Single Tenant Mapper
// -----------------------------
export const mapTenantItem = (
  dto: TenantItemDTO
): TenantSummary => {
  return {
    tenantId: dto.tenant_id,
    name: dto.name,
    role: dto.role,
  }
}

// -----------------------------
// Tenants List Mapper
// -----------------------------
export const mapTenants = (
  dto: MyTenantsResponseDTO
): TenantSummary[] => {
  return dto.tenants.map(mapTenantItem)
}