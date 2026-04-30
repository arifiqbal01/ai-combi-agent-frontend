'use client'

import {
  PageLayout,
  PageHeader,
  PageSection,
  PageActions,
  EmptyState,
  LoadingState,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  Button,
} from '@/ui'

import { useAgents } from '../../application/queries/useAgents'
import { AgentList } from '../components/AgentList'
import { AiKnowledgeNotice } from '../components/AiKnowledgeNotice'

// 🔥 Feature flag
const ENABLE_MULTI_AGENTS = false

function DisabledAddAgentButton() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span>
          <Button disabled>
            Add Agent
          </Button>
        </span>
      </TooltipTrigger>
      <TooltipContent>
        Multiple agents will be available soon
      </TooltipContent>
    </Tooltip>
  )
}

export function AiAgentsScreen() {
  const { data, isLoading } = useAgents()
  const agents = data ?? []

  const actions = (
    <PageActions>
      {ENABLE_MULTI_AGENTS ? (
        // future enable
        // <CreateAgentDialog />
        null
      ) : (
        <DisabledAddAgentButton />
      )}
    </PageActions>
  )

  if (isLoading) {
    return (
      <PageLayout>
        <PageHeader
          title="AI Agents"
          description="Manage your AI agents and automation rules"
          actions={actions}
        />

        <PageSection>
          <LoadingState />
        </PageSection>
      </PageLayout>
    )
  }

  return (
    <PageLayout>
      <PageHeader
        title="AI Agents"
        description="Manage your AI agents and automation rules"
        actions={actions}
      />

      <PageSection>
        <AiKnowledgeNotice />

        {agents.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <EmptyState
              title="No agents yet"
              description="Create your first AI agent to start automation"
            />
          </div>
        ) : (
          <AgentList agents={agents} />
        )}
      </PageSection>
    </PageLayout>
  )
}