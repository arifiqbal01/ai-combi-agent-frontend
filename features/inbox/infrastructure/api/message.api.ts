import { apiClient } from '@/infra/api/client'

import {
  MessageResponseDTO,
  NewMessageRequestDTO
} from '../dto/message.dto'

const BASE = '/inbox/conversations'

export function sendMessage(
  conversationId: string,
  payload: NewMessageRequestDTO
): Promise<MessageResponseDTO> {

  return apiClient.post<MessageResponseDTO>(
    `${BASE}/${conversationId}/messages`,
    payload
  )
}

export function markMessageRead(
  messageId: string
): Promise<void> {

  return apiClient.post<void>(
    `/inbox/messages/${messageId}/read`,
    {}
  )
}