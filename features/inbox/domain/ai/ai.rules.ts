import {

 AISuggestion,
 AISuggestionDecision,
 AISuggestionStatus

} from './ai.types'

/* =========================
 content validation
========================= */

export function hasSuggestionContent(
 suggestion:AISuggestion | null
):boolean{

 if(!suggestion)
  return false

 if(!suggestion.content)
  return false

 return suggestion.content.trim().length > 0
}

/* =========================
 decision filtering
========================= */

export function isSuggestionDecision(
 suggestion:AISuggestion | null
):boolean{

 if(!suggestion)
  return false

 return (
  suggestion.decision ===
  AISuggestionDecision.SUGGEST
 )
}

/* =========================
 status validation (UPDATED)
========================= */

export function isSuggestionReady(
 suggestion:AISuggestion | null
):boolean{

 if(!suggestion)
  return false

 // ✅ allow PENDING + READY (for real-time UI)
 return (
  suggestion.status === AISuggestionStatus.READY ||
  suggestion.status === AISuggestionStatus.PENDING
 )
}

/* =========================
 display rule
========================= */

export function shouldDisplaySuggestion(
 suggestion:AISuggestion | null
):boolean{

 if(!suggestion)
  return false

 if(!isSuggestionDecision(suggestion))
  return false

 if(!isSuggestionReady(suggestion))
  return false

 if(!hasSuggestionContent(suggestion))
  return false

 return true
}

/* =========================
 confidence helpers
========================= */

export function isHighConfidence(
 suggestion:AISuggestion | null
):boolean{

 if(!suggestion)
  return false

 return suggestion.confidence >= 0.75
}

export function isMediumConfidence(
 suggestion:AISuggestion | null
):boolean{

 if(!suggestion)
  return false

 return (
  suggestion.confidence >= 0.50 &&
  suggestion.confidence < 0.75
 )
}

export function isLowConfidence(
 suggestion:AISuggestion | null
):boolean{

 if(!suggestion)
  return false

 return suggestion.confidence < 0.50
}