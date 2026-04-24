/* =========================
 domain/knowledge.entity.ts
========================= */

import {
 KnowledgeSource,
 KnowledgeStatus,
} from './knowledge.types'

/* =========================
 SOURCE STATE TRANSITIONS
========================= */

export function activateSource(
 source: KnowledgeSource
): KnowledgeSource {
 return {
  ...source,
  status: KnowledgeStatus.ACTIVE,
 }
}

export function deactivateSource(
 source: KnowledgeSource
): KnowledgeSource {
 return {
  ...source,
  status: KnowledgeStatus.INACTIVE,
 }
}

export function archiveSource(
 source: KnowledgeSource
): KnowledgeSource {
 return {
  ...source,
  status: KnowledgeStatus.ARCHIVED,
 }
}