'use client'

import { Agent } from '../../../domain/ai.types'
import { Stack } from '@/ui'

import { AgentHeader } from './AgentHeader'
import { AgentActions } from './AgentActions'

export function AgentItem({
  agent,
  totalAgents,
}: {
  agent: Agent
  totalAgents: number
}) {
  return (
    <div
      className="
        px-4 py-3
        bg-surface
        border border-border-subtle
        rounded-xl

        transition
        hover:border-border-default
        hover:bg-surface-hover
      "
    >
      <Stack gap="sm">
        <AgentHeader agent={agent} />
        <AgentActions
          agent={agent}
          totalAgents={totalAgents}
        />
      </Stack>
    </div>
  )
}