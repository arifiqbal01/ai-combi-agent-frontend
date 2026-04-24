'use client'

import {
  Card,
  CardHeader,
  CardBody,
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
      {/* =====================================================
          PAGE HEADER
      ====================================================== */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold text-text-primary">
          Welcome to AI Combi Agent
        </h1>
        <p className="text-sm text-text-secondary">
          Your unified inbox for managing conversations across all channels.
        </p>
      </div>

      {/* =====================================================
          GETTING STARTED / EMPTY STATE
      ====================================================== */}
      <Card>
        <CardBody className="flex flex-col gap-4">
          <Badge tone="brand" size="sm">
            Getting started
          </Badge>

          <h2 className="text-lg font-semibold text-text-primary">
            Your workspace isn’t fully set up yet
          </h2>

          <p className="text-sm text-text-secondary max-w-xl">
            Connect at least one channel to start receiving messages.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
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
          </div>
        </CardBody>
      </Card>

      {/* =====================================================
          NEXT STEPS
      ====================================================== */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader
            title="Connect channels"
            icon={<Plug size={18} />}
          />
          <CardBody className="flex flex-col gap-3">
            <p className="text-sm text-text-secondary">
              Email, WhatsApp, Instagram, Messenger — bring all conversations
              into one inbox.
            </p>

            <Button size="sm" variant="ghost" className="self-start">
              Manage channels
            </Button>
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            title="Invite your team"
            icon={<Users size={18} />}
          />
          <CardBody className="flex flex-col gap-3">
            <p className="text-sm text-text-secondary">
              Add admins or support agents to collaborate on conversations.
            </p>

            <Button size="sm" variant="ghost" className="self-start">
              Invite users
            </Button>
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            title="AI assistance"
            icon={<Sparkles size={18} />}
          />
          <CardBody className="flex flex-col gap-3">
            <p className="text-sm text-text-secondary">
              Draft replies, summarize conversations, and assist agents —
              always under human control.
            </p>

            <Button size="sm" variant="ghost" className="self-start">
              Learn more
            </Button>
          </CardBody>
        </Card>
      </div>

      {/* =====================================================
          FALLBACK / INFO
      ====================================================== */}
      <Card>
        <CardBody className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Icon size="md">
              <Inbox />
            </Icon>
            <p className="text-sm text-text-secondary max-w-xl">
              If something isn’t loading or you were redirected here, check your
              connected channels or visit the Inbox.
            </p>
          </div>

          <Button variant="ghost" size="sm">
            Open Inbox
          </Button>
        </CardBody>
      </Card>
    </div>
  )
}
