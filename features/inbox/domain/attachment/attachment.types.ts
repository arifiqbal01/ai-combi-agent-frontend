export const AttachmentKind = {

 FILE:'file',

 IMAGE:'image',

 VIDEO:'video',

 AUDIO:'audio',

 PDF:'pdf'

} as const

export type AttachmentKind =
 typeof AttachmentKind[
  keyof typeof AttachmentKind
 ]

export type Attachment = {
  id: string
  fileName: string
  mimeType: string
  fileSize: number
  kind: AttachmentKind
  icon: string

  storageKey?: string
  localPreviewUrl?: string
}