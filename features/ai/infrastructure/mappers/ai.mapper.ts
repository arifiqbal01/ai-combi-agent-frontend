import {
  AgentDTO,
  AgentRunProgressDTO,
  SuggestionPreviewDTO,
} from '../dto/ai.dto'

import {
  Agent,
  AgentRunProgress,
  Suggestion,
} from '../../domain/ai.types'

import {
  normalizeAgentStatus,
} from '../../domain/ai.guards'

import {
  AGENT_STATUS,
  AGENT_RUN_STATUS,
  AGENT_RUN_STAGE,
} from '../../domain/ai.constants'

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

    status,
    isActive,

    createdAt: dto.created_at,
    updatedAt: dto.updated_at ?? undefined,

    config: {
      tone: {
        style: dto.config.tone.style,
        formality: dto.config.tone.formality,
        verbosity: dto.config.tone.verbosity,
        language: dto.config.tone.language,
      },

      capabilities: {
        suggestion: dto.config.capabilities.suggestion,
        autoReply: dto.config.capabilities.auto_reply,
      },

      autoReplyThreshold: dto.config.auto_reply_threshold,

      signature: {
        enabled: dto.config.signature.enabled,
        stripAiSignature: dto.config.signature.strip_ai_signature,
        template: dto.config.signature.template,
        companyName: dto.config.signature.company_name,
        supportEmail: dto.config.signature.support_email,
        website: dto.config.signature.website,
      },
    },
  }
}

/* ----------------------------------------
   Map Agent List
---------------------------------------- */
export function mapAgents(dtos: AgentDTO[]): Agent[] {
  return dtos
    .map(mapAgentDTO)
    .sort((a, b) => {
      if (a.isActive !== b.isActive) {
        return a.isActive ? -1 : 1
      }

      if (a.isDefault !== b.isDefault) {
        return a.isDefault ? -1 : 1
      }

      return (
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
      )
    })
}

/* ----------------------------------------
   Map Suggestion
---------------------------------------- */
function mapSuggestion(
  dto?: SuggestionPreviewDTO | null
): Suggestion | undefined {
  if (!dto) return undefined

  return {
    id: dto.id,
    content: dto.content,
    confidence: dto.confidence,
    decision: dto.decision,
  }
}

/* ----------------------------------------
   Normalize Run Status (SAFE)
---------------------------------------- */
function normalizeRunStatus(status: string) {
  if (Object.values(AGENT_RUN_STATUS).includes(status as any)) {
    return status as AgentRunProgress['status']
  }

  return AGENT_RUN_STATUS.FAILED
}

/* ----------------------------------------
   Normalize Run Stage (SAFE)
---------------------------------------- */
function normalizeRunStage(stage: string) {
  if (Object.values(AGENT_RUN_STAGE).includes(stage as any)) {
    return stage as AgentRunProgress['stage']
  }

  return AGENT_RUN_STAGE.INIT
}

/* ----------------------------------------
   Map Agent Run Progress
---------------------------------------- */
export function mapAgentRunProgressDTO(
  dto: AgentRunProgressDTO
): AgentRunProgress {
  return {
    runId: dto.run_id,

    status: normalizeRunStatus(dto.status),
    stage: normalizeRunStage(dto.stage),
    progress: dto.progress,

    startedAt: dto.started_at,
    updatedAt: dto.updated_at ?? undefined,
    finishedAt: dto.finished_at ?? undefined,

    isFinal: dto.is_final,
    isAutoReply: dto.is_auto_reply,

    suggestion: mapSuggestion(dto.suggestion),
  }
}