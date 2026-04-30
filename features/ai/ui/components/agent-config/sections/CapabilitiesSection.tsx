import { Section } from '../shared/Section'
import { Toggle } from '../shared/Toggle'

type Props = {
  form: {
    suggestion: boolean
    setSuggestion: (v: boolean) => void

    autoReply: boolean
    setAutoReply: (v: boolean) => void
  }
}

export function CapabilitiesSection({ form }: Props) {
  const handleAutoReply = (value: boolean) => {
    form.setAutoReply(value)

    // 🔥 enforce dependency
    if (value) {
      form.setSuggestion(true)
    }
  }

  return (
    <Section
      title="Capabilities"
      description="Control how this AI agent interacts with conversations."
    >
      {/* Suggestion */}
      <Toggle
        label="Enable Suggestions"
        description="Shows 'Generate Reply' button in Inbox so you can review AI responses before sending."
        checked={form.suggestion}
        onChange={form.setSuggestion}
        disabled={form.autoReply}
      />

      {/* Auto Reply */}
      <Toggle
        label="Enable Auto Reply"
        description="Automatically sends replies without manual approval. Requires threshold configuration below."
        checked={form.autoReply}
        onChange={handleAutoReply}
      />
    </Section>
  )
}