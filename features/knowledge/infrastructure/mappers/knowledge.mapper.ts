import {
  SourceDTO,
  DocumentDTO,
  DocumentDetailDTO,
} from '../dto/knowledge.dto'

import {
  KnowledgeSource,
  KnowledgeStatus,
  KnowledgeSourceType,
  KnowledgeDocument,
} from '@/features/knowledge/domain/knowledge.types'

/* =========================
 STATUS MAPPER (CRITICAL)
========================= */

function mapStatus(status: string): KnowledgeStatus {
  switch (status.toLowerCase()) {
    case 'active':
      return KnowledgeStatus.ACTIVE
    case 'inactive':
      return KnowledgeStatus.INACTIVE
    case 'processing':
      return KnowledgeStatus.PROCESSING
    case 'archived':
      return KnowledgeStatus.ARCHIVED
    case 'failed':
      return KnowledgeStatus.FAILED
    default:
      return KnowledgeStatus.PROCESSING
  }
}

/* =========================
 TYPE MAPPER
========================= */

function mapSourceType(type: string): KnowledgeSourceType {
  switch (type) {
    case 'general':
      return KnowledgeSourceType.GENERAL
    case 'faq':
      return KnowledgeSourceType.FAQ
    case 'policy':
      return KnowledgeSourceType.POLICY
    case 'website':
      return KnowledgeSourceType.WEBSITE
    case 'contact_info':
      return KnowledgeSourceType.CONTACT_INFO
    default:
      return KnowledgeSourceType.GENERAL
  }
}

/* =========================
 SOURCE
========================= */

export function mapSourceDTO(dto: SourceDTO): KnowledgeSource {
  return {
    id: dto.id,
    status: mapStatus(dto.status),
    type: mapSourceType(dto.type),
    documentCount: dto.document_count ?? 0,

    createdAt: (dto as any).created_at,
    updatedAt: (dto as any).updated_at,
  }
}

/* =========================
 DOCUMENT (LIST)
========================= */

export function mapDocumentDTO(dto: DocumentDTO): KnowledgeDocument {
  return {
    id: dto.id,
    sourceId: dto.source_id,
    version: dto.version,
    status: mapStatus(dto.status),
    preview: dto.preview,
    createdAt: dto.created_at,
  }
}

/* =========================
 DOCUMENT (DETAIL)
========================= */

export function mapDocumentDetailDTO(
  dto: DocumentDetailDTO
): KnowledgeDocument {
  return {
    id: dto.id,
    sourceId: dto.source_id,
    version: dto.version,
    status: mapStatus(dto.status),
    content: dto.content,
  }
}