export interface EditorAdapter {

  /* =========================
     CONTENT
  ========================= */

  getHTML(): string
  getText(): string

  /** Replace entire editor content */
  setHTML(html: string): void

  /** 🔥 NEW — explicit semantic API (recommended) */
  replaceContent(html: string): void

  /** 🔥 NEW — append at cursor/end */
  appendContent(html: string): void

  clear(): void

  /** 🔥 IMPROVED — optional position */
  focus(position?: 'start' | 'end'): void


  /* =========================
     INSERTION
  ========================= */

  insertText(text: string): void
  insertEmoji(emoji: string): void


  /* =========================
     FORMATTING
  ========================= */

  bold(): void
  italic(): void
  underline(): void
  code(): void


  /* =========================
     LISTS
  ========================= */

  bulletList(): void
  orderedList(): void


  /* =========================
     LINKS
  ========================= */

  setLink(url: string): void
  removeLink(): void

  isLinkActive(): boolean
  getLink(): string | null


  /* =========================
     ACTIVE STATES
  ========================= */

  isBold(): boolean
  isItalic(): boolean
  isUnderline(): boolean
  isCode(): boolean

  isBulletList(): boolean
  isOrderedList(): boolean


  /* =========================
     STATE
  ========================= */

  isEmpty(): boolean


  /* =========================
     EVENTS
  ========================= */

  onUpdate(callback: () => void): void


  /* =========================
     LIFECYCLE
  ========================= */

  destroy(): void
}