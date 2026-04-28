import {
  ToneStyle,
  ToneFormality,
  ToneVerbosity,
  ToneLanguage,
} from '../../domain/ai.types'


export type AgentDTO = {
  id: string
  name: string
  description?: string | null

  enabled: boolean
  is_default: boolean

  max_runs_per_minute: number

  created_at: string
  updated_at?: string | null
}

/* -----------------------------
   Create
----------------------------- */
export type CreateAgentDTO = {
  name: string
  description?: string
  config: Record<string, unknown>

  is_default?: boolean
  max_runs_per_minute?: number
}

/* -----------------------------
   Simple status (enable/disable)
----------------------------- */
export type AgentStatusDTO = {
  status: 'enabled' | 'disabled'
}

export type ToneDTO = {
  style?: ToneStyle
  formality?: ToneFormality
  verbosity?: ToneVerbosity
  language?: ToneLanguage
}

export type UpdateAgentConfigDTO = {
  tone?: ToneDTO
}

export type UpdateAgentConfigResponseDTO = {
  status: 'updated'
}