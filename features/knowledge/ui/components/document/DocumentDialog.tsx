'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  Text,
} from '@/ui'

import { useDocument } from '@/features/knowledge/application/queries/useDocument'
import { KnowledgeStatus } from '@/features/knowledge/domain/knowledge.types'

function parseContent(content: string) {
  if (!content) {
    return {
      title: 'Knowledge',
      body: '',
    }
  }

  const lines = content.split('\n')

  const firstLine = lines[0]?.trim()
  const secondLine = lines[1]?.trim()

  const hasTitleStructure = firstLine && secondLine === ''

  if (hasTitleStructure) {
    return {
      title: firstLine,
      body: lines.slice(2).join('\n').trim(),
    }
  }

  const MAX = 80
  let fallbackTitle = firstLine || 'Knowledge'

  if (fallbackTitle.length > MAX) {
    fallbackTitle = fallbackTitle.slice(0, MAX).trim() + '...'
  }

  return {
    title: fallbackTitle,
    body: content,
  }
}

function formatParagraphs(content: string) {
  return content
    .replace(/\n{2,}/g, '\n\n')
    .split('\n\n')
    .map(p => p.trim())
    .filter(Boolean)
}

export function DocumentDialog({
  sourceId,
  documentId,
  open,
  onClose,
}: {
  sourceId: string
  documentId?: string
  open: boolean
  onClose: () => void
}) {
  const { data, isLoading } =
    useDocument(sourceId, documentId)

  if (data?.status === KnowledgeStatus.ARCHIVED) {
    return null
  }

  const { title, body } =
    parseContent(data?.content ?? '')

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) onClose()
      }}
    >
      <DialogContent
        className="max-w-2xl w-full relative rounded-xl p-6"
        onPointerDownOutside={onClose}
        onEscapeKeyDown={onClose}
      >

        <DialogClose asChild>
          <button className="absolute right-5 top-5 text-lg opacity-70 hover:opacity-100">
            ✕
          </button>
        </DialogClose>

        {data && (
         <DialogHeader className="mb-4 pb-3 border-b">
          <DialogTitle className="text-lg font-semibold leading-snug">
            {isLoading
              ? 'Loading...'
              : data
              ? title
              : 'Document'}
          </DialogTitle>
        </DialogHeader>
        )}

        <div className="max-h-[65vh] overflow-y-auto pr-1">

          {isLoading && (
            <Text size="sm" tone="muted">
              Loading...
            </Text>
          )}

          {!isLoading && !data && (
            <Text size="sm" tone="muted">
              Not found
            </Text>
          )}

          {!isLoading && data && (
            <div className="mt-2 space-y-4 text-sm leading-relaxed text-text-primary max-w-prose">
              {formatParagraphs(body).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          )}

        </div>

      </DialogContent>
    </Dialog>
  )
}