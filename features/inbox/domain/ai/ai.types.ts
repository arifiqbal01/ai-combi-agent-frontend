/* domain/ai/ai.types.ts */

export const AISuggestionDecision = {

 SUGGEST:'suggest',

 AUTO_REPLY:'auto_reply',

 IGNORE:'ignore'

} as const

export type AISuggestionDecision =
 typeof AISuggestionDecision[
  keyof typeof AISuggestionDecision
 ]

export const AISuggestionStatus = {

 PENDING:'pending',

 READY:'ready',

 FAILED:'failed'

} as const

export type AISuggestionStatus =
 typeof AISuggestionStatus[
  keyof typeof AISuggestionStatus
 ]

export const AIRunState = {

 RUNNING:'running',

 COMPLETED:'completed',

 SKIPPED:'skipped',

 FAILED:'failed'

} as const

export type AIRunState =
 typeof AIRunState[
  keyof typeof AIRunState
 ]

export type AISuggestionMetadata={

 model?:string

 tokens?:number

}

export type AISuggestionSignals={

 intent?:string

 urgency?:string

}

export type AISuggestion={

 id:string

 decision:AISuggestionDecision

 content:string

 confidence:number

 confidencePercent:number

 status:AISuggestionStatus

 createdAt:string

 messageId?:string

 metadata?:AISuggestionMetadata

 signals?:AISuggestionSignals

}

export type AIRun={

 id:string

 state:AIRunState

 progress:number

 active:boolean

 updatedAt:string

 stage?:string

 status?:string

}