'use client'

import dynamic from 'next/dynamic'

import { Media } from '../../domain/media.types'
import { MediaAdapter } from './media.adapter'
import { MediaIcon } from '@/features/media/ui/components/base/media.icon'

/* ----------------------------------------
   Dynamic PDF Viewer
---------------------------------------- */
const PdfViewer = dynamic(
  () =>
    import('@/features/media/ui/components/viewers/PdfViewer').then(
      (m) => m.PdfViewer
    ),
  { ssr: false }
)

/* ----------------------------------------
   Helpers
---------------------------------------- */
function getFileType(name?: string) {
  if (!name) return 'FILE'
  const ext = name.split('.').pop()?.toLowerCase()
  return ext ? ext.toUpperCase() : 'FILE'
}

function isPdf(media: Media) {
  if (media.mimeType === 'application/pdf') return true
  const ext = media.fileName?.split('.').pop()?.toLowerCase()
  return ext === 'pdf'
}

/* ----------------------------------------
   Adapter
---------------------------------------- */
export const documentAdapter: MediaAdapter = {
  type: 'document',

  canHandle: (media: Media) =>
    media.type === 'document',

  /* -----------------------------
     PREVIEW
  ----------------------------- */
  renderPreview: (media: Media) => {
    const fileType = getFileType(media.fileName)

    return (
      <div
        className="
          flex items-center gap-3
          px-3 py-2.5
          rounded-lg
          border border-border-subtle
          bg-bg-surface
          hover:bg-bg-muted
          transition
        "
      >
        {/* ICON */}
        <div
          className="
            flex items-center justify-center
            w-10 h-10
            rounded-md
            bg-bg-muted
            border border-border-subtle
          "
        >
          <MediaIcon media={media} size="sm" />
        </div>

        {/* CONTENT */}
        <div className="flex flex-col min-w-0 flex-1">
          <span className="text-sm font-medium truncate">
            {media.fileName || 'Document'}
          </span>

          <span className="text-xs text-text-muted">
            {fileType} Document
          </span>
        </div>

        {/* BADGE */}
        <div
          className="
            text-[10px]
            px-2 py-1
            rounded
            bg-bg-muted
            border border-border-subtle
            text-text-muted
            uppercase
          "
        >
          {fileType}
        </div>
      </div>
    )
  },

  /* -----------------------------
     FULL VIEW (PDF ONLY)
  ----------------------------- */
  renderFull: (media: Media, ctx) => {
  if (!ctx?.url) return null

  if (isPdf(media)) {
    return (
      <div className="w-full h-full bg-bg-muted">
        <PdfViewer url={ctx.url} />
      </div>
    )
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 text-center px-4">
      <MediaIcon media={media} size="lg" />

      <div className="text-sm text-text-muted">
        Preview not supported yet
      </div>

      <a
        href={ctx.url}
        target="_blank"
        rel="noopener noreferrer"
        className="
          px-3 py-2
          rounded-md
          bg-bg-surface
          border border-border-subtle
          text-sm
          hover:bg-bg-muted
        "
      >
        Open / Download
      </a>
    </div>
  )
},
}