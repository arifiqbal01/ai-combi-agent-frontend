/* =========================
 application/keys/knowledge.keys.ts
========================= */

export const knowledgeKeys = {
 all: ['knowledge'] as const,

 sources: () => [...knowledgeKeys.all, 'sources'] as const,

 documents: (sourceId: string) =>
  [...knowledgeKeys.all, 'documents', sourceId] as const,

 document: (documentId: string) =>
  [...knowledgeKeys.all, 'document', documentId] as const,
}