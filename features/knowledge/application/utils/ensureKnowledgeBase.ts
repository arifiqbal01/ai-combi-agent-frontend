import { knowledgeApi } from '@/features/knowledge/infrastructure/api/knowledge.api'

export async function ensureKnowledgeBase() {
  try {
    await knowledgeApi.createBase()
  } catch (e: any) {
    if (e?.response?.data?.error !== 'already_exists') {
      throw e
    }
  }
}