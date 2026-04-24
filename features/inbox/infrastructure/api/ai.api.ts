// features/inbox/infrastructure/api/ai.api.ts
import { apiClient } from '@/infra/api/client'

const BASE='/inbox/conversations'

export function listAISuggestions(
 conversationId:string
){

 return apiClient.get(

  `${BASE}/${conversationId}/ai-suggestions`

 )

}

export function getLatestAISuggestion(
 conversationId:string
){

 return apiClient.get(

 `${BASE}/${conversationId}/ai-suggestions/latest`

 )

}