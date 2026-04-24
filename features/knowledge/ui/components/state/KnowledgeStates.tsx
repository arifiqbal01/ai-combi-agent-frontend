'use client'

import { Surface, Stack, Text } from '@/ui'

/* =========================
 EMPTY STATE
========================= */

export function KnowledgeEmptyState() {
 return (
  <Surface className="p-6 text-center">
   <Stack gap="xs">
    <Text weight="medium">
     No knowledge yet
    </Text>

    <Text size="sm" tone="muted">
     Add FAQs or text to train your AI
    </Text>
   </Stack>
  </Surface>
 )
}

/* =========================
 SKELETON
========================= */

export function KnowledgeSkeletonItem() {
 return (
  <Surface className="p-4 animate-pulse">
   <Stack gap="xs">
    <div className="h-4 w-32 rounded bg-bg-muted" />
    <div className="h-3 w-20 rounded bg-bg-muted" />
   </Stack>
  </Surface>
 )
}

export function KnowledgeSkeletonList() {
 return (
  <Stack gap="sm">
   <KnowledgeSkeletonItem />
   <KnowledgeSkeletonItem />
   <KnowledgeSkeletonItem />
  </Stack>
 )
}