import { AGENT_STATUS } from './ai.constants'
import { AgentStatus } from './ai.types'

export function normalizeAgentStatus(
  enabled?: boolean
): AgentStatus {
  if (enabled === true) return AGENT_STATUS.ENABLED
  if (enabled === false) return AGENT_STATUS.DISABLED
  return AGENT_STATUS.UNKNOWN
}

export function canDisableAgent(
  agent: { isDefault: boolean; isActive: boolean },
  totalAgents: number
): boolean {
  if (!agent.isActive) return false

  // ❌ default + only one → cannot disable
  if (agent.isDefault && totalAgents === 1) {
    return false
  }

  return true
}

export function getDisableAgentReason(
  agent: { isDefault: boolean; isActive: boolean },
  totalAgents: number
): string | null {
  if (!agent.isActive) return null

  if (agent.isDefault && totalAgents === 1) {
    return 'Default agent cannot be disabled while it is the only agent'
  }

  return null
}