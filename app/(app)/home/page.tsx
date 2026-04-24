'use client'

import {
  Surface,
  Stack,
  Inline,
  Text,
  Button,
  Badge,
  Icon,
} from '@/ui'

import {
  Inbox,
  Plug,
  Users,
  Sparkles,
  ArrowRight,
} from 'lucide-react'

export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-8 px-4 py-6">
      {/* =========================
          PAGE HEADER
      ========================= */}
      <Stack gap="xs">
        <Text as="h1" size="xl" weight="semibold">
          Welcome to AI Combi Agent
        </Text>

        <Text size="sm" tone="secondary">
          Your unified inbox for managing conversations across all channels.
        </Text>
      </Stack>

      {/* =========================
          GETTING STARTED
      ========================= */}
      <Surface className="p-5">
        <Stack gap="md">
          <Badge tone="brand" size="sm">
            Getting started
          </Badge>

          <Text size="lg" weight="semibold">
            Your workspace isn’t fully set up yet
          </Text>

          <Text size="sm" tone="secondary" className="max-w-xl">
            Connect at least one channel to start receiving messages.
          </Text>

          <Inline gap="sm" className="pt-2 flex-wrap">
            <Button>
              <Icon size="sm">
                <Plug />
              </Icon>
              Connect a channel
            </Button>

            <Button variant="ghost">
              Go to Inbox
              <Icon size="sm">
                <ArrowRight />
              </Icon>
            </Button>
          </Inline>
        </Stack>
      </Surface>

      {/* =========================
          NEXT STEPS
      ========================= */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Card 1 */}
        <Surface className="p-5">
          <Stack gap="sm">
            <Inline gap="sm">
              <Icon size="sm">
                <Plug />
              </Icon>
              <Text weight="semibold">Connect channels</Text>
            </Inline>

            <Text size="sm" tone="secondary">
              Email, WhatsApp, Instagram, Messenger — bring all conversations
              into one inbox.
            </Text>

            <Button size="sm" variant="ghost" className="self-start">
              Manage channels
            </Button>
          </Stack>
        </Surface>

        {/* Card 2 */}
        <Surface className="p-5">
          <Stack gap="sm">
            <Inline gap="sm">
              <Icon size="sm">
                <Users />
              </Icon>
              <Text weight="semibold">Invite your team</Text>
            </Inline>

            <Text size="sm" tone="secondary">
              Add admins or support agents to collaborate on conversations.
            </Text>

            <Button size="sm" variant="ghost" className="self-start">
              Invite users
            </Button>
          </Stack>
        </Surface>

        {/* Card 3 */}
        <Surface className="p-5">
          <Stack gap="sm">
            <Inline gap="sm">
              <Icon size="sm">
                <Sparkles />
              </Icon>
              <Text weight="semibold">AI assistance</Text>
            </Inline>

            <Text size="sm" tone="secondary">
              Draft replies, summarize conversations, and assist agents —
              always under human control.
            </Text>

            <Button size="sm" variant="ghost" className="self-start">
              Learn more
            </Button>
          </Stack>
        </Surface>
      </div>

      {/* =========================
          FALLBACK / INFO
      ========================= */}
      <Surface className="p-5">
        <Inline className="flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Inline gap="sm">
            <Icon size="md">
              <Inbox />
            </Icon>

            <Text size="sm" tone="secondary" className="max-w-xl">
              If something isn’t loading or you were redirected here, check your
              connected channels or visit the Inbox.
            </Text>
          </Inline>

          <Button variant="ghost" size="sm">
            Open Inbox
          </Button>
        </Inline>
      </Surface>
    </div>
  )
}