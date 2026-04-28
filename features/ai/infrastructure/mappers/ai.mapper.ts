import { AgentDTO } from '../dto/ai.dto'

import { Agent } from '../../domain/ai.types'
import { normalizeAgentStatus } from '../../domain/ai.guards'
import { AGENT_STATUS } from '../../domain/ai.constants'

/* ----------------------------------------
   Map Single Agent
---------------------------------------- */
export function mapAgentDTO(dto: AgentDTO): Agent {
  const status = normalizeAgentStatus(dto.enabled)

  const isActive = status === AGENT_STATUS.ENABLED

  return {
    id: dto.id,

    name: dto.name,
    description: dto.description ?? undefined,

    isDefault: dto.is_default,
    maxRunsPerMinute: dto.max_runs_per_minute,

    status,

    createdAt: dto.created_at,
    updatedAt: dto.updated_at ?? undefined,

    isActive,
  }
}

/* ----------------------------------------
   Map + Sort Agents
---------------------------------------- */
export function mapAgents(dtos: AgentDTO[]): Agent[] {
  return dtos
    .map(mapAgentDTO)
    .sort((a, b) => {
      // 🔥 Priority 1: default agents first
      if (a.isDefault !== b.isDefault) {
        return a.isDefault ? -1 : 1
      }

      // 🔥 Priority 2: active agents
      if (a.isActive !== b.isActive) {
        return a.isActive ? -1 : 1
      }

      // 🔥 Priority 3: newest first
      return (
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
      )
    })
}