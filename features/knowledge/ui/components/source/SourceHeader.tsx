import { Inline, Stack, Text, Button } from '@/ui'
import {
  KnowledgeSource,
  KnowledgeStatus,
  KnowledgeSourceType,
} from '@/features/knowledge/domain/knowledge.types'

const LABELS: Record<KnowledgeSourceType, string> = {
  faq: 'FAQs',
  general: 'General',
  website: 'Website',
  policy: 'Policy',
  contact_info: 'Contact Info',
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
    <Inline className="justify-between items-center gap-2">

  <div
    onClick={onToggle}
    className="flex-1 min-w-0 cursor-pointer"
  >
    <Stack gap="xs">
      <Text weight="semibold" className="truncate">
        {LABELS[source.type]}
      </Text>

      <Text size="xs" tone="muted">
        {source.documentCount} items
        {source.status === KnowledgeStatus.PROCESSING && ' • Updating...'}
      </Text>
    </Stack>
  </div>

  <Button
    size="sm"
    variant="secondary"
    className="h-8 text-xs shrink-0"
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