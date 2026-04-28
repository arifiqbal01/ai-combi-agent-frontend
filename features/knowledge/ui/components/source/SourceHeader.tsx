'use client'

import { Inline, Stack, Text, Button } from '@/ui'

import {
  KnowledgeSource,
  KnowledgeStatus,
  KnowledgeSourceType,
} from '@/features/knowledge/domain/knowledge.types'

import {
  useActivateSource,
  useDeactivateSource,
} from '@/features/knowledge/application/mutations'

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
  const activate = useActivateSource()
  const deactivate = useDeactivateSource()

  const isActive = source.status === KnowledgeStatus.ACTIVE

  return (
    <Inline className="justify-between items-center gap-2">

      {/* LEFT */}
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

      {/* ACTIONS */}
      <Inline gap="xs" className="shrink-0">

        {/* ENABLE / DISABLE */}
        {isActive ? (
          <Button
            size="sm"
            variant="ghost"
            className="h-8 text-xs"
            onClick={(e) => {
              e.stopPropagation()
              deactivate.mutate(source.id)
            }}
            loading={deactivate.isPending}
          >
            Disable
          </Button>
        ) : (
          <Button
            size="sm"
            variant="secondary"
            className="h-8 text-xs"
            onClick={(e) => {
              e.stopPropagation()
              activate.mutate(source.id)
            }}
            loading={activate.isPending}
          >
            Enable
          </Button>
        )}

        {/* ADD */}
        <Button
          size="sm"
          variant="secondary"
          className="h-8 text-xs"
          onClick={(e) => {
            e.stopPropagation()
            onAdd()
          }}
        >
          Add
        </Button>

      </Inline>

    </Inline>
  )
}