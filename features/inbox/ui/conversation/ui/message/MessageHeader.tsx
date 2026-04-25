'use client'

import {
  MessageAuthor,
  MessageVariant
} from '@/features/inbox/domain/message'

import { Badge } from '@/ui'

type Props = {
  author: MessageAuthor
  variant: MessageVariant
  hidden?: boolean
}

export function MessageHeader({
  author,
  variant,
  hidden
}: Props){

  if (hidden) return null

  if (variant === MessageVariant.SYSTEM)
    return null

  return(

    <div className="
      flex items-center gap-2
      text-[12px]
      text-gray-600
      font-medium
      mb-1
    ">

      {author.name}

      {variant === MessageVariant.AI && (

        <Badge
          variant="default"
          className="text-[10px]"
        >
          AI
        </Badge>

      )}

    </div>

  )
}