// features/users/infrastructure/api/user.api.ts

import { apiClient } from '@/infra/api/client'

import {
  ListUsersDTO,
  TenantMeDTO,
  AddUserRequestDTO,
  TenantUserDTO,
} from '../dto/user.dto'

// -----------------------------
// Users API
// -----------------------------
export const userApi = {
  // GET /tenant/users
  getUsers: () => {
    return apiClient.get<ListUsersDTO>('/tenant/users')
  },

  // GET /tenant/me
  getMe: () => {
    return apiClient.get<TenantMeDTO>('/tenant/me')
  },

  // POST /tenant/users
  addUser: (data: AddUserRequestDTO) => {
    return apiClient.post<TenantUserDTO, AddUserRequestDTO>(
      '/tenant/users',
      data
    )
  },
}