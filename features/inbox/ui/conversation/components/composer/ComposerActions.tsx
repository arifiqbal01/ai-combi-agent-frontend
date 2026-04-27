'use client'

import {
  Send,
  Smile,
  Paperclip,
  Maximize2
} from 'lucide-react'

type Props = {
  sending: boolean
  disabled: boolean
  onSend: () => void
  onFiles: (f: File[]) => void
  onEmoji: () => void
  onExpand: () => void
}

export function ComposerActions({
  sending,
  disabled,
  onSend,
  onFiles,
  onEmoji,
  onExpand
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