import { useConversationRunProgress } from './queries/useConversationRunProgress'

export function useSmartAgentRun(conversationId?: string) {
  const runQuery = useConversationRunProgress(conversationId)

  const run = runQuery.data

  return {
    run,
    suggestion: run?.suggestion,

    isRunning: run ? !run.isFinal : false,
    isCompleted: run ? run.isFinal : false,
    isAutoReply: run?.isAutoReply === true,

    canShowSuggestion:
      !!run?.suggestion && !run?.isAutoReply,

    showAutoReplyMessage:
      run?.isAutoReply === true,

    isLoading: runQuery.isLoading,
    isFetching: runQuery.isFetching,
    isError: runQuery.isError,
    error: runQuery.error,
  }
}