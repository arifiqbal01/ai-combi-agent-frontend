import {
  ToneStyle,
  ToneFormality,
  ToneVerbosity,
  ToneLanguage,
} from '../../domain/ai.types'

/* -----------------------------
   Tone
----------------------------- */
export type ToneDTO = {
  style: ToneStyle
  formality: ToneFormality
  verbosity: ToneVerbosity
  language: ToneLanguage
}

/* -----------------------------
   Capabilities
----------------------------- */
export type CapabilitiesDTO = {
  suggestion: boolean
  auto_reply: boolean
}

/* -----------------------------
   Signature
----------------------------- */
export type SignatureDTO = {
  enabled: boolean
  strip_ai_signature: boolean
  template?: string
  company_name?: string
  support_email?: string
  website?: string
}

/* -----------------------------
   Agent Config (READ - STRONG)
----------------------------- */
export type AgentConfigDTO = {
  tone: ToneDTO
  capabilities: CapabilitiesDTO
  auto_reply_threshold: number
  signature: SignatureDTO
}

/* -----------------------------
   Agent DTO (READ)
----------------------------- */
export type AgentDTO = {
  id: string
  name: string
  description?: string | null

  enabled: boolean
  is_default: boolean

  config: AgentConfigDTO

  created_at: string
  updated_at?: string | null
}

/* -----------------------------
   Create Agent (WRITE)
----------------------------- */
export type CreateAgentDTO = {
  name: string
  description?: string

  config: {
    tone: ToneDTO
    capabilities: CapabilitiesDTO
    auto_reply_threshold?: number
    signature?: SignatureDTO
  }

  is_default?: boolean
}

/* -----------------------------
   Simple status (enable/disable)
----------------------------- */
export type AgentStatusDTO = {
  status: 'enabled' | 'disabled'
}

/* -----------------------------
   Update Config (PATCH)
----------------------------- */
export type UpdateAgentConfigDTO = {
  tone?: Partial<ToneDTO>
  capabilities?: Partial<CapabilitiesDTO>
  auto_reply_threshold?: number
  signature?: Partial<SignatureDTO>
}

/* -----------------------------
   Update Config Response
----------------------------- */
export type UpdateAgentConfigResponseDTO = {
  status: 'updated' | 'no_changes'
}

/* -----------------------------
   Suggestion Preview
----------------------------- */
export type SuggestionPreviewDTO = {
  id: string
  content: string
  confidence: number
  decision: 'suggest' | 'auto_reply'
}

/* -----------------------------
   Agent Run Progress
----------------------------- */
export type AgentRunProgressDTO = {
  run_id: string

  status: string
  stage: string
  progress: number

  started_at: string
  updated_at?: string | null
  finished_at?: string | null

  is_final: boolean
  is_auto_reply: boolean

  suggestion?: SuggestionPreviewDTO | null
}