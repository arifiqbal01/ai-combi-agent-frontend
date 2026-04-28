'use client'

import { useState } from 'react'
import {
  PageLayout,
  PageHeader,
  PageSection,
  PageActions,
  Text,
  Button,
  Inline,
} from '@/ui'

import { useSources } from '@/features/knowledge/application/queries/useSources'
import { useRebuildSnapshot } from '@/features/knowledge/application/mutations'

import { KnowledgePresetDialog } from '../components/presets/KnowledgePresetDialog'
import { KnowledgeSourceItem } from '../components/source/KnowledgeSourceItem'

import {
  KnowledgeEmptyState,
  KnowledgeSkeletonList,
} from '../components/state/KnowledgeStates'

export function KnowledgeScreen() {
  const { data: sources = [], isLoading, isFetching } = useSources()

  const rebuild = useRebuildSnapshot()

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

  return (
    <PageLayout>

      <PageHeader
        title="Knowledge"
        description="Manage your knowledge sources and documents"
        actions={
          <PageActions>
            <Inline gap="sm">

              {/* 🔥 SNAPSHOT ACTION */}
              <Button
                size="sm"
                variant="secondary"
                onClick={() => rebuild.mutate()}
                loading={rebuild.isPending}
              >
                Rebuild Snapshot
              </Button>

              {/* PRIMARY ACTION */}
              <Button onClick={openGlobal}>
                Add Knowledge
              </Button>

            </Inline>
          </PageActions>
        }
      />

      <PageSection>

        <KnowledgePresetDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          sourceId={selectedSourceId}
        />

        {isLoading && <KnowledgeSkeletonList />}

        {isEmpty && <KnowledgeEmptyState />}

        {!isLoading && sources.length > 0 && (
          <div className="space-y-3 px-2 md:px-0">

            {isFetching && (
              <Text size="xs" tone="muted">
                Updating...
              </Text>
            )}

            {sources.map(source => (
              <KnowledgeSourceItem
                key={source.id}
                source={source}
                onAdd={openForSource}
              />
            ))}

          </div>
        )}

      </PageSection>

    </PageLayout>
  )
}