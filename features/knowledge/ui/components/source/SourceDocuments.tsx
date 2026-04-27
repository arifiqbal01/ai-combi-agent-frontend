import { Stack, Text } from '@/ui'
import {
  KnowledgeSource,
  KnowledgeStatus,
} from '@/features/knowledge/domain/knowledge.types'

import { useDocumentsBySource } from '@/features/knowledge/application/queries/useDocumentsBySource'

import { DocumentItem } from './DocumentItem'

export function SourceDocuments({
  source,
  onOpenDoc,
}: {
  source: KnowledgeSource
  onOpenDoc: (id: string) => void
}) {
  const { data, isLoading } = useDocumentsBySource(source.id)

  const sortedDocs = data
    ? [...data]
        .filter(d => d.status !== KnowledgeStatus.ARCHIVED)
        .sort((a, b) => {
          const aTime = a.createdAt ?? ''
          const bTime = b.createdAt ?? ''
          return new Date(bTime).getTime() - new Date(aTime).getTime()
        })
    : []

  return (
    <Stack gap="xs" className="mt-1">

      {/* LOADING */}
      {isLoading && (
        <Text size="xs" tone="muted" className="px-2 py-1">
          Loading...
        </Text>
      )}

      {/* EMPTY */}
      {!isLoading && sortedDocs.length === 0 && (
        <Text size="xs" tone="muted" className="px-2 py-1">
          No items yet
        </Text>
      )}

      {/* LIST */}
      {!isLoading && sortedDocs.length > 0 && (
        <div className="mt-1 border-t border-border-subtle">

          {sortedDocs.map(doc => (
            <DocumentItem
              key={doc.id}
              doc={doc}
              sourceId={source.id}
              onOpen={onOpenDoc}
            />
          ))}

        </div>
      )}

    </Stack>
  )
}