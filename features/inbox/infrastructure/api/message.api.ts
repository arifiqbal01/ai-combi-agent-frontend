import { apiClient } from '@/infra/api/client'

const BASE='/inbox/conversations'

export async function sendMessage(

 conversationId:string,
 payload:NewMessageRequest

){

 const data = await apiClient.post(

  `${BASE}/${conversationId}/messages`,
  payload

 )

 return data as MessageResponseDTO

}

export function markMessageRead(messageId:string){

 return apiClient.post(

  `/inbox/messages/${messageId}/read`,
  {}

 )

}