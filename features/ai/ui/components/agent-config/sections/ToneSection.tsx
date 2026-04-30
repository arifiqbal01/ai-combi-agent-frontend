import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/ui'

import { Section } from '../shared/Section'
import { Field } from '../shared/Field'

import {
  ToneStyle,
  ToneFormality,
  ToneVerbosity,
  ToneLanguage,
} from '@/features/ai/domain/ai.types'

export function ToneSection({ form }: {
  form: {
    style: ToneStyle
    setStyle: (v: ToneStyle) => void

    formality: ToneFormality
    setFormality: (v: ToneFormality) => void

    verbosity: ToneVerbosity
    setVerbosity: (v: ToneVerbosity) => void

    language: ToneLanguage
    setLanguage: (v: ToneLanguage) => void
  }
}) {
  return (
    <Section
      title="Tone"
      description="Define how the AI communicates in replies."
    >
      {/* Style */}
      <Field label="Style" description="Overall personality of responses.">
        <Select
          value={form.style}
          onValueChange={(val: ToneStyle) => form.setStyle(val)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select style" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="direct">Direct</SelectItem>
            <SelectItem value="friendly">Friendly</SelectItem>
            <SelectItem value="formal">Formal</SelectItem>
          </SelectContent>
        </Select>
      </Field>

      {/* Formality */}
      <Field label="Formality" description="Level of professionalism in tone.">
        <Select
          value={form.formality}
          onValueChange={(val: ToneFormality) => form.setFormality(val)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select formality" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="professional">Professional</SelectItem>
            <SelectItem value="casual">Casual</SelectItem>
          </SelectContent>
        </Select>
      </Field>

      {/* Verbosity */}
      <Field label="Verbosity" description="How detailed the responses should be.">
        <Select
          value={form.verbosity}
          onValueChange={(val: ToneVerbosity) => form.setVerbosity(val)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select verbosity" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="concise">Concise</SelectItem>
            <SelectItem value="balanced">Balanced</SelectItem>
            <SelectItem value="detailed">Detailed</SelectItem>
          </SelectContent>
        </Select>
      </Field>

      {/* Language */}
      <Field label="Language" description="Language used in AI-generated replies.">
        <Select
          value={form.language}
          onValueChange={(val: ToneLanguage) => form.setLanguage(val)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select language" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="nl">Dutch</SelectItem>
          </SelectContent>
        </Select>
      </Field>
    </Section>
  )
}