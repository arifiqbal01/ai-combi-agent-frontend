/* domain/ai/ai.selectors.ts */

import {

 AISuggestion

} from './ai.types'

import {

 shouldDisplaySuggestion

} from './ai.rules'

export function selectLatestSuggestion(

 suggestion:AISuggestion | null

){

 if(!shouldDisplaySuggestion(
  suggestion
 ))
  return null

 return{

  id:
   suggestion.id,

  content:
   suggestion.content,

  confidence:
   suggestion.confidence,

  confidencePercent:
   suggestion.confidencePercent,

  createdAt:
   suggestion.createdAt

 }

}

export function getSuggestionConfidence(

 suggestion:AISuggestion | null

):number{

 if(!suggestion)
  return 0

 return suggestion.confidencePercent

}

export function hasSuggestion(

 suggestion:AISuggestion | null

):boolean{

 return Boolean(
  suggestion
 )

}

export function isHighConfidence(

 suggestion:AISuggestion | null

):boolean{

 if(!suggestion)
  return false

 return suggestion.confidence >= 0.75

}