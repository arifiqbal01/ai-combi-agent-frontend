// features/users/application/keys/user.keys.ts

export const userKeys = {
  all: ['users'] as const,

  list: () => [...userKeys.all, 'list'] as const,

  me: () => [...userKeys.all, 'me'] as const,
}