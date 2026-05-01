export const aiKeys = {
  all: ['ai'] as const,

  /* -----------------------------
     Agents
  ----------------------------- */
  lists: () => [...aiKeys.all, 'list'] as const,

  details: () => [...aiKeys.all, 'detail'] as const,

  detail: (id: string) =>
    [...aiKeys.details(), id] as const,

  /* -----------------------------
     Agent Runs
  ----------------------------- */
  runs: () => [...aiKeys.all, 'runs'] as const,

  runProgress: (runId: string) =>
    [...aiKeys.runs(), 'progress', runId] as const,

  /* -----------------------------
       Conversation Run
  ----------------------------- */
  conversationRun: (conversationId: string) =>
    [...aiKeys.runs(), 'conversation', conversationId] as const,
}