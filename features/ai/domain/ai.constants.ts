export const AGENT_STATUS = {
  ENABLED: 'enabled',
  DISABLED: 'disabled',
  UNKNOWN: 'unknown',
} as const

export const TONE_STYLE = {
  DIRECT: 'direct',
  FRIENDLY: 'friendly',
  FORMAL: 'formal',
} as const

export const TONE_FORMALITY = {
  PROFESSIONAL: 'professional',
  CASUAL: 'casual',
} as const

export const TONE_VERBOSITY = {
  CONCISE: 'concise',
  BALANCED: 'balanced',
  DETAILED: 'detailed',
} as const

export const TONE_LANGUAGE = {
  ENGLISH: 'en',
  DUTCH: 'nl',
} as const

/* -----------------------------
   Agent Run Status
----------------------------- */
export const AGENT_RUN_STATUS = {
  QUEUED: 'queued',
  RUNNING: 'running',
  COMPLETED: 'completed',
  FAILED: 'failed',
} as const

/* -----------------------------
   Agent Run Stage
----------------------------- */
export const AGENT_RUN_STAGE = {
  INIT: 'init',
  RETRIEVAL: 'retrieval',
  GENERATION: 'generation',
  FINALIZING: 'finalizing',
} as const

/* -----------------------------
   Suggestion Decision
----------------------------- */
export const SUGGESTION_DECISION = {
  SUGGEST: 'suggest',
  AUTO_REPLY: 'auto_reply',
} as const