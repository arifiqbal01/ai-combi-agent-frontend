import { apiClient } from '@/infra/api/client'

import {
  SourceDTO,
  DocumentDTO,
  DocumentDetailDTO,
  RebuildSnapshotResponseDTO,
} from '../dto/knowledge.dto'

// 🔥 Base WITHOUT trailing slash
const BASE = '/knowledge'

// 🔥 Base resource (matches backend router prefix="/base")
const BASE_RESOURCE = `${BASE}/base`

// 🔥 Same helper as channels
function joinUrl(...parts: string[]) {
  return (
    '/' +
    parts
      .map(p => p.replace(/^\/|\/$/g, ''))
      .join('/')
  )
}

export const knowledgeApi = {
  /* =========================
     KNOWLEDGE BASE
  ========================= */

  // ✅ backend expects: POST /knowledge/base/
  createBase() {
    return apiClient.post<{ id: string }>(
      `${BASE_RESOURCE}/`,
      undefined as unknown as void
    )
  },

  /* =========================
     SOURCES
  ========================= */

  // ✅ backend expects trailing slash
  listSources() {
    return apiClient.get<SourceDTO[]>(
      `${BASE}/sources/`
    )
  },

  // ✅ backend expects trailing slash
  addSource(sourceType: string) {
    return apiClient.post<SourceDTO>(
      `${BASE}/sources/`,
      { source_type: sourceType }
    )
  },

  // ❌ NO trailing slash
  activateSource(id: string) {
    return apiClient.post<void>(
      joinUrl(BASE, 'sources', id, 'activate'),
      undefined as unknown as void
    )
  },

  // ❌ NO trailing slash
  deactivateSource(id: string) {
    return apiClient.post<void>(
      joinUrl(BASE, 'sources', id, 'deactivate'),
      undefined as unknown as void
    )
  },

  // ❌ NO trailing slash
  archiveSource(id: string) {
    return apiClient.post<void>(
      joinUrl(BASE, 'sources', id, 'archive'),
      undefined as unknown as void
    )
  },

  /* =========================
     DOCUMENTS
  ========================= */

  // ✅ backend expects trailing slash
  listDocuments(sourceId: string) {
    return apiClient.get<DocumentDTO[]>(
      `${BASE}/documents/${sourceId}/`
    )
  },

  // ✅ backend expects trailing slash
  getDocument(sourceId: string, documentId: string) {
    return apiClient.get<DocumentDetailDTO>(
      `${BASE}/documents/${sourceId}/${documentId}/`
    )
  },

  // ❌ NO trailing slash
  archiveDocument(sourceId: string, documentId: string) {
    return apiClient.post<void>(
      joinUrl(BASE, 'documents', sourceId, documentId, 'archive'),
      undefined as unknown as void
    )
  },

  // ✅ backend expects trailing slash
  uploadDocument(sourceId: string, content: string) {
    return apiClient.post<DocumentDetailDTO>(
      `${BASE}/documents/${sourceId}/`,
      { content }
    )
  },

    /* =========================
       DOCUMENT STATE
    ========================= */

    // ❌ NO trailing slash
    activateDocument(sourceId: string, documentId: string) {
      return apiClient.post<{ status: string }>(
        joinUrl(BASE, 'documents', sourceId, documentId, 'activate'),
        undefined as unknown as void
      )
    },

    // ❌ NO trailing slash
    deactivateDocument(sourceId: string, documentId: string) {
      return apiClient.post<{ status: string }>(
        joinUrl(BASE, 'documents', sourceId, documentId, 'deactivate'),
        undefined as unknown as void
      )
    },

    /* =========================
       SNAPSHOT
    ========================= */

    rebuildSnapshot() {
      return apiClient.post<RebuildSnapshotResponseDTO>(
        `${BASE}/snapshot/rebuild`,
        undefined as unknown as void
      )
    },
}