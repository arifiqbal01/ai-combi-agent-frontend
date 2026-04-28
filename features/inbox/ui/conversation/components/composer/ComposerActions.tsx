'use client'

import {
  Send,
  Smile,
  Paperclip,
  Maximize2,
  Mail,
  MessageCircle
} from 'lucide-react'
import { ChannelContext } from '@/features/inbox/domain/channel/channel.context'

type Props = {
  sending: boolean
  disabled: boolean
  onSend: () => void
  onFiles: (f: File[]) => void
  onEmoji: () => void
  onExpand: () => void
  channel?: ChannelContext
}

function getChannelIcon(type?: string) {
  if (!type) return null

  if (type.toLowerCase() === 'email') {
    return <Mail size={14} />
  }

  if (type.toLowerCase() === 'whatsapp') {
    return <MessageCircle size={14} />
  }

  return null
}

export function ComposerActions({
  sending,
  disabled,
  onSend,
  onFiles,
  onEmoji,
  onExpand,
  channel
}: Props) {

  return (
    <div className="
      flex items-center w-full
      gap-2
    ">

      {/* LEFT ACTIONS */}
      <div className="flex items-center gap-1 sm:gap-2">

        <button
          onClick={onEmoji}
          className="
            flex items-center justify-center
            w-7 h-7 sm:w-9 sm:h-9
            rounded-md
            hover:bg-gray-100
          "
        >
          <Smile size={16} className="sm:w-[18px] sm:h-[18px]" />
        </button>

        <label
          className="
            flex items-center justify-center
            w-7 h-7 sm:w-9 sm:h-9
            rounded-md
            hover:bg-gray-100
            cursor-pointer
          "
        >
          <Paperclip size={16} className="sm:w-[18px] sm:h-[18px]" />

          <input
            type="file"
            multiple
            hidden
            onChange={(e) => {
              if (!e.target.files) return
              onFiles(Array.from(e.target.files))
            }}
          />
        </label>

        <button
          onClick={onExpand}
          className="
            flex items-center justify-center
            w-7 h-7 sm:w-9 sm:h-9
            rounded-md
            hover:bg-gray-100
          "
        >
          <Maximize2 size={16} className="sm:w-[18px] sm:h-[18px]" />
        </button>

      </div>

      {channel && (
          <div className="
            flex items-center gap-1.5
            px-2 py-1
            rounded-md
            bg-gray-100
            text-xs text-gray-700
            max-w-[200px]
          ">

            <span className="font-medium capitalize">
              {channel.type}
            </span>

            {channel.address && (
              <span className="truncate text-gray-500">
                {channel.address}
              </span>
            )}

          </div>
        )}

      {/* SEND BUTTON */}
      <div className="ml-auto flex items-center">

        <button
          disabled={disabled || sending}
          onClick={onSend}
          className="
            flex items-center justify-center

            w-8 h-8 sm:w-10 sm:h-10

            rounded-md

            bg-blue-500 text-white
            disabled:opacity-40

            transition
          "
        >
          <Send size={15} className="sm:w-[16px] sm:h-[16px]" />
        </button>

      </div>

    </div>
  )
}