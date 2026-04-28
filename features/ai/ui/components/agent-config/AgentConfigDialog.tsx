'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  Button,
  Stack,
  Text,
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/ui'

import { useUpdateAgentConfig } from '../../../application/mutations'

import {
  ToneStyle,
  ToneFormality,
  ToneVerbosity,
  ToneLanguage,
} from '../../../domain/ai.types'

type Props = {
  agentId: string
}

export function AgentConfigDialog({ agentId }: Props) {
  const update = useUpdateAgentConfig()

  const [open, setOpen] = useState(false)

  // ✅ Typed state (backend aligned)
  const [style, setStyle] = useState<ToneStyle>('friendly')
  const [formality, setFormality] =
    useState<ToneFormality>('professional')
  const [verbosity, setVerbosity] =
    useState<ToneVerbosity>('balanced')
  const [language, setLanguage] =
    useState<ToneLanguage>('en')

  const handleSave = () => {
    update.mutate(
      {
        id: agentId,
        body: {
          tone: {
            style,
            formality,
            verbosity,
            language,
          },
        },
      },
      {
        onSuccess: () => {
          setOpen(false)
        },
      }
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        size="sm"
        variant="ghost"
        className="h-8 text-sm shrink-0"
        onClick={() => setOpen(true)}
      >
        Configure
      </Button>

      <DialogContent className="max-w-md w-full p-6 rounded-xl relative">

        {/* CLOSE */}
        <DialogClose asChild>
          <button className="absolute right-5 top-5 opacity-70 hover:opacity-100">
            ✕
          </button>
        </DialogClose>

        {/* HEADER */}
        <DialogHeader className="mb-4 pb-3 border-b">
          <DialogTitle>
            Agent Tone Settings
          </DialogTitle>
        </DialogHeader>

        <Stack gap="md">

          {/* STYLE */}
          <Field label="Style">
            <Select
              value={style}
              onValueChange={(val) =>
                setStyle(val as ToneStyle)
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="direct">Direct</SelectItem>
                <SelectItem value="friendly">Friendly</SelectItem>
                <SelectItem value="formal">Formal</SelectItem>
              </SelectContent>
            </Select>
          </Field>

          {/* FORMALITY */}
          <Field label="Formality">
            <Select
              value={formality}
              onValueChange={(val) =>
                setFormality(val as ToneFormality)
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="professional">
                  Professional
                </SelectItem>
                <SelectItem value="casual">
                  Casual
                </SelectItem>
              </SelectContent>
            </Select>
          </Field>

          {/* VERBOSITY */}
          <Field label="Verbosity">
            <Select
              value={verbosity}
              onValueChange={(val) =>
                setVerbosity(val as ToneVerbosity)
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="concise">Concise</SelectItem>
                <SelectItem value="balanced">Balanced</SelectItem>
                <SelectItem value="detailed">Detailed</SelectItem>
              </SelectContent>
            </Select>
          </Field>

          {/* LANGUAGE */}
          <Field label="Language">
            <Select
              value={language}
              onValueChange={(val) =>
                setLanguage(val as ToneLanguage)
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="nl">Dutch</SelectItem>
              </SelectContent>
            </Select>
          </Field>

          {/* ACTION */}
          <Button
            onClick={handleSave}
            loading={update.isPending}
          >
            Save Configuration
          </Button>

        </Stack>
      </DialogContent>
    </Dialog>
  )
}

/* ----------------------------------------
   Reusable Field Wrapper
---------------------------------------- */
function Field({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <Stack gap="xs">
      <Text size="sm" weight="medium">
        {label}
      </Text>
      {children}
    </Stack>
  )
}