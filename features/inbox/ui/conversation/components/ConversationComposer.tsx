'use client'

import { useComposer } from '@/features/inbox/application/composer'

import {
  ComposerToolbar,
  ComposerAttachments,
  ComposerActions,
  ComposerEmoji,
  ComposerFiles
} from './composer'

import { ComposerEditor } from './composer/ComposerEditor'

type SendMessageParams = {
  body: string
  attachments: unknown[] // replace later with real type
}

type Props = {
  onSend: (params: SendMessageParams) => void
  sending: boolean
  policy: unknown
  context: unknown
}

export function ConversationComposer({
  onSend,
  sending,
  policy,
  context
}: Props) {

  const composer = useComposer(policy, context)

  function handleSend() {

    if (!composer.canSend()) return

    const editor = composer.state.editor

    onSend({
      body: editor?.getHTML() || '',
      attachments: composer.state.attachments
    })

    composer.actions.clear()
  }

  return (
    <div className="border-t bg-[#f8f8f8] p-3">

      <ComposerFiles
        onFiles={(files) => {
          composer.actions.attach(files)
        }}
      >

        <div className="
          bg-white border border-gray-200
          rounded-xl shadow-sm
          overflow-hidden
          transition-all flex flex-col
        ">

          {/* TOOLBAR */}
          <div className="
            border-b px-3 py-2
            bg-[#fafafa] shrink-0
          ">
            <ComposerToolbar
              editor={composer.state.editor}
            />
          </div>

          {/* EDITOR */}
          <div className="
            px-2 py-1 flex flex-col
          ">
            <ComposerEditor
              onReady={composer.actions.setEditor}
              expanded={composer.state.expanded}
            />
          </div>

          {/* ATTACHMENTS */}
          <ComposerAttachments
            files={composer.state.attachments}
            onRemove={(id) => {
              composer.actions.removeAttachment(id)
            }}
          />

          {/* EMOJI */}
          {composer.state.emojiOpen && (
            <div className="px-3 pb-2 shrink-0">
              <ComposerEmoji
                onSelect={composer.actions.insertEmoji}
                onClose={composer.actions.toggleEmoji}
              />
            </div>
          )}

          {/* ACTIONS */}
          <div className="
            flex items-center justify-between
            border-t px-3 py-2
            bg-[#fafafa] shrink-0
          ">
            <ComposerActions
              sending={sending}
              disabled={!composer.canSend()}
              onSend={handleSend}
              onFiles={(f) => {
                composer.actions.attach(f)
              }}
              onEmoji={composer.actions.toggleEmoji}
              onExpand={composer.actions.toggleExpand}
            />
          </div>

        </div>

      </ComposerFiles>

    </div>
  )
}