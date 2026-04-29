import { Stack, Text, Surface } from '@/ui'

export function TrustSection() {
  return (
    <section className="py-16">
      <Surface className="p-6 md:p-8 rounded-xl border border-border-subtle bg-bg-muted/40 max-w-3xl">

        <Stack gap="md">

          <Text className="font-semibold">
            Gmail & AI Usage Transparency
          </Text>

          <Text size="sm" tone="secondary">
            Gmail data is used only to display messages and send replies.
          </Text>

          <Text size="sm" tone="secondary">
            AI is used strictly for generating suggestions. No training or advertising usage.
          </Text>

        </Stack>

      </Surface>
    </section>
  )
}