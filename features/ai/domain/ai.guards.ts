import { AGENT_STATUS } from './ai.constants'
import { AgentStatus } from './ai.types'

/* ----------------------------------------
   Normalize Status (STRICT)
---------------------------------------- */
export function normalizeAgentStatus(
  enabled: boolean
): AgentStatus {
  return enabled
    ? AGENT_STATUS.ENABLED
    : AGENT_STATUS.DISABLED
}

/* ----------------------------------------
   Can Disable Agent
---------------------------------------- */
export function canDisableAgent(
  agent: { isActive: boolean }
): boolean {
  return agent.isActive
}

/* ----------------------------------------
   Disable Reason
---------------------------------------- */
export function getDisableAgentReason(
  agent: { isActive: boolean }
): string | null {
  return agent.isActive
    ? null
    : 'Agent is already disabled'
}