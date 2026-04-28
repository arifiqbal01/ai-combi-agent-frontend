import { Editor } from '@tiptap/react'

import {
  EditorAdapter
} from '../editor.interface'

export class TipTapAdapter implements EditorAdapter {

  private updateCallback?: () => void

  private selectionHandler = () => {
    this.updateCallback?.()
  }

  private transactionHandler = () => {
    this.updateCallback?.()
  }

  constructor(private editor: Editor) {

    editor.on('selectionUpdate', this.selectionHandler)
    editor.on('transaction', this.transactionHandler)
  }

  /* =========================
     CONTENT
  ========================= */

  getHTML(): string {
    return this.editor.getHTML()
  }

  getText(): string {
    return this.editor.getText()
  }

  /** replace full content (safe + cursor fix) */
  setHTML(html: string): void {
    this.editor
      .chain()
      .setContent(html || '')
      .focus('end')
      .run()
  }

  /** 🔥 preferred API */
  replaceContent(html: string): void {
    this.setHTML(html)
  }

  /** 🔥 append at end */
  appendContent(html: string): void {
    this.editor
      .chain()
      .focus('end')
      .insertContent(html || '')
      .run()
  }

  clear(): void {
    this.editor.commands.clearContent()
  }

  /** 🔥 improved focus */
  focus(position: 'start' | 'end' = 'end'): void {
    this.editor.commands.focus(position)
  }

  /* =========================
     INSERTION
  ========================= */

  insertText(text: string): void {
    this.editor
      .chain()
      .focus()
      .insertContent(text)
      .run()
  }

  insertEmoji(emoji: string): void {
    this.insertText(emoji)
  }

  /* =========================
     FORMATTING
  ========================= */

  bold(): void {
    this.editor.chain().focus().toggleBold().run()
  }

  italic(): void {
    this.editor.chain().focus().toggleItalic().run()
  }

  underline(): void {
    this.editor.chain().focus().toggleUnderline().run()
  }

  code(): void {
    this.editor.chain().focus().toggleCode().run()
  }

  /* =========================
     LISTS
  ========================= */

  bulletList(): void {
    this.editor.chain().focus().toggleBulletList().run()
  }

  orderedList(): void {
    this.editor.chain().focus().toggleOrderedList().run()
  }

  /* =========================
     LINKS
  ========================= */

  setLink(url: string): void {
    this.editor
      .chain()
      .focus()
      .extendMarkRange('link')
      .setLink({ href: url })
      .run()
  }

  removeLink(): void {
    this.editor.chain().focus().unsetLink().run()
  }

  isLinkActive(): boolean {
    return this.editor.isActive('link')
  }

  getLink(): string | null {
    const attrs = this.editor.getAttributes('link')
    return attrs?.href || null
  }

  /* =========================
     ACTIVE STATES
  ========================= */

  isBold(): boolean {
    return this.editor.isActive('bold')
  }

  isItalic(): boolean {
    return this.editor.isActive('italic')
  }

  isUnderline(): boolean {
    return this.editor.isActive('underline')
  }

  isCode(): boolean {
    return this.editor.isActive('code')
  }

  isBulletList(): boolean {
    return this.editor.isActive('bulletList')
  }

  isOrderedList(): boolean {
    return this.editor.isActive('orderedList')
  }

  /* =========================
     STATE
  ========================= */

  isEmpty(): boolean {
    return this.editor.isEmpty
  }

  /* =========================
     EVENTS
  ========================= */

  onUpdate(callback: () => void): void {
    this.updateCallback = callback
  }

  /* =========================
     CLEANUP
  ========================= */

  destroy(): void {
    if (this.editor && !this.editor.isDestroyed) {

      this.editor.off('selectionUpdate', this.selectionHandler)
      this.editor.off('transaction', this.transactionHandler)

      this.editor.destroy()
    }
  }
}