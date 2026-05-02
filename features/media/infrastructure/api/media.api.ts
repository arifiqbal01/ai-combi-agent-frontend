import { buildApiUrl } from '@/infra/api/config'

export const mediaApi = {
  getDownloadUrl(storageKey: string): Promise<string> {
      return Promise.resolve(
        buildApiUrl(`/media/local-download/${encodeURIComponent(storageKey)}`)
      )
  },
}