// features/auth/application/keys/auth.keys.ts

export const authKeys = {
  all: ['auth'] as const,
  me: () => [...authKeys.all, 'me'] as const,
  tenant: () => ['tenant-me'] as const,
}