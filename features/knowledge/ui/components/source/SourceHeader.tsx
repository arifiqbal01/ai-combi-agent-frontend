import { Inline, Stack, Text, Button } from '@/ui'
import { KnowledgeSource, KnowledgeStatus } from '@/features/knowledge/domain/knowledge.types'

const LABELS: Record<string, string> = {
  faq: 'FAQs',
  general: 'General',
  website: 'Website',
  policy: 'Policy',
}

export function SourceHeader({
  source,
  open,
  onToggle,
  onAdd,
}: {
  source: KnowledgeSource
  open: boolean
  onToggle: () => void
  onAdd: () => void
}) {
  return (
    <Inline className="justify-between items-center">

      {/* LEFT */}
      <Stack
        gap="xs"
        className="cursor-pointer flex-1"
        onClick={onToggle}
      >
        {/* TITLE */}
        <Text weight="semibold">
         {LABELS[source.type] || source.type}
        </Text>

        {/* META ROW */}
        <Inline gap="xs" className="items-center">

          <Text size="sm" tone="muted">
            {source.documentCount} items
          </Text>

          {source.status === KnowledgeStatus.PROCESSING && (
            <Text size="xs" tone="muted">
              • Updating...
            </Text>
          )}

        </Inline>
      </Stack>

      {/* RIGHT */}
      <Button
        size="sm"
        variant="secondary"
        onClick={(e) => {
          e.stopPropagation()
          onAdd()
        }}
      >
        Add
      </Button>

    </Inline>
  )
}