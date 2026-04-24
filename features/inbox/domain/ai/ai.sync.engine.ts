/* domain/ai/ai.sync.engine.ts */

import {

 AISuggestion,
 AIRun

} from './ai.types'

/* ---------------------------
 suggestion merge
--------------------------- */

export function mergeSuggestion(

 current:AISuggestion | null,

 incoming:AISuggestion

):AISuggestion{

 if(!current)
  return incoming

 if(current.id===incoming.id)
  return incoming

 return incoming

}

/* ---------------------------
 run updates
--------------------------- */

export function mergeAIRun(

 current:AIRun | null,

 incoming:AIRun

):AIRun{

 if(!current)
  return incoming

 if(current.id===incoming.id){

  return{

   ...current,

   ...incoming

  }

 }

 return incoming

}

/* ---------------------------
 clear suggestion after send
--------------------------- */

export function clearSuggestionAfterSend(

 suggestion:AISuggestion | null,

 messageClientId?:string

){

 if(!suggestion)
  return null

 if(
  suggestion.messageId===messageClientId
 )
  return null

 return suggestion

}

/* ---------------------------
 prevent duplicate suggestion
--------------------------- */

export function dedupeSuggestions(

 suggestions:AISuggestion[]

){

 const map=
  new Map<string,AISuggestion>()

 suggestions.forEach(s=>{

  map.set(s.id,s)

 })

 return Array.from(
  map.values()
 )

}