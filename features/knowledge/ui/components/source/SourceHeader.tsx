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
    <Inline className="justify-between items-center">

      {/* LEFT */}
      <div
        onClick={onToggle}
        className="flex-1 cursor-pointer"
      >
        <Stack gap="xs">
          <Text weight="semibold">
            {LABELS[source.type]}
          </Text>

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
      </div>

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