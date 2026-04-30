import { useEffect, useState } from 'react'

import {
  ToneStyle,
  ToneFormality,
  ToneVerbosity,
  ToneLanguage,
  AgentConfig,
} from '../../../domain/ai.types'

type UseAgentConfigFormReturn = {
  style: ToneStyle
  setStyle: (v: ToneStyle) => void

  formality: ToneFormality
  setFormality: (v: ToneFormality) => void

  verbosity: ToneVerbosity
  setVerbosity: (v: ToneVerbosity) => void

  language: ToneLanguage
  setLanguage: (v: ToneLanguage) => void

  suggestion: boolean
  setSuggestion: (v: boolean) => void

  autoReply: boolean
  setAutoReply: (v: boolean) => void

  threshold: number
  setThreshold: (v: number) => void

  signatureEnabled: boolean
  setSignatureEnabled: (v: boolean) => void

  stripAI: boolean
  setStripAI: (v: boolean) => void

  template: string
  setTemplate: (v: string) => void

  company: string
  setCompany: (v: string) => void

  email: string
  setEmail: (v: string) => void

  website: string
  setWebsite: (v: string) => void

  buildPayload: () => any
}

export function useAgentConfigForm(
  config: AgentConfig,
  open: boolean
): UseAgentConfigFormReturn {
  /* -----------------------------
     State
  ----------------------------- */
  const [style, setStyle] = useState<ToneStyle>(config.tone.style)
  const [formality, setFormality] = useState<ToneFormality>(config.tone.formality)
  const [verbosity, setVerbosity] = useState<ToneVerbosity>(config.tone.verbosity)
  const [language, setLanguage] = useState<ToneLanguage>(config.tone.language)

  const [suggestion, setSuggestion] = useState(config.capabilities.suggestion)
  const [autoReply, setAutoReply] = useState(config.capabilities.autoReply)

  const [threshold, setThreshold] = useState(config.autoReplyThreshold)

  const [signatureEnabled, setSignatureEnabled] = useState(config.signature.enabled)
  const [stripAI, setStripAI] = useState(config.signature.stripAiSignature)
  const [template, setTemplate] = useState(config.signature.template ?? '')
  const [company, setCompany] = useState(config.signature.companyName ?? '')
  const [email, setEmail] = useState(config.signature.supportEmail ?? '')
  const [website, setWebsite] = useState(config.signature.website ?? '')

  /* -----------------------------
     Hydration (STRICT)
  ----------------------------- */
  useEffect(() => {
    if (!open) return

    setStyle(config.tone.style)
    setFormality(config.tone.formality)
    setVerbosity(config.tone.verbosity)
    setLanguage(config.tone.language)

    setSuggestion(config.capabilities.suggestion)
    setAutoReply(config.capabilities.autoReply)

    setThreshold(config.autoReplyThreshold)

    setSignatureEnabled(config.signature.enabled)
    setStripAI(config.signature.stripAiSignature)
    setTemplate(config.signature.template ?? '')
    setCompany(config.signature.companyName ?? '')
    setEmail(config.signature.supportEmail ?? '')
    setWebsite(config.signature.website ?? '')
  }, [open, config])

  /* -----------------------------
     Build Payload
  ----------------------------- */
  const buildPayload = () => ({
    tone: {
      style,
      formality,
      verbosity,
      language,
    },
    capabilities: {
      suggestion,
      auto_reply: autoReply,
    },
    auto_reply_threshold: threshold,
    signature: {
      enabled: signatureEnabled,
      strip_ai_signature: stripAI,
      template,
      company_name: company,
      support_email: email,
      website,
    },
  })

  return {
    style,
    setStyle,
    formality,
    setFormality,
    verbosity,
    setVerbosity,
    language,
    setLanguage,

    suggestion,
    setSuggestion,
    autoReply,
    setAutoReply,

    threshold,
    setThreshold,

    signatureEnabled,
    setSignatureEnabled,
    stripAI,
    setStripAI,
    template,
    setTemplate,
    company,
    setCompany,
    email,
    setEmail,
    website,
    setWebsite,

    buildPayload,
  }
}