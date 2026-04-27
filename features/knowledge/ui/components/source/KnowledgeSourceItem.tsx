'use client'

import { useState, useEffect } from 'react'
import { Stack } from '@/ui'

import { KnowledgeSource } from '@/features/knowledge/domain/knowledge.types'

import { SourceHeader } from './SourceHeader'
import { SourceDocuments } from './SourceDocuments'
import { DocumentDialog } from '../document/DocumentDialog'

export function KnowledgeSourceItem({
  source,
  onAdd,
}: {
  source: KnowledgeSource
  onAdd: (id: string) => void
}) {
  const [open, setOpen] = useState(false)
  const [docId, setDocId] = useState<string | undefined>()

  useEffect(() => {
    if (source.documentCount > 0) {
      setOpen(true)
    }
  }, [])

  return (
    <div
      className="
        px-4 py-3
        bg-surface
        border border-border-subtle
        rounded-xl
      "
    >
      <Stack gap="xs">

        <SourceHeader
          source={source}
          open={open}
          onToggle={() => setOpen(v => !v)}
          onAdd={() => onAdd(source.id)}
        />

        {open && (
          <SourceDocuments
            source={source}
            onOpenDoc={setDocId}
          />
        )}

      </Stack>

      <DocumentDialog
        sourceId={source.id}
        documentId={docId}
        open={!!docId}
        onClose={() => setDocId(undefined)}
      />
    </div>
  )
}