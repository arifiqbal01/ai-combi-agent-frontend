// features/inbox/infrastructure/api/conversation.api.ts

import { apiClient } from '@/infra/api/client'

const BASE='/inbox/conversations'

export function listConversations(){

 return apiClient.get(`${BASE}`)

}

export function getConversation(
 id:string
){

 return apiClient.get(`${BASE}/${id}`)

}

export function closeConversation(
 id:string
){

 return apiClient.post(
  `${BASE}/${id}/close`,
  {}
 )

}