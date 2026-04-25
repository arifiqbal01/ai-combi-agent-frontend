/* infrastructure/mappers/ai.mapper.ts */

import {
  AISuggestionDTO,
  AIRunDTO,
  AISuggestionDecisionDTO,
  AISuggestionStatusDTO,
  AIRunStateDTO
} from '../dto/ai.dto'

import {
  AISuggestion,
  AISuggestionDecision,
  AISuggestionStatus,
  AIRun,
  AIRunState
} from '@/features/inbox/domain/ai/ai.types'

/* =========================
 Helpers
========================= */

function formatConfidence(value: number): number {
  return Math.round(value * 100)
}

function normalizeConfidence(
  value: number | null | undefined
): number {
  if (typeof value !== 'number') return 0
  return Math.min(1, Math.max(0, value))
}

/* =========================
 Decision normalization
========================= */

function normalizeDecision(
  decision: AISuggestionDecisionDTO
): AISuggestionDecision {

  switch (decision) {
    case 'auto_reply':
      return AISuggestionDecision.AUTO_REPLY

    case 'ignore':
      return AISuggestionDecision.IGNORE

    case 'suggest':
    default:
      return AISuggestionDecision.SUGGEST
  }
}

/* =========================
 Status normalization
========================= */

function normalizeStatus(
  status: AISuggestionStatusDTO
): AISuggestionStatus {

  switch (status) {
    case 'failed':
      return AISuggestionStatus.FAILED

    case 'ready':
      return AISuggestionStatus.READY

    case 'pending':
    default:
      return AISuggestionStatus.PENDING
  }
}

/* =========================
 Run state normalization
========================= */

function normalizeRunState(
  state: AIRunStateDTO
): AIRunState {

  switch (state) {
    case 'completed':
      return AIRunState.COMPLETED

    case 'skipped':
      return AIRunState.SKIPPED

    case 'failed':
      return AIRunState.FAILED

    case 'running':
    default:
      return AIRunState.RUNNING
  }
}

/* =========================
 Suggestion mapper
========================= */

export function mapAISuggestionDTO(
  dto: AISuggestionDTO
): AISuggestion {

  const confidence = normalizeConfidence(dto.confidence)

  return {
    id: dto.suggestion_id,

    decision: normalizeDecision(dto.decision),

    content: dto.content?.trim() || '',

    confidence,
    confidencePercent: formatConfidence(confidence),

    status: normalizeStatus(dto.status),

    createdAt: dto.created_at || new Date().toISOString(),

    messageId: dto.message_id ?? undefined,

    metadata: dto.metadata ?? undefined,

    signals: dto.signals ?? undefined
  }
}

/* =========================
 AI run mapper
========================= */

export function mapAIRunDTO(
  dto: AIRunDTO
): AIRun {

  return {
    id: dto.agent_run_id,

    state: normalizeRunState(dto.state),

    progress:
      typeof dto.progress === 'number'
        ? Math.min(100, Math.max(0, dto.progress))
        : 0,

    active: Boolean(dto.active),

    updatedAt: dto.updated_at || new Date().toISOString(),

    stage: dto.stage ?? undefined,

    status: dto.status ?? undefined
  }
}

/* =========================
 List mappers
========================= */

export function mapAISuggestions(
  suggestions: AISuggestionDTO[] | null | undefined
): AISuggestion[] {

  return (suggestions || []).map(mapAISuggestionDTO)
}

export function mapAIRuns(
  runs: AIRunDTO[] | null | undefined
): AIRun[] {

  return (runs || []).map(mapAIRunDTO)
}