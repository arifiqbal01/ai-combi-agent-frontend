import { apiClient } from '@/infra/api/client'

import {
  ConversationListItemDTO,
  ConversationDetailDTO
} from '../dto/conversation.dto'

const BASE = '/inbox/conversations'

export async function listConversations(): Promise<ConversationListItemDTO[]> {
  const res = await apiClient.get<{
    conversations: ConversationListItemDTO[]
  }>(BASE)

  // ✅ normalize here (ONLY once)
  return res.conversations
}

export async function getConversation(
  id: string
): Promise<ConversationDetailDTO> {
  return apiClient.get(`${BASE}/${id}`)
}

export async function closeConversation(
  id: string
): Promise<void> {
  await apiClient.post(`${BASE}/${id}/close`, {})
}