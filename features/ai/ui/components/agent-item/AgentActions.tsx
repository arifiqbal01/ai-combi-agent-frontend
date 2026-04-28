'use client'

import { Agent } from '../../../domain/ai.types'
import {
  Button,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/ui'

import {
  useEnableAgent,
  useDisableAgent,
} from '../../../application/mutations'

import { AgentConfigDialog } from '../agent-config/AgentConfigDialog'

import {
  canDisableAgent,
  getDisableAgentReason,
} from '../../../domain/ai.guards'

export function AgentActions({
  agent,
  totalAgents,
}: {
  agent: Agent
  totalAgents: number
}) {
  const enable = useEnableAgent()
  const disable = useDisableAgent()

  const canDisable = canDisableAgent(agent, totalAgents)
  const disableReason = getDisableAgentReason(agent, totalAgents)

  return (
    <div className="flex items-center gap-2 pt-1 overflow-x-auto no-scrollbar">

      {/* CONFIG */}
      <AgentConfigDialog agentId={agent.id} />

      {/* ENABLE / DISABLE */}
      {agent.isActive ? (
        canDisable ? (
          <Button
            size="sm"
            variant="secondary"
            className="h-8 text-sm shrink-0"
            onClick={() =>
              disable.mutate({ id: agent.id })
            }
            loading={disable.isPending}
          >
            Disable
          </Button>
        ) : (
          <Tooltip>
            <TooltipTrigger asChild>
              <span>
                <Button
                  size="sm"
                  variant="secondary"
                  className="h-8 text-sm"
                  disabled
                >
                  Disable
                </Button>
              </span>
            </TooltipTrigger>

            <TooltipContent>
              {disableReason}
            </TooltipContent>
          </Tooltip>
        )
      ) : (
        <Button
          size="sm"
          className="h-8 text-sm shrink-0"
          onClick={() =>
            enable.mutate({ id: agent.id })
          }
          loading={enable.isPending}
        >
          Enable
        </Button>
      )}

    </div>
  )
}