'use client'

import { InboxProvider } from '../context/inbox-context'
import { InboxLayout } from '../layout/InboxLayout'

export default function InboxScreen() {
  return (
    <InboxProvider>
      <InboxLayout />
    </InboxProvider>
  )
}