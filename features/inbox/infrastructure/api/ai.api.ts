import { apiClient } from '@/infra/api/client'

import {
  AISuggestionListResponseDTO,
  AISuggestionDTO,
  AIRunDTO // 👈 ADD THIS TYPE
} from '../dto/ai.dto'

const BASE = '/inbox/conversations'

export function listAISuggestions(
  conversationId: string
): Promise<AISuggestionListResponseDTO> {

  return apiClient.get<AISuggestionListResponseDTO>(
    `${BASE}/${conversationId}/ai-suggestions`
  )
}

export function getLatestAISuggestion(
  conversationId: string
): Promise<{ suggestion?: AISuggestionDTO }> {

  return apiClient.get<{ suggestion?: AISuggestionDTO }>(
    `${BASE}/${conversationId}/ai-suggestions/latest`
  )
}

/* =========================
   🔥 ADD THIS (FIX)
========================= */

export function getLatestAIRun(
  conversationId: string
): Promise<AIRunDTO | null> {
  return apiClient.get<AIRunDTO | null>(
    `${BASE}/${conversationId}/ai-runs/latest`
  )
}