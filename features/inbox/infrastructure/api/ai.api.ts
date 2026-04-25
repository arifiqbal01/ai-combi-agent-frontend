// features/inbox/infrastructure/api/ai.api.ts

import { apiClient } from '@/infra/api/client'

import {
  AISuggestionListResponseDTO,
  AISuggestionDTO
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