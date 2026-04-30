export const aiKeys = {
  all: ['ai'] as const,

  lists: () => [...aiKeys.all, 'list'] as const,

  details: () => [...aiKeys.all, 'detail'] as const,

  detail: (id: string) =>
    [...aiKeys.details(), id] as const,
}