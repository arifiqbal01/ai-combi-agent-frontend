export const channelKeys = {
  all: ['channels'] as const,

  lists: () => [...channelKeys.all, 'list'] as const,

  list: (filters?: Record<string, unknown>) =>
    [...channelKeys.lists(), filters] as const,

  details: () => [...channelKeys.all, 'detail'] as const,

  detail: (id: string) =>
    [...channelKeys.details(), id] as const,
}