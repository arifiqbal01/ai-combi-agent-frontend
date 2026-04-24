/* =========================
 SOURCE TYPE (backend aligned)
========================= */

export const KnowledgeSourceType = {
 GENERAL: 'general',
 FAQ: 'faq',
 POLICY: 'policy',
 WEBSITE: 'website',
 CONTACT_INFO: 'contact_info',
} as const

export type KnowledgeSourceType =
 typeof KnowledgeSourceType[keyof typeof KnowledgeSourceType]

/* =========================
 STATUS (backend EXACT)
========================= */

export const KnowledgeStatus = {
 PROCESSING: 'PROCESSING',
 ACTIVE: 'ACTIVE',
 INACTIVE: 'INACTIVE',
 ARCHIVED: 'ARCHIVED',
 FAILED: 'FAILED',
} as const

export type KnowledgeStatus =
 typeof KnowledgeStatus[keyof typeof KnowledgeStatus]

/* =========================
 SOURCE
========================= */

export type KnowledgeSource = {
 id: string
 status: KnowledgeStatus
 type: KnowledgeSourceType
 documentCount: number
}

/* =========================
 DOCUMENT
========================= */

export type KnowledgeDocument = {
 id: string
 sourceId: string
 version: string
 status: KnowledgeStatus
 preview?: string
 content?: string
 createdAt?: string
}