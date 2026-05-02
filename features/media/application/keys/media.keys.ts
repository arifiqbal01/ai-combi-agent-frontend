// features/media/application/keys/media.keys.ts

export const mediaKeys = {
  all: ['media'] as const,

  urls: () => [...mediaKeys.all, 'url'] as const,

  url: (storageKey: string) =>
    [...mediaKeys.urls(), storageKey] as const,
}