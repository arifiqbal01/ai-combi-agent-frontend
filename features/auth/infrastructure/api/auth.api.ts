// features/auth/infrastructure/api/auth.api.ts

import { apiClient } from '@/infra/api/client'

import {
  MeResponseDTO,
  TenantMeResponseDTO,
  MyTenantsResponseDTO,
  AcceptInviteRequestDTO,
  AcceptInviteResponseDTO,
} from '../dto/auth.dto'

export const authApi = {
  // -----------------------------
  // Current User (no tenant)
  // -----------------------------
  getMe: () => {
    return apiClient.get<MeResponseDTO>('/auth/me', {
      requireAuth: true,
      requireTenant: false,
    })
  },

  // -----------------------------
  // All user tenants (important for bootstrap)
  // -----------------------------
  getMyTenants: () => {
    return apiClient.get<MyTenantsResponseDTO>('/auth/tenants', {
      requireAuth: true,
      requireTenant: false,
    })
  },

  // -----------------------------
  // Tenant Context (requires tenant)
  // -----------------------------
  getTenantMe: () => {
    return apiClient.get<TenantMeResponseDTO>('/tenant/me', {
      requireAuth: true,
      requireTenant: true,
    })
  },

  // -----------------------------
  // Accept Invite
  // -----------------------------
  acceptInvite: (data: AcceptInviteRequestDTO) => {
    return apiClient.post<
      AcceptInviteResponseDTO,
      AcceptInviteRequestDTO
    >('/auth/accept-invite', data, {
      requireAuth: true,
      requireTenant: false,
    })
  },
}