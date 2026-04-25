import { apiClient } from '@/infra/api/client'

import {
  SourceDTO,
  DocumentDTO,
  DocumentDetailDTO
} from '../dto/knowledge.dto'

const BASE = '/knowledge'

/* =========================
 sources
========================= */

export function listSources(): Promise<SourceDTO[]> {
  return apiClient.get<SourceDTO[]>(
    `${BASE}/sources/`
  )
}

export function addSource(
  sourceType: string
): Promise<SourceDTO> {

  return apiClient.post<SourceDTO>(
    `${BASE}/sources/`,
    { source_type: sourceType }
  )
}

export function activateSource(
  id: string
): Promise<void> {

  return apiClient.post<void>(
    `${BASE}/sources/${id}/activate/`
  )
}

export function deactivateSource(
  id: string
): Promise<void> {

  return apiClient.post<void>(
    `${BASE}/sources/${id}/deactivate/`
  )
}

export function archiveSource(
  id: string
): Promise<void> {

  return apiClient.post<void>(
    `${BASE}/sources/${id}/archive`,
    {}
  )
}

/* =========================
 documents
========================= */

export function listDocuments(
  sourceId: string
): Promise<DocumentDTO[]> {

  return apiClient.get<DocumentDTO[]>(
    `${BASE}/documents/${sourceId}/`
  )
}

export function getDocument(
  sourceId: string,
  documentId: string
): Promise<DocumentDetailDTO> {

  return apiClient.get<DocumentDetailDTO>(
    `${BASE}/documents/${sourceId}/${documentId}/`
  )
}

export function archiveDocument(
  sourceId: string,
  documentId: string
): Promise<void> {

  return apiClient.post<void>(
    `${BASE}/documents/${sourceId}/${documentId}/archive`,
    {}
  )
}

export function uploadDocument(
  sourceId: string,
  content: string
): Promise<DocumentDetailDTO> {

  return apiClient.post<DocumentDetailDTO>(
    `${BASE}/documents/${sourceId}/`,
    { content }
  )
}