// ConversationAISection.tsx (bridge file)

'use client'

import { AISection } from './ai/AISection'

type Props = React.ComponentProps<typeof AISection>

export function ConversationAISection(props: Props) {
  return <AISection {...props} />
}