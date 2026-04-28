'use client'

import {
  PageLayout,
  PageHeader,
  PageSection,
  PageActions,
  EmptyState,
  LoadingState,
} from '@/ui'

import { useAgents } from '../../application/queries/useAgents'
import { AgentList } from '../components/AgentList'
import { CreateAgentDialog } from '../components/CreateAgentDialog'

export function AiAgentsScreen() {
  const { data, isLoading } = useAgents()
  const agents = data ?? []

  return (
    <PageLayout>

      <PageHeader
        title="AI Agents"
        description="Manage your AI agents and automation rules"
        actions={
          <PageActions>
            <CreateAgentDialog />
          </PageActions>
        }
      />

      <PageSection>

        {isLoading && <LoadingState />}

        {!isLoading && agents.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <EmptyState
              title="No agents yet"
              description="Create your first AI agent to start automation"
            />
          </div>
        )}

        {!isLoading && agents.length > 0 && (
          <AgentList agents={agents} />
        )}

      </PageSection>

    </PageLayout>
  )
}