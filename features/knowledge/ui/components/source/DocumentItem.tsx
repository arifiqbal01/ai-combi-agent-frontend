'use client'

import { Surface, Inline, Text, Button, Icon } from '@/ui'
import { useArchiveDocument } from '@/features/knowledge/application/mutations/useArchiveDocument'
import { KnowledgeDocument } from '@/features/knowledge/domain/knowledge.types'
import { Trash2 } from 'lucide-react'

function extractTitle(content: string) {
  const firstLine = content.split('\n')[0]?.trim()
  return firstLine || 'Untitled'
}

function extractPreview(content: string) {
  const lines = content.split('\n').slice(1).join(' ').trim()
  return lines
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
    <Surface className="px-3 py-2 group hover:bg-muted/40 transition rounded-md">
      <Inline className="justify-between items-start gap-2">

        {/* TEXT */}
        <div
          className="cursor-pointer flex-1 min-w-0"
          onClick={() => onOpen(doc.id)}
        >
          <Text size="sm" weight="medium" className="line-clamp-1">
            {title}
          </Text>

          {preview && (
            <Text size="xs" tone="muted" className="line-clamp-1 mt-0.5">
              {preview}
            </Text>
          )}
        </div>

        {/* DELETE */}
        <div className="opacity-30 group-hover:opacity-100 transition shrink-0">
          <Button
            size="sm" // ✅ fixed
            variant="ghost"
            loading={archive.isPending}
            className="text-red-500 hover:text-red-600"
            onClick={(e) => {
              e.stopPropagation()

              if (!confirm('Delete this item?')) return

              archive.mutate({
                sourceId,
                documentId: doc.id,
              })
            }}
          >
            <Icon size="sm">
              <Trash2 />
            </Icon>
          </Button>
        </div>

      </Inline>
    </Surface>
  )
}