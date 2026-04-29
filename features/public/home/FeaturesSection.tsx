import { Stack, Text, Surface } from '@/ui'

function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <Surface className="p-6 rounded-xl border border-border-subtle hover:shadow-md transition">
      <Stack gap="sm">
        <Text weight="semibold">{title}</Text>
        <Text size="sm" tone="secondary">{desc}</Text>
      </Stack>
    </Surface>
  )
}

export function FeaturesSection() {
  return (
    <section className="py-16 border-t border-border-subtle">
      <Stack gap="lg">

        <Text className="text-lg md:text-xl font-semibold">
          Everything you need to manage conversations
        </Text>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          <Feature title="Unified Inbox" desc="Manage all Gmail conversations in one place." />
          <Feature title="AI Replies" desc="Generate context-aware replies instantly." />
          <Feature title="Smart Organization" desc="Automatically classify conversations." />
          <Feature title="Secure Processing" desc="Data is never used for training or ads." />

        </div>

      </Stack>
    </section>
  )
}