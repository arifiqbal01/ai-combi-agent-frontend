import { Stack, Text } from '@/ui'
import { KnowledgeSource } from '@/features/knowledge/domain/knowledge.types'
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

  return (
    <Stack gap="sm">

      {isLoading && (
        <Text size="sm" tone="muted">
          Loading...
        </Text>
      )}

      {!isLoading && (!data || data.length === 0) && (
        <Text size="sm" tone="muted">
          No items yet
        </Text>
      )}

      {!isLoading && data && data.length > 0 && (
        <Stack gap="xs" className="mt-2 border-t pt-2">

          {data.map(doc => (
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