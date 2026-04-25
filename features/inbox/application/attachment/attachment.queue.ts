import { Attachment } from '@/features/inbox/domain/attachment/attachment.types'

export const UploadStatus = {
  PENDING: 'pending',
  UPLOADING: 'uploading',
  DONE: 'done',
  FAILED: 'failed'
} as const

export type UploadStatus =
  typeof UploadStatus[keyof typeof UploadStatus]

export type UploadQueueItem = {
  id: string
  file: File
  status: UploadStatus
  progress: number
  attachment?: Attachment
  error?: string
}

export function createQueueItem(
  file: File
): UploadQueueItem {

  return {
    id: crypto.randomUUID(),
    file,
    status: UploadStatus.PENDING,
    progress: 0
  }
}

export function markUploading(
  queue: UploadQueueItem[],
  id: string
): UploadQueueItem[] {

  return queue.map(item =>
    item.id === id
      ? {
          ...item,
          status: UploadStatus.UPLOADING
        }
      : item
  )
}

export function markDone(
  queue: UploadQueueItem[],
  id: string,
  attachment: Attachment
): UploadQueueItem[] {

  return queue.map(item =>
    item.id === id
      ? {
          ...item,
          status: UploadStatus.DONE,
          progress: 100,
          attachment
        }
      : item
  )
}

export function markFailed(
  queue: UploadQueueItem[],
  id: string
): UploadQueueItem[] {

  return queue.map(item =>
    item.id === id
      ? {
          ...item,
          status: UploadStatus.FAILED,
          error: 'Upload failed'
        }
      : item
  )
}

export function removeQueueItem(
  queue: UploadQueueItem[],
  id: string
): UploadQueueItem[] {

  return queue.filter(item => item.id !== id)
}