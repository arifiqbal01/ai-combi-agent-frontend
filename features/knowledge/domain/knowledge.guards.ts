/* =========================
 domain/knowledge.guards.ts
========================= */

import {
 KnowledgeSource,
 KnowledgeStatus,
 KnowledgeDocument,
} from './knowledge.types'

/* =========================
 SOURCE
========================= */

export function isSourceActive(
 source: KnowledgeSource
): boolean {
 return source.status === KnowledgeStatus.ACTIVE
}

export function isSourceProcessing(
 source: KnowledgeSource
): boolean {
 return source.status === KnowledgeStatus.PROCESSING
}

export function isSourceArchived(
 source: KnowledgeSource
): boolean {
 return source.status === KnowledgeStatus.ARCHIVED
}

/* =========================
 DOCUMENT
========================= */

export function isDocumentProcessing(
 doc: KnowledgeDocument
): boolean {
 return doc.status === KnowledgeStatus.PROCESSING
}

export function isDocumentFailed(
 doc: KnowledgeDocument
): boolean {
 return doc.status === KnowledgeStatus.FAILED
}