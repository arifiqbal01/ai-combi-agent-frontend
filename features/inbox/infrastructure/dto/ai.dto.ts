/* infrastructure/dto/ai.dto.ts */

/* =========================
   AI SUGGESTION
========================= */

export type AISuggestionDecisionDTO =
  | 'suggest'
  | 'auto_reply'
  | 'ignore'

export type AISuggestionStatusDTO =
  | 'pending'
  | 'ready'
  | 'failed'

export type AISuggestionDTO = {
  suggestion_id: string

  decision: AISuggestionDecisionDTO

  confidence: number

  content: string | null

  status: AISuggestionStatusDTO

  message_id: string | null

  created_at: string

  metadata?: {
    model?: string
    tokens?: number
  }

  signals?: {
    intent?: string
    urgency?: string
  }
}

export type AISuggestionListResponseDTO = {
  suggestions: AISuggestionDTO[]
}

/* =========================
   AI RUN
========================= */

export type AIRunStateDTO =
  | 'running'
  | 'completed'
  | 'skipped'
  | 'failed'

export type AIRunDTO = {
  agent_run_id: string

  state: AIRunStateDTO

  progress: number

  active: boolean

  updated_at: string

  /* backend debug fields (optional) */
  stage?: string
  status?: string
}

/* 🔥 IMPORTANT: backend returns LIST + SINGLE */
export type AIRunListResponseDTO = {
  runs: AIRunDTO[]
}

/* 🔥 ADD THIS (missing before) */
export type AIRunResponseDTO = AIRunDTO | null