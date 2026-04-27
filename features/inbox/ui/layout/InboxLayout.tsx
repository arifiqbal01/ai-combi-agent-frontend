'use client'

import { useInboxContext } from '../context/inbox-context'

import { ConversationList } from '../conversation-list'
import { ConversationView } from '../conversation'

import { AppPanel } from '@/ui/layout/AppPanel'

export function InboxLayout() {
  const { selectedConversationId } = useInboxContext()

  return (
    <div className="
      h-[calc(100dvh-56px)]
      w-full
      flex flex-col
      overflow-hidden
      bg-bg-app-soft
    ">

      <div className="
        flex-1 min-h-0 w-full
        px-0 py-0
        md:px-6 md:py-5
      ">

        {/* ================= MOBILE ================= */}
        <div className="h-full min-h-0 md:hidden">

          {!selectedConversationId ? (
            <div className="
              h-full
              overflow-y-auto
              overscroll-contain
            ">
              <ConversationList />
            </div>
          ) : (
            <div className="
              h-full
              flex
              flex-col
              bg-bg-surface
            ">
              <div className="flex-1 min-h-0">
                <ConversationView
                  conversationId={selectedConversationId}
                />
              </div>
            </div>
          )}

        </div>

        {/* ================= DESKTOP ================= */}
        <div className="
          hidden md:grid
          h-full min-h-0
          grid-cols-[380px_minmax(0,1fr)]
          gap-4 md:gap-5
        ">

          <AppPanel scroll className="rounded-2xl border bg-bg-surface">
            <ConversationList />
          </AppPanel>

          <AppPanel className="rounded-2xl border bg-bg-surface">
            <ConversationView
              conversationId={selectedConversationId}
            />
          </AppPanel>

        </div>

      </div>
    </div>
  )
}