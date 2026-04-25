'use client'

import { useState, useEffect } from 'react'
import { Surface, Stack } from '@/ui'

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
    <Surface className="p-4">
      <Stack gap="sm">

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
    </Surface>
  )
}