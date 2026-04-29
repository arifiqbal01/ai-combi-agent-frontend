import { Stack, Text, Surface } from '@/ui'

export function HowItWorksSection() {
  return (
    <section className="py-16 border-t border-border-subtle">
      <Stack gap="lg" className="max-w-3xl">

        <Text className="text-lg md:text-xl font-semibold">
          How it works
        </Text>

        <div className="grid gap-4">

          <Surface className="p-5 rounded-lg border border-border-subtle">
            <Text weight="semibold">1. Connect Gmail</Text>
            <Text size="sm" tone="secondary">
              Securely connect your Gmail account.
            </Text>
          </Surface>

          <Surface className="p-5 rounded-lg border border-border-subtle">
            <Text weight="semibold">2. Manage conversations</Text>
            <Text size="sm" tone="secondary">
              View and respond from a unified inbox.
            </Text>
          </Surface>

          <Surface className="p-5 rounded-lg border border-border-subtle">
            <Text weight="semibold">3. Use AI assistance</Text>
            <Text size="sm" tone="secondary">
              Generate replies and automate workflows.
            </Text>
          </Surface>

        </div>

      </Stack>
    </section>
  )
}