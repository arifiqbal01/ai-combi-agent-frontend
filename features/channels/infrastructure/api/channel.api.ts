// features/channels/infrastructure/api/channel.api.ts

import { apiClient } from '@/infra/api/client'
import {
  ChannelAccountDTO,
  CreateChannelAccountDTO,
  ConnectRequestDTO,
  ConnectResponseDTO,
  SimpleStatusDTO,
  TestConnectionDTO,
} from '../dto/channel.dto'

// 🔥 Base WITHOUT trailing slash
const BASE = '/channels/tenant/accounts'

// 🔥 Safe URL join (prevents // bugs globally)
function joinUrl(...parts: string[]) {
  return (
    '/' +
    parts
      .map(p => p.replace(/^\/|\/$/g, ''))
      .join('/')
  )
}

export const channelApi = {
  // ✅ IMPORTANT: backend expects trailing slash here
  list() {
    return apiClient.get<ChannelAccountDTO[]>(`${BASE}/`)
  },

  // ✅ IMPORTANT: backend expects trailing slash here
  create(body: CreateChannelAccountDTO) {
    return apiClient.post<ChannelAccountDTO, CreateChannelAccountDTO>(
      `${BASE}/`,
      body
    )
  },

  /* 🔥 CONNECT */
  connect(accountId: string, body?: ConnectRequestDTO) {
  return apiClient.post<
    ConnectResponseDTO,
    ConnectRequestDTO | undefined
  >(
    joinUrl(BASE, accountId, 'connect'),
    body,
    {
      requireAuth: true,
      requireTenant: true,
    }
  )
},

  enable(accountId: string) {
    return apiClient.post<SimpleStatusDTO, void>(
      joinUrl(BASE, accountId, 'enable'),
      undefined as unknown as void
    )
  },

  disable(accountId: string) {
    return apiClient.post<SimpleStatusDTO, void>(
      joinUrl(BASE, accountId, 'disable'),
      undefined as unknown as void
    )
  },

  sync(accountId: string) {
    return apiClient.post<SimpleStatusDTO, void>(
      joinUrl(BASE, accountId, 'sync'),
      undefined as unknown as void
    )
  },

  test(accountId: string) {
    return apiClient.post<TestConnectionDTO, void>(
      joinUrl(BASE, accountId, 'test'),
      undefined as unknown as void
    )
  },
}