'use client'

import {
  MessageAuthor as Author,
  MessageVariant
} from '@/features/inbox/domain/message'

import { Badge, Avatar } from '@/ui'

type Props = {
  author: Author | null | undefined
  variant: MessageVariant
}

export function MessageAuthor({
  author,
  variant
}: Props){

  if (variant === MessageVariant.SYSTEM)
    return null

  return (

    <div className="
      flex items-center gap-2
      text-[11px]
      text-text-secondary
      font-medium
      mb-0.5
    ">

      {/* ✅ Avatar added */}
      <Avatar
        label={author?.name}
        size="sm"
      />

      <span>
        {author?.name || 'Unknown'}
      </span>

      {variant === MessageVariant.AI && (
        <Badge
          variant="default"
          className="text-[10px] px-1.5 py-0"
        >
          AI
        </Badge>
      )}

    </div>

  )
}