'use client'

import { Agent } from '../../domain/ai.types'
import { Stack } from '@/ui'
import { AgentItem } from './agent-item/AgentItem'

export function AgentList({
  agents,
}: {
  agents: Agent[]
}) {
  const totalAgents = agents.length

  return (
    <Stack gap="sm" className="px-1 md:px-0 md:gap-4">
      {agents.map((agent) => (
        <AgentItem
          key={agent.id}
          agent={agent}
          totalAgents={totalAgents}
        />
      ))}
    </Stack>
  )
}