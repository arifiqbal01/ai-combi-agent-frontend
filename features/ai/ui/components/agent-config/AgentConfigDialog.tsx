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
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/ui'

import { useUpdateAgentConfig } from '../../../application/mutations'
import { AgentConfig } from '../../../domain/ai.types'

import { useAgentConfigForm } from './useAgentConfigForm'

import { ToneSection } from './sections/ToneSection'
import { CapabilitiesSection } from './sections/CapabilitiesSection'
import { SignatureSection } from './sections/SignatureSection'

type Props = {
  agentId: string
  config?: AgentConfig
  isActive: boolean
}

/* -----------------------------
   Safe fallback (for first render)
----------------------------- */
function getSafeDefaultConfig(): AgentConfig {
  return {
    tone: {
      style: 'friendly',
      formality: 'professional',
      verbosity: 'balanced',
      language: 'en',
    },
    capabilities: {
      suggestion: true,
      autoReply: false,
    },
    autoReplyThreshold: 0.8,
    signature: {
      enabled: false,
      stripAiSignature: true,
      template: '',
      companyName: '',
      supportEmail: '',
      website: '',
    },
  }
}

export function AgentConfigDialog({ agentId, config, isActive }: Props) {
  const [open, setOpen] = useState(false)
  const update = useUpdateAgentConfig()

  // ✅ ALWAYS call hook (no conditional)
  const form = useAgentConfigForm(
    config ?? getSafeDefaultConfig(),
    open
  )

  // ✅ UI guard AFTER hooks
  if (!config) {
    return (
      <Button size="sm" variant="ghost" disabled>
        Loading...
      </Button>
    )
  }

  const handleSave = () => {
    update.mutate(
      {
        id: agentId,
        body: form.buildPayload(),
      },
      {
        onSuccess: () => setOpen(false),
      }
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {isActive ? (
          <Button
            size="sm"
            variant="ghost"
            className="h-8 text-sm shrink-0"
            onClick={() => setOpen(true)}
          >
            Configure
          </Button>
        ) : (
          <Tooltip>
            <TooltipTrigger asChild>
              <span>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 text-sm shrink-0"
                  disabled
                >
                  Configure
                </Button>
              </span>
            </TooltipTrigger>
            <TooltipContent>
              Enable agent to configure settings
            </TooltipContent>
          </Tooltip>
        )}

      {/* Modal */}
      <DialogContent className="max-w-lg w-full p-6 rounded-xl relative overflow-y-auto max-h-[90vh]">
        <DialogClose asChild>
          <button className="absolute right-5 top-5 opacity-70 hover:opacity-100">
            ✕
          </button>
        </DialogClose>

        <DialogHeader className="mb-4 pb-3 border-b">
          <DialogTitle>Agent Configuration</DialogTitle>
        </DialogHeader>

        <Stack gap="lg">
          <ToneSection form={form} />
          <CapabilitiesSection form={form} />
          <SignatureSection form={form} />

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