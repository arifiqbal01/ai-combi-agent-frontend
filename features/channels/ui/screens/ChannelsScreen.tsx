'use client'

import {
  PageLayout,
  PageHeader,
  PageSection,
  PageActions,
  EmptyState,
  LoadingState,
} from '@/ui'

import { useChannels } from '../../application/queries/useChannels'
import { ChannelList } from '../components/ChannelList'
import { CreateChannelDialog } from '../components/CreateChannelDialog'

export function ChannelsScreen() {
  const { data, isLoading } = useChannels()
  const channels = data ?? []

  return (
    <PageLayout>

      <PageHeader
        title="Channels"
        description="Manage your connected communication channels"
        actions={
          <PageActions>
              <CreateChannelDialog />
            </PageActions>
        }
      />

      <PageSection>

        {isLoading && <LoadingState />}

        {!isLoading && channels.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <EmptyState
              title="No channels yet"
              description="Connect your first channel to start receiving messages"
            />
          </div>
        )}

        {!isLoading && channels.length > 0 && (
          <ChannelList channels={channels} />
        )}

      </PageSection>

    </PageLayout>
  )
}