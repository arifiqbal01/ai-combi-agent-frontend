import { useAgents } from './queries/useAgents'
import { useCreateAgent } from './mutations/useCreateAgent'
import { useEnableAgent } from './mutations/useEnableAgent'
import { useDisableAgent } from './mutations/useDisableAgent'

export function useSmartAgents() {
  const agents = useAgents()

  const create = useCreateAgent()
  const enable = useEnableAgent()
  const disable = useDisableAgent()

  return {
    agents: agents.data ?? [],
    isLoading: agents.isLoading,

    createAgent: create.mutate,
    enableAgent: enable.mutate,
    disableAgent: disable.mutate,
  }
}