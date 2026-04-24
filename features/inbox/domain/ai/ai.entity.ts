/* domain/ai/ai.entity.ts */

import {

 AISuggestion,
 AISuggestionStatus

} from './ai.types'

/* =========================
 mark ready
========================= */

export function markSuggestionReady(

 suggestion:AISuggestion

):AISuggestion{

 return{

  ...suggestion,

  status:
   AISuggestionStatus.READY

 }

}

/* =========================
 mark failed
========================= */

export function markSuggestionFailed(

 suggestion:AISuggestion

):AISuggestion{

 return{

  ...suggestion,

  status:
   AISuggestionStatus.FAILED

 }

}

/* =========================
 update content
========================= */

export function updateSuggestionContent(

 suggestion:AISuggestion,

 content:string

):AISuggestion{

 return{

  ...suggestion,

  content

 }

}

/* =========================
 update confidence
========================= */

export function updateConfidence(

 suggestion:AISuggestion,

 confidence:number

):AISuggestion{

 return{

  ...suggestion,

  confidence,

  confidencePercent:
   Math.round(
    confidence * 100
   )

 }

}

/* =========================
 attach message
========================= */

export function attachToMessage(

 suggestion:AISuggestion,

 messageId:string

):AISuggestion{

 return{

  ...suggestion,

  messageId

 }

}