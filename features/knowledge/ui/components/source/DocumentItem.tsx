'use client'

import { Text } from '@/ui'
import { useArchiveDocument } from '@/features/knowledge/application/mutations/useArchiveDocument'
import { KnowledgeDocument } from '@/features/knowledge/domain/knowledge.types'
import { Trash2 } from 'lucide-react'

function extractTitle(content: string) {
  const firstLine = content.split('\n')[0]?.trim()
  return firstLine ? firstLine.slice(0, 60) : 'Untitled'
}

function extractPreview(content: string) {
  const lines = content.split('\n').slice(1).join(' ').trim()
  return lines.slice(0, 100)
}

export function DocumentItem({
  doc,
  sourceId,
  onOpen,
}: {
  doc: KnowledgeDocument
  sourceId: string
  onOpen: (id: string) => void
}) {
  const archive = useArchiveDocument()

  const baseContent = doc.content ?? doc.preview ?? ''
  const title = extractTitle(baseContent)
  const preview = extractPreview(baseContent)

  return (
    <div
      className="
        px-3 py-2.5
        border-b border-border-subtle
        last:border-0
        hover:bg-surface-hover
        transition
      "
    >
      <div
        className="flex items-start gap-2 cursor-pointer"
        onClick={() => onOpen(doc.id)}
      >
        {/* TEXT */}
        <div className="flex-1 min-w-0">

          {/* TITLE ROW */}
          <div className="flex items-center justify-between gap-2">
            <Text size="sm" weight="medium" className="truncate">
              {title}
            </Text>

            {/* DELETE */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                if (!confirm('Delete this item?')) return

                archive.mutate({
                  sourceId,
                  documentId: doc.id,
                })
              }}
              className="
                text-muted hover:text-red-500
                transition-colors
                shrink-0
              "
            >
              <Trash2 size={16} />
            </button>
          </div>

          {/* PREVIEW */}
          {preview && (
            <Text
              size="xs"
              tone="muted"
              className="truncate mt-0.5"
            >
              {preview}
            </Text>
          )}
        </div>
      </div>
    </div>
  )
}