'use client'

import { useState } from 'react'
import {
  Stack,
  Inline,
  Text,
  Button,
} from '@/ui'

import { useSources } from '@/features/knowledge/application/queries/useSources'

import { KnowledgePresetDialog } from '../components/presets/KnowledgePresetDialog'
import { KnowledgeSourceItem } from '../components/source/KnowledgeSourceItem'

import {
  KnowledgeEmptyState,
  KnowledgeSkeletonList,
} from '../components/state/KnowledgeStates'

export function KnowledgeScreen() {
  const {
    data: sources = [],
    isLoading,
    isFetching,
  } = useSources()

  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedSourceId, setSelectedSourceId] = useState<string | undefined>()

  function openGlobal() {
    setSelectedSourceId(undefined)
    setDialogOpen(true)
  }

  function openForSource(id: string) {
    setSelectedSourceId(id)
    setDialogOpen(true)
  }

  const isEmpty = !isLoading && sources.length === 0
  const hasData = sources.length > 0

  const sortedSources = [...sources].sort((a, b) => {
    const aTime = a.updatedAt ?? a.createdAt ?? ''
    const bTime = b.updatedAt ?? b.createdAt ?? ''

    return new Date(bTime).getTime() - new Date(aTime).getTime()
  })

  return (
    <Stack gap="md" className="h-full p-4">

      <Inline className="justify-between items-center">
        <Text size="lg" weight="semibold">
          Knowledge
        </Text>

        <Button
          size="sm"
          variant="secondary"
          onClick={openGlobal}
        >
          + Add
        </Button>
      </Inline>

      <KnowledgePresetDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        sourceId={selectedSourceId}
      />

      {isLoading && <KnowledgeSkeletonList />}

      {isEmpty && <KnowledgeEmptyState />}

      {hasData && (
        <Stack gap="sm">

          {isFetching && !isLoading && (
            <Text size="xs" tone="muted">
              Updating...
            </Text>
          )}

          {sortedSources.map(source => (
            <KnowledgeSourceItem
              key={source.id}
              source={source}
              onAdd={openForSource}
            />
          ))}

        </Stack>
      )}

    </Stack>
  )
}