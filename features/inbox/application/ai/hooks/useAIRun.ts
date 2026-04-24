import { AIRun }
from '@/features/inbox/domain/ai/ai.types'

export function useAIRun(

 state:any

){

 const run:AIRun | null =
  state?.aiRun ?? null

 return{

  run,

  active:run?.active ?? false,

  progress:run?.progress ?? 0

 }

}