/* infrastructure/dto/ai.dto.ts */

export type AISuggestionDecisionDTO =

  | 'suggest'
  | 'auto_reply'
  | 'ignore'

export type AISuggestionStatusDTO =

  | 'pending'
  | 'ready'
  | 'failed'

export type AISuggestionDTO={

  suggestion_id:string

  decision:AISuggestionDecisionDTO

  confidence:number

  content:string | null

  status:AISuggestionStatusDTO

  message_id:string | null

  created_at:string

  metadata?:{

    model?:string

    tokens?:number

  }

  signals?:{

    intent?:string

    urgency?:string

  }

}

export type AISuggestionListResponseDTO={

  suggestions:AISuggestionDTO[]

}


export type AIRunStateDTO =

 | 'running'
 | 'completed'
 | 'skipped'
 | 'failed'

export type AIRunDTO={

 agent_run_id:string

 state:AIRunStateDTO

 progress:number

 active:boolean

 updated_at:string

 stage?:string

 status?:string

}

export type AIRunListResponseDTO={

 runs:AIRunDTO[]

}