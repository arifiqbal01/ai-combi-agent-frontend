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
    <Stack gap="sm">

      {isLoading && (
        <Text size="sm" tone="muted">
          Loading...
        </Text>
      )}

      {!isLoading && sortedDocs.length === 0 && (
        <Text size="sm" tone="muted">
          No items yet
        </Text>
      )}

      {!isLoading && sortedDocs.length > 0 && (
        <Stack gap="xs" className="mt-2 border-t pt-2">

          {sortedDocs.map(doc => (
            <DocumentItem
              key={doc.id}
              doc={doc}
              sourceId={source.id}
              onOpen={onOpenDoc}
            />
          ))}

        </Stack>
      )}
    </Stack>
  )
}