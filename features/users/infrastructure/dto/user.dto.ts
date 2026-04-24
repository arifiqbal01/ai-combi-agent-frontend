// features/users/infrastructure/dto/user.dto.ts

export type TenantUserDTO = {
  user_id: string
  email: string
  name: string | null
  role: string
  status: 'active' | 'invited' | 'disabled'
  created_at: string
}

export type ListUsersDTO = {
  items: TenantUserDTO[]
  total: number
}

export type TenantMeDTO = {
  tenant_id: string
  user_id: string
  email: string
  name: string | null
  role: string
}

export type AddUserRequestDTO = {
  email: string
  password: string
  name?: string
  role: string
}