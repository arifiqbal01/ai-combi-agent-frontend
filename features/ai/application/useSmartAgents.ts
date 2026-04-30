import { useAgents } from './queries/useAgents'
import { useCreateAgent } from './mutations/useCreateAgent'
import { useEnableAgent } from './mutations/useEnableAgent'
import { useDisableAgent } from './mutations/useDisableAgent'
import { useUpdateAgentConfig } from './mutations/useUpdateAgentConfig'

export function useSmartAgents() {
  const agentsQuery = useAgents()

  const create = useCreateAgent()
  const enable = useEnableAgent()
  const disable = useDisableAgent()
  const updateConfig = useUpdateAgentConfig()

  return {
    /* -----------------------------
       Data
    ----------------------------- */
    agents: agentsQuery.data ?? [],

    /* -----------------------------
       Query State
    ----------------------------- */
    isLoading: agentsQuery.isLoading,
    isFetching: agentsQuery.isFetching,
    isError: agentsQuery.isError,
    error: agentsQuery.error,

    /* -----------------------------
       Actions
    ----------------------------- */
    createAgent: create.mutate,
    enableAgent: enable.mutate,
    disableAgent: disable.mutate,
    updateAgentConfig: updateConfig.mutate,

    /* -----------------------------
       Mutation States (optional but powerful)
    ----------------------------- */
    isCreating: create.isPending,
    isEnabling: enable.isPending,
    isDisabling: disable.isPending,
    isUpdatingConfig: updateConfig.isPending,
  }
}