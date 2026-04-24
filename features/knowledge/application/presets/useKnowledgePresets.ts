/* =========================
 application/presets/useKnowledgePresets.ts
========================= */

import { useAddSource } from '../mutations/useAddSource'
import { useUploadDocument } from '../mutations/useUploadDocument'

import { KnowledgeSourceType } from '@/features/knowledge/domain/knowledge.types'

type FAQ = { q: string; a: string }

export function useKnowledgePresets() {
 const addSource = useAddSource()
 const upload = useUploadDocument()

/* =========================
 HELPERS
========================= */

 function formatFAQ(faq: FAQ): string {
  return `Q: ${faq.q}\nA: ${faq.a}`
 }

/* =========================
 TEXT PRESET
========================= */

 async function createTextPreset(content: string) {
  if (!content.trim()) return

  const source = await addSource.mutateAsync(
   KnowledgeSourceType.GENERAL
  )

  await upload.mutateAsync({
   sourceId: source.id,
   content,
  })

  return source
 }

/* =========================
 FAQ PRESET
========================= */

 async function createFAQPreset(faqs: FAQ[]) {
  if (!faqs.length) return

  const source = await addSource.mutateAsync(
   KnowledgeSourceType.FAQ
  )

  await Promise.all(
   faqs.map(faq =>
    upload.mutateAsync({
     sourceId: source.id,
     content: formatFAQ(faq),
    })
   )
  )

  return source
 }

/* =========================
 COMPANY PRESET
========================= */

 async function createCompanyPreset(data: {
  about: string
  services?: string
  tone?: string
 }) {
  if (!data.about.trim()) return

  const source = await addSource.mutateAsync(
   KnowledgeSourceType.CONTACT_INFO
  )

  const docs = [
   data.about && `About:\n${data.about}`,
   data.services && `Services:\n${data.services}`,
   data.tone && `Tone:\n${data.tone}`,
  ].filter(Boolean) as string[]

  await Promise.all(
   docs.map(content =>
    upload.mutateAsync({
     sourceId: source.id,
     content,
    })
   )
  )

  return source
 }

 return {
  createTextPreset,
  createFAQPreset,
  createCompanyPreset,

  isCreating:
   addSource.isPending || upload.isPending,
 }
}