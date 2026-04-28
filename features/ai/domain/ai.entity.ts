import { Agent } from './ai.types'
import { normalizeAgentStatus } from './ai.guards'
import { AGENT_STATUS } from './ai.constants'

export function createAgentEntity(raw: {
  id: string
  name: string
  description?: string

  enabled?: boolean
  is_default?: boolean
  max_runs_per_minute?: number

  created_at?: string
  updated_at?: string
}): Agent {
  const status = normalizeAgentStatus(raw.enabled)

  const isActive = status === AGENT_STATUS.ENABLED

  return {
    id: raw.id,

    name: raw.name,
    description: raw.description,

    isDefault: raw.is_default ?? false,
    maxRunsPerMinute: raw.max_runs_per_minute ?? 0,

    status,

    createdAt: raw.created_at ?? '',
    updatedAt: raw.updated_at,

    isActive,
  }
}