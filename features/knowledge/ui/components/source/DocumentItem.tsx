'use client'

import { Text, Button, Inline, Badge } from '@/ui'

import { useArchiveDocument } from '@/features/knowledge/application/mutations/useArchiveDocument'
import {
  useActivateDocument,
  useDeactivateDocument,
} from '@/features/knowledge/application/mutations'

import {
  KnowledgeDocument,
  KnowledgeStatus,
} from '@/features/knowledge/domain/knowledge.types'

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
  const activate = useActivateDocument()
  const deactivate = useDeactivateDocument()

  const isActive = doc.status === KnowledgeStatus.ACTIVE
  const isProcessing = doc.status === KnowledgeStatus.PROCESSING

  const baseContent = doc.content ?? doc.preview ?? ''
  const title = extractTitle(baseContent)
  const preview = extractPreview(baseContent)

  return (
    <div
      className={`
        px-3 py-2.5
        border-b border-border-subtle
        last:border-0
        transition
        ${isActive ? 'hover:bg-surface-hover' : 'opacity-60'}
      `}
    >
      <div
        className="flex items-start gap-2 cursor-pointer"
        onClick={() => onOpen(doc.id)}
      >
        <div className="flex-1 min-w-0">

          {/* TITLE + BADGE + ACTIONS */}
          <Inline className="justify-between gap-2">

            <Inline gap="xs" className="min-w-0">

              <Text size="sm" weight="medium" className="truncate">
                {title}
              </Text>

              {/* 🔥 STATUS BADGE */}
              {isProcessing ? (
                <Badge variant="warning">Processing</Badge>
              ) : (
                <Badge variant={isActive ? 'success' : 'default'}>
                  {isActive ? 'Active' : 'Inactive'}
                </Badge>
              )}

            </Inline>

            <Inline gap="xs" className="shrink-0">

              {/* ENABLE / DISABLE */}
              {!isProcessing && (
                isActive ? (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 text-xs"
                    onClick={(e) => {
                      e.stopPropagation()
                      deactivate.mutate({
                        sourceId,
                        documentId: doc.id,
                      })
                    }}
                    loading={deactivate.isPending}
                  >
                    Disable
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant="secondary"
                    className="h-7 text-xs"
                    onClick={(e) => {
                      e.stopPropagation()
                      activate.mutate({
                        sourceId,
                        documentId: doc.id,
                      })
                    }}
                    loading={activate.isPending}
                  >
                    Enable
                  </Button>
                )
              )}

              {/* DELETE */}
              <button
                onClick={(e) => {
                  e.stopPropagation()

                  if (isProcessing) return // 🔥 block delete during processing

                  if (!confirm('Delete this item?')) return

                  archive.mutate({
                    sourceId,
                    documentId: doc.id,
                  })
                }}
                className={`
                  text-muted transition-colors
                  ${isProcessing ? 'opacity-40 cursor-not-allowed' : 'hover:text-red-500'}
                `}
              >
                <Trash2 size={16} />
              </button>

            </Inline>

          </Inline>

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