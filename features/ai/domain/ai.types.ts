import { AGENT_STATUS } from './ai.constants'
import {
  TONE_STYLE,
  TONE_FORMALITY,
  TONE_VERBOSITY,
  TONE_LANGUAGE,
} from './ai.constants'

/* -----------------------------
   Status
----------------------------- */
export type AgentStatus =
  (typeof AGENT_STATUS)[keyof typeof AGENT_STATUS]

/* -----------------------------
   Tone
----------------------------- */
export type ToneStyle =
  (typeof TONE_STYLE)[keyof typeof TONE_STYLE]

export type ToneFormality =
  (typeof TONE_FORMALITY)[keyof typeof TONE_FORMALITY]

export type ToneVerbosity =
  (typeof TONE_VERBOSITY)[keyof typeof TONE_VERBOSITY]

export type ToneLanguage =
  (typeof TONE_LANGUAGE)[keyof typeof TONE_LANGUAGE]

export type Tone = {
  style: ToneStyle
  formality: ToneFormality
  verbosity: ToneVerbosity
  language: ToneLanguage
}

/* -----------------------------
   Capabilities (Domain = camelCase)
----------------------------- */
export type Capabilities = {
  suggestion: boolean
  autoReply: boolean
}

/* -----------------------------
   Signature (Domain = camelCase)
----------------------------- */
export type Signature = {
  enabled: boolean
  stripAiSignature: boolean
  template?: string
  companyName?: string
  supportEmail?: string
  website?: string
}

/* -----------------------------
   Agent Config (STRONG)
----------------------------- */
export type AgentConfig = {
  tone: Tone
  capabilities: Capabilities
  autoReplyThreshold: number
  signature: Signature
}

/* -----------------------------
   Agent (CLEAN)
----------------------------- */
export type Agent = {
  id: string

  name: string
  description?: string

  isDefault: boolean

  status: AgentStatus
  isActive: boolean

  createdAt: string
  updatedAt?: string

  config: AgentConfig // ✅ REQUIRED
}