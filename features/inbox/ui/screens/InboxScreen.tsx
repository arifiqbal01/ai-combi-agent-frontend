'use client'

import { ConversationList } from '../conversation-list'
import { ConversationView } from '../conversation'
import { InboxColumn } from '../layout/inbox-column'

import {
  InboxProvider,
  useInboxContext,
} from '../context/inbox-context'

function InboxLayout() {
  const { selectedConversationId } = useInboxContext()

  return (
    <div className="h-full min-h-0 w-full overflow-hidden bg-bg-app-soft">
      <div className="h-full min-h-0 w-full px-6 py-5">
        <div className="grid h-full min-h-0 grid-cols-[420px_minmax(0,1fr)] gap-5">

          {/* LEFT */}
          <InboxColumn padding="p-0" scroll>
            <ConversationList />
          </InboxColumn>

          {/* RIGHT */}
          <InboxColumn padding="p-0" className="min-h-0">
            <ConversationView
              conversationId={selectedConversationId}
            />
          </InboxColumn>

        </div>
      </div>
    </div>
  )
}

export default function InboxScreen() {
  return (
    <InboxProvider>
      <InboxLayout />
    </InboxProvider>
  )
}