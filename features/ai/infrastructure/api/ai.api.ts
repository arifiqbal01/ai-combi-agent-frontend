import { apiClient } from '@/infra/api/client'

import {
  AgentDTO,
  CreateAgentDTO,
  AgentStatusDTO,
  UpdateAgentConfigDTO,
  UpdateAgentConfigResponseDTO,
} from '../dto/ai.dto'

const BASE = '/ai/agents'

function joinUrl(...parts: string[]) {
  return (
    '/' +
    parts
      .map((p) => p.replace(/^\/|\/$/g, ''))
      .join('/')
  )
}

export const aiApi = {
  /* -----------------------------
     LIST
  ----------------------------- */
  list(params?: { enabled?: boolean }) {
    const query =
      params?.enabled !== undefined
        ? `?enabled=${params.enabled}`
        : ''

    return apiClient.get<AgentDTO[]>(`${BASE}/${query}`)
  },

  /* -----------------------------
     CREATE
  ----------------------------- */
  create(body: CreateAgentDTO) {
    return apiClient.post<AgentDTO, CreateAgentDTO>(
      `${BASE}/`,
      body
    )
  },

  /* -----------------------------
     ENABLE
  ----------------------------- */
  enable(agentId: string) {
    return apiClient.post<AgentStatusDTO, void>(
      joinUrl(BASE, agentId, 'enable'),
      undefined as unknown as void
    )
  },

  /* -----------------------------
     DISABLE
  ----------------------------- */
  disable(agentId: string) {
    return apiClient.post<AgentStatusDTO, void>(
      joinUrl(BASE, agentId, 'disable'),
      undefined as unknown as void
    )
  },

  /* -----------------------------
     UPDATE CONFIG (FIXED ✅)
  ----------------------------- */
  updateConfig(agentId: string, body: UpdateAgentConfigDTO) {
    return apiClient.patch<
      UpdateAgentConfigResponseDTO,
      UpdateAgentConfigDTO
    >(
      joinUrl(BASE, agentId, 'config'),
      body
    )
  },
}