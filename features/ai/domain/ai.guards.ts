import { AGENT_STATUS, AGENT_RUN_STATUS } from './ai.constants'
import {
  AgentStatus,
  AgentRunStatus,
  AgentRunProgress,
  Suggestion,
} from './ai.types'

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

/* ----------------------------------------
   Is Run Active
---------------------------------------- */
export function isRunActive(
  run: { status: AgentRunStatus }
): boolean {
  return (
    run.status === AGENT_RUN_STATUS.QUEUED ||
    run.status === AGENT_RUN_STATUS.RUNNING
  )
}

/* ----------------------------------------
   Is Run Completed
---------------------------------------- */
export function isRunCompleted(
  run: { status: AgentRunStatus }
): boolean {
  return run.status === AGENT_RUN_STATUS.COMPLETED
}

/* ----------------------------------------
   Is Run Failed
---------------------------------------- */
export function isRunFailed(
  run: { status: AgentRunStatus }
): boolean {
  return run.status === AGENT_RUN_STATUS.FAILED
}

/* ----------------------------------------
   Can Show Suggestion
---------------------------------------- */
export function canShowSuggestion(
  run: AgentRunProgress
): boolean {
  return (
    run.isFinal &&
    !!run.suggestion &&
    !run.isAutoReply
  )
}

/* ----------------------------------------
   Is Auto Reply
---------------------------------------- */
export function isAutoReplyRun(
  run: AgentRunProgress
): boolean {
  return run.isAutoReply
}

/* ----------------------------------------
   Has Suggestion
---------------------------------------- */
export function hasSuggestion(
  suggestion?: Suggestion
): boolean {
  return !!suggestion && !!suggestion.content
}