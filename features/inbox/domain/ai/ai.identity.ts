/* domain/ai/ai.identity.ts */

import {

 AISuggestion,
 AISuggestionDecision,
 AISuggestionStatus

} from './ai.types'

export type AISuggestionIdentity={

 isReady:boolean

 isFailed:boolean

 isPending:boolean

 isAutoReply:boolean

 isSuggestion:boolean

 isIgnorable:boolean

 hasContent:boolean

 confidenceLevel:
  | 'low'
  | 'medium'
  | 'high'

}

/* =========================
 confidence classification
========================= */

function resolveConfidenceLevel(
 confidence:number
){

 if(confidence >= 0.80)
  return 'high'

 if(confidence >= 0.50)
  return 'medium'

 return 'low'

}

/* =========================
 identity resolver
========================= */

export function resolveAISuggestionIdentity(

 suggestion:AISuggestion

):AISuggestionIdentity{

 const isReady =
  suggestion.status===
  AISuggestionStatus.READY

 const isFailed =
  suggestion.status===
  AISuggestionStatus.FAILED

 const isPending =
  suggestion.status===
  AISuggestionStatus.PENDING

 const isAutoReply =
  suggestion.decision===
  AISuggestionDecision.AUTO_REPLY

 const isSuggestion =
  suggestion.decision===
  AISuggestionDecision.SUGGEST

 const isIgnorable =
  suggestion.decision===
  AISuggestionDecision.IGNORE

 const hasContent =
  Boolean(suggestion.content)

 return{

  isReady,

  isFailed,

  isPending,

  isAutoReply,

  isSuggestion,

  isIgnorable,

  hasContent,

  confidenceLevel:
   resolveConfidenceLevel(
    suggestion.confidence
   )

 }

}