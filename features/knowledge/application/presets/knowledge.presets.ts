/* =========================
 application/presets/knowledge.presets.ts
========================= */

export const KnowledgePresetType = {
 TEXT: 'text',
 FAQ: 'faq',
 COMPANY: 'company',
 NOTES: 'notes',
} as const

export type KnowledgePresetType =
 typeof KnowledgePresetType[
  keyof typeof KnowledgePresetType
 ]

export type KnowledgePresetConfig = {
 type: KnowledgePresetType
 label: string
 description: string
}

export const KNOWLEDGE_PRESETS: KnowledgePresetConfig[] = [
 {
  type: KnowledgePresetType.TEXT,
  label: 'Custom Text',
  description: 'Add free-form knowledge content',
 },
 {
  type: KnowledgePresetType.FAQ,
  label: 'FAQs',
  description: 'Add questions and answers',
 },
 {
  type: KnowledgePresetType.COMPANY,
  label: 'Company Info',
  description: 'Describe your business',
 },
 {
  type: KnowledgePresetType.NOTES,
  label: 'Notes',
  description: 'Internal notes or instructions',
 },
]