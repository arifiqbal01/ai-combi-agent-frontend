'use client'

import { KnowledgeScreen } from '@/features/knowledge/ui/screens/KnowledgeScreen'
import { ChannelsScreen } from '@/features/channels/ui/screens/ChannelsScreen'

type Props = {
  active: string
}

/* =========================================================
   SECTION MAP (scalable)
========================================================= */

const SECTION_MAP: Record<string, React.ComponentType> = {
  general: GeneralSettings,
  appearance: AppearanceSettings,
  notifications: NotificationSettings,
  ai: AISettings,
  knowledge: KnowledgeSection,
  channels: ChannelSettings,
  security: SecuritySettings,
  advanced: AdvancedSettings,
}

export function SettingsSections({ active }: Props) {
  const Comp = SECTION_MAP[active]

  if (!Comp) return null

  return <Comp />
}

/* =========================================================
   KNOWLEDGE (FEATURE COMPOSITION)
========================================================= */

function KnowledgeSection() {
  return (
    <div className="h-full">
      <KnowledgeScreen />
    </div>
  )
}

/* =========================================================
   EMPTY PLACEHOLDER SECTIONS (CLEAN)
========================================================= */

import { Surface, Stack, Text } from '@/ui'

function Placeholder({
  title,
}: {
  title: string
}) {
  return (
    <Surface className="p-4">
      <Stack gap="xs">
        <Text weight="semibold">{title}</Text>
        <Text size="sm" tone="muted">
          Configuration coming soon
        </Text>
      </Stack>
    </Surface>
  )
}

function GeneralSettings() {
  return <Placeholder title="General" />
}

function AppearanceSettings() {
  return <Placeholder title="Appearance" />
}

function NotificationSettings() {
  return <Placeholder title="Notifications" />
}

function AISettings() {
  return <Placeholder title="AI & Automation" />
}

function ChannelSettings() {
  return (
    <div className="h-full">
      <ChannelsScreen />
    </div>
  )
}

function SecuritySettings() {
  return <Placeholder title="Security" />
}

function AdvancedSettings() {
  return <Placeholder title="Advanced" />
}