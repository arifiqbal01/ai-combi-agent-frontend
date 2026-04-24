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

  // ✅ SORT SOURCES (latest first)
  const sortedSources = [...sources].sort(
    (a, b) =>
      new Date(b.updatedAt || b.createdAt || 0).getTime() -
      new Date(a.updatedAt || a.createdAt || 0).getTime()
  )

  return (
    <Stack gap="md" className="h-full p-4">

      {/* HEADER */}
      <Inline className="justify-between items-center">
        <Text size="lg" weight="semibold">
          Knowledge
        </Text>

        {/* ✅ KEEP THIS — THIS IS THE WORKING BUTTON */}
        <Button
          size="sm"
          variant="secondary"
          onClick={openGlobal}
        >
          + Add
        </Button>
      </Inline>

      {/* GLOBAL DIALOG */}
      <KnowledgePresetDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        sourceId={selectedSourceId}
      />

      {/* LOADING */}
      {isLoading && <KnowledgeSkeletonList />}

      {/* EMPTY */}
      {isEmpty && <KnowledgeEmptyState />}

      {/* LIST */}
      {hasData && (
        <Stack gap="sm">

          {isFetching && !isLoading && (
            <Text size="xs" tone="muted">
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