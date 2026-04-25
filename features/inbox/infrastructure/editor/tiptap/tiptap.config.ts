// features/inbox/infrastructure/editor/tiptap/tiptap.config.ts

import { Editor } from '@tiptap/react'

import {
  createTipTapExtensions
} from './tiptap.extensions'

type Params = {
  content?: string
  onUpdate?: (html: string) => void
  onReady?: (editor: Editor) => void
}

export function createTipTapEditor({
  content = '',
  onUpdate,
  onReady
}: Params) {

  const editor = new Editor({
    extensions: createTipTapExtensions(),

    content,

    onCreate({ editor }) {
      onReady?.(editor)
    },

    onUpdate({ editor }) {
      onUpdate?.(editor.getHTML())
    },

    editorProps: {
      attributes: {
        class: `
          prose prose-sm
          max-w-none
          text-[14px]
          leading-relaxed
          px-3
          py-2
          focus:outline-none
          overflow-y-auto
        `,
        style: 'scroll-padding-bottom:40px'
      }
    }
  })

  return editor
}