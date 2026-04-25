'use client'

import {
  ConversationMessage
} from './ConversationMessage'

import {
  mapMessageToPresentation
} from '@/features/inbox/application/conversation/view/models/message.presentation.vm'

import {
  TimelineGroup as TimelineGroupType
} from '@/features/inbox/domain/timeline/timeline.types'

type Props = {
  group: TimelineGroupType
}

export function TimelineGroup({
  group
}: Props){

  if (group.id === 'unread') {

    return(

      <div className="flex items-center gap-3 my-6">

        <div className="flex-1 h-px bg-border-subtle"/>

        <div className="
          text-[11px]
          font-semibold
          text-blue-600
          bg-blue-50
          px-3 py-1
          rounded-full
        ">
          {group.label}
        </div>

        <div className="flex-1 h-px bg-border-subtle"/>

      </div>

    )
  }

  return(

    <div className="space-y-4">

      {group.label && (

        <div className="
          flex justify-center
          text-[11px]
          text-text-muted
          my-4
        ">

          <div className="
            bg-bg-muted
            px-3 py-1
            rounded-full
          ">
            {group.label}
          </div>

        </div>

      )}

      {group.messages.map(
        ({ message, grouped }) => {

          const vm =
            mapMessageToPresentation(
              message,
              grouped
            )

          return(

            <ConversationMessage
              key={vm.id}
              message={vm}
            />

          )

        }
      )}

    </div>

  )
}