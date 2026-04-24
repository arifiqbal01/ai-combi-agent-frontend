import { SourceDTO, DocumentDTO } from '../dto/knowledge.dto'

import {
 KnowledgeSource,
 KnowledgeStatus,
 KnowledgeSourceType,
 KnowledgeDocument,
} from '@/features/knowledge/domain/knowledge.types'

/* =========================
 source mapper
========================= */

export function mapSourceDTO(
 dto: SourceDTO
): KnowledgeSource {

 return {
  id: dto.id,
  status: dto.status as KnowledgeStatus,
  type: dto.type as KnowledgeSourceType,

  // ✅ backend now provides this
  documentCount: dto.document_count,
 }
}

/* =========================
 document mapper
========================= */

export function mapDocumentDTO(
 dto: DocumentDTO
): KnowledgeDocument {

 return {
  id: dto.id,
  sourceId: dto.source_id,
  version: dto.version,
  status: dto.status as KnowledgeStatus,

  // ✅ new
  preview: dto.preview,
  createdAt: dto.created_at,
 }
}