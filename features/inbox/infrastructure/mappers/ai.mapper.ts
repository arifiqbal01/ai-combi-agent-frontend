/* infrastructure/mappers/ai.mapper.ts */

import {

 AISuggestionDTO,
 AIRunDTO

} from '../dto/ai.dto'

import {

 AISuggestion,
 AISuggestionDecision,
 AISuggestionStatus,
 AIRun,
 AIRunState

} from '@/features/inbox/domain/ai/ai.types'

function formatConfidence(
 value:number
):number{

 return Math.round(
  value * 100
 )

}

/* =========================
 Decision normalization
========================= */

function normalizeDecision(
 decision:string
):AISuggestionDecision{

 if(decision===AISuggestionDecision.AUTO_REPLY)
  return AISuggestionDecision.AUTO_REPLY

 if(decision===AISuggestionDecision.IGNORE)
  return AISuggestionDecision.IGNORE

 return AISuggestionDecision.SUGGEST

}

/* =========================
 Status normalization
========================= */

function normalizeStatus(
 status:string
):AISuggestionStatus{

 if(status===AISuggestionStatus.FAILED)
  return AISuggestionStatus.FAILED

 if(status===AISuggestionStatus.READY)
  return AISuggestionStatus.READY

 return AISuggestionStatus.PENDING

}

/* =========================
 Run state normalization
========================= */

function normalizeRunState(
 state:string
):AIRunState{

 if(state===AIRunState.COMPLETED)
  return AIRunState.COMPLETED

 if(state===AIRunState.SKIPPED)
  return AIRunState.SKIPPED

 if(state===AIRunState.FAILED)
  return AIRunState.FAILED

 return AIRunState.RUNNING

}

/* =========================
 Suggestion mapper
========================= */

export function mapAISuggestionDTO(

 dto:AISuggestionDTO

):AISuggestion{

 return{

  id:
   dto.suggestion_id,

  decision:
   normalizeDecision(
    dto.decision
   ),

  content:
   dto.content || '',

  confidence:
   dto.confidence,

  confidencePercent:
   formatConfidence(
    dto.confidence
   ),

  status:
   normalizeStatus(
    dto.status
   ),

  createdAt:
   dto.created_at,

  messageId:
   dto.message_id || undefined,

  metadata:
   dto.metadata,

  signals:
   dto.signals

 }

}

/* =========================
 AI run mapper
========================= */

export function mapAIRunDTO(

 dto:AIRunDTO

):AIRun{

 return{

  id:
   dto.agent_run_id,

  state:
   normalizeRunState(
    dto.state
   ),

  progress:
   dto.progress,

  active:
   dto.active,

  updatedAt:
   dto.updated_at,

  stage:
   dto.stage,

  status:
   dto.status

 }

}

/* =========================
 list mappers
========================= */

export function mapAISuggestions(

 suggestions:AISuggestionDTO[]

):AISuggestion[]{

 return suggestions.map(
  mapAISuggestionDTO
 )

}

export function mapAIRuns(

 runs:AIRunDTO[]

):AIRun[]{

 return runs.map(
  mapAIRunDTO
 )

}