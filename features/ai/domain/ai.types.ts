import { AGENT_STATUS } from './ai.constants'

export type AgentStatus =
  (typeof AGENT_STATUS)[keyof typeof AGENT_STATUS]

export type Agent = {
  id: string

  name: string
  description?: string

  isDefault: boolean
  maxRunsPerMinute: number

  status: AgentStatus

  createdAt: string
  updatedAt?: string

  // derived
  isActive: boolean
}


import {
  TONE_STYLE,
  TONE_FORMALITY,
  TONE_VERBOSITY,
  TONE_LANGUAGE,
} from './ai.constants'

export type ToneStyle =
  (typeof TONE_STYLE)[keyof typeof TONE_STYLE]

export type ToneFormality =
  (typeof TONE_FORMALITY)[keyof typeof TONE_FORMALITY]

export type ToneVerbosity =
  (typeof TONE_VERBOSITY)[keyof typeof TONE_VERBOSITY]

export type ToneLanguage =
  (typeof TONE_LANGUAGE)[keyof typeof TONE_LANGUAGE]