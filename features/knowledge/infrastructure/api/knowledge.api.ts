import { apiClient } from '@/infra/api/client'

const BASE = '/knowledge'

/* =========================
 sources
========================= */

export function listSources() {
 return apiClient.get(`${BASE}/sources/`)
}

export function addSource(sourceType: string) {
 return apiClient.post(`${BASE}/sources/`, {
  source_type: sourceType,
 })
}

export function activateSource(id: string) {
 return apiClient.post(`${BASE}/sources/${id}/activate/`)
}

export function deactivateSource(id: string) {
 return apiClient.post(`${BASE}/sources/${id}/deactivate/`)
}

export async function archiveSource(id: string) {
 return apiClient.post(
  `/knowledge/sources/${id}/archive`,
  {}
 )
}

/* =========================
 documents
========================= */

export function listDocuments(sourceId: string) {
 return apiClient.get(
  `${BASE}/documents/${sourceId}/`
 )
}

export function getDocument(
 sourceId: string,
 documentId: string
) {
 return apiClient.get(
  `${BASE}/documents/${sourceId}/${documentId}/`
 )
}

export function archiveDocument(
 sourceId: string,
 documentId: string
) {
 return apiClient.post(
  `${BASE}/documents/${sourceId}/${documentId}/archive`,
  {}
 )
}

export function uploadDocument(
 sourceId: string,
 content: string
) {
 return apiClient.post(
  `${BASE}/documents/${sourceId}/`,
  { content }
 )
}