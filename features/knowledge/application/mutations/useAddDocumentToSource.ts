/* =========================
 application/mutations/useAddDocumentToSource.ts
========================= */

import { useUploadDocument } from './useUploadDocument'

export function useAddDocumentToSource() {
 const upload = useUploadDocument()

 return {
  addDocument: upload.mutateAsync,
  isAdding: upload.isPending,
 }
}