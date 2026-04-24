// features/inbox/application/ai/reducers/ai.reducer.ts

import {
 mergeSuggestion,
 mergeAIRun
}
from '@/features/inbox/domain/ai/ai.sync.engine'

export function aiReducer(

 state:any,

 action:any

){

 switch(action.type){

 case 'AI_RUN_UPDATE':

  return{

   ...state,

   aiRun:
    mergeAIRun(
     state.aiRun ?? null,
     action.payload
    )

  }

 case 'AI_SUGGESTION':

  return{

   ...state,

   aiSuggestion:
    mergeSuggestion(
     state.aiSuggestion ?? null,
     action.payload
    )

  }

 default:

  return state

 }

}