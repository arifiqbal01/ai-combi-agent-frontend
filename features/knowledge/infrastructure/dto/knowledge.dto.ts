/* =========================
   SOURCE
========================= */

export type SourceDTO = {
 id: string
 status: string
 type: string
 document_count?: number // ✅ new
}

/* =========================
   DOCUMENT (LIST)
========================= */

export type DocumentDTO = {
 id: string
 source_id: string
 version: string
 status: string
 preview?: string // ✅ new
 created_at: string
}

/* =========================
   DOCUMENT (DETAIL)
========================= */

export type DocumentDetailDTO = {
 id: string
 source_id: string
 version: string
 status: string
 content: string
}