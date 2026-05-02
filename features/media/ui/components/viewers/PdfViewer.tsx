/**
 * ⚠️ CRITICAL: DO NOT MODIFY URL STABILIZATION LOGIC
 *
 * This component intentionally "locks" the media URL using useRef.
 *
 * WHY:
 * - useMediaUrl can return new/temporary URLs (signed URLs, re-fetches)
 * - PDF/video viewers are stateful and will RELOAD if URL changes
 * - Reloading causes flicker, blank screen, or viewer disappearing
 *
 * WHAT THIS DOES:
 * - Stores the FIRST valid URL per media.id
 * - Prevents re-render loops and viewer resets
 * - Resets ONLY when media.id changes
 *
 * IMPORTANT RULES:
 * ❌ Do NOT use `url` directly in render
 * ❌ Do NOT use `key={url}` anywhere
 * ❌ Do NOT cache in multiple places (single source of truth here)
 * ❌ Do NOT remove the `useEffect([media.id])` reset
 *
 * If changed, PDFs will flicker or disappear again.
 */


'use client'

import { memo, useRef, useState, useEffect } from 'react'
import { Worker, Viewer, SpecialZoomLevel } from '@react-pdf-viewer/core'
import { zoomPlugin } from '@react-pdf-viewer/zoom'

import '@react-pdf-viewer/core/lib/styles/index.css'

type Props = {
  url: string
}

export const PdfViewer = memo(function PdfViewer({ url }: Props) {
  const zoomPluginRef = useRef(zoomPlugin())
  const zoomPluginInstance = zoomPluginRef.current

  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(false)
  }, [url])

  const isMobile =
    typeof window !== 'undefined' && window.innerWidth < 768

  if (!url) return null

  return (
    <div className="relative w-full h-[100dvh] bg-white">

      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center text-sm text-text-muted">
          Loading document...
        </div>
      )}

      <Worker workerUrl="/pdf.worker.min.js">
        <Viewer
          key={url}
          fileUrl={url}
          plugins={[zoomPluginInstance]}
          defaultScale={
            isMobile
              ? SpecialZoomLevel.PageWidth
              : SpecialZoomLevel.PageFit
          }
          onDocumentLoad={() => setLoaded(true)}
        />
      </Worker>
    </div>
  )
})