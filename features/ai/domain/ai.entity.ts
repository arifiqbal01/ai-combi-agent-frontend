import { Agent } from './ai.types'
import { normalizeAgentStatus } from './ai.guards'
import { AGENT_STATUS } from './ai.constants'
import {
  AgentRunProgress,
  Suggestion,
} from './ai.types'
import { AgentDTO } from '../infrastructure/dto/ai.dto'

export function createAgentEntity(dto: AgentDTO): Agent {
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
   Create Suggestion Entity
---------------------------------------- */
export function createSuggestionEntity(
  data: Suggestion
): Suggestion {
  return {
    id: data.id,
    content: data.content,
    confidence: data.confidence,
    decision: data.decision,
  }
}

/* ----------------------------------------
   Create Agent Run Entity
---------------------------------------- */
export function createAgentRunEntity(
  data: AgentRunProgress
): AgentRunProgress {
  return {
    runId: data.runId,

    status: data.status,
    stage: data.stage,
    progress: data.progress,

    startedAt: data.startedAt,
    updatedAt: data.updatedAt,
    finishedAt: data.finishedAt,

    isFinal: data.isFinal,
    isAutoReply: data.isAutoReply,

    suggestion: data.suggestion
      ? createSuggestionEntity(data.suggestion)
      : undefined,
  }
}