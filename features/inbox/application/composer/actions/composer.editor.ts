// feature/inbox/application/composer/actions/composer.editor.ts
import { EditorAdapter }
from '@/features/inbox/infrastructure/editor/editor.interface'

/* INSERT */

export function insertEmoji(

 editor:EditorAdapter | null,
 emoji:string

){

 if(!editor) return

 editor.insertEmoji(emoji)

}

/* FORMATTING */

export function toggleBold(

 editor:EditorAdapter | null

){

 if(!editor) return

 editor.bold()

}

export function toggleItalic(

 editor:EditorAdapter | null

){

 if(!editor) return

 editor.italic()

}

export function toggleUnderline(

 editor:EditorAdapter | null

){

 if(!editor) return

 editor.underline()

}

export function toggleCode(

 editor:EditorAdapter | null

){

 if(!editor) return

 editor.code()

}

/* LISTS */

export function toggleBulletList(

 editor:EditorAdapter | null

){

 if(!editor) return

 editor.bulletList()

}

export function toggleOrderedList(

 editor:EditorAdapter | null

){

 if(!editor) return

 editor.orderedList()

}

/* LINKS */

export function setLink(

 editor:EditorAdapter | null,
 url:string

){

 if(!editor) return

 editor.setLink(url)

}

export function removeLink(

 editor:EditorAdapter | null

){

 if(!editor) return

 editor.removeLink()

}

export function getLink(

 editor:EditorAdapter | null

){

 if(!editor) return null

 return editor.getLink()

}

export function isLinkActive(

 editor:EditorAdapter | null

){

 if(!editor) return false

 return editor.isLinkActive()

}

/* CONTENT */

export function clearEditor(

 editor:EditorAdapter | null

){

 if(!editor) return

 editor.clear()

}

export function focusEditor(

 editor:EditorAdapter | null

){

 if(!editor) return

 editor.focus()

}

export function getEditorText(

 editor:EditorAdapter | null

){

 if(!editor) return ''

 return editor.getText()

}

export function getEditorHTML(

 editor:EditorAdapter | null

){

 if(!editor) return ''

 return editor.getHTML()

}

export function isEditorEmpty(

 editor:EditorAdapter | null

){

 if(!editor) return true

 return editor.isEmpty()

}

/* ACTIVE STATES */

export function isBold(

 editor:EditorAdapter | null

){

 if(!editor) return false

 return editor.isBold()

}

export function isItalic(

 editor:EditorAdapter | null

){

 if(!editor) return false

 return editor.isItalic()

}

export function isUnderline(

 editor:EditorAdapter | null

){

 if(!editor) return false

 return editor.isUnderline()

}

export function isCode(

 editor:EditorAdapter | null

){

 if(!editor) return false

 return editor.isCode()

}

export function isBulletList(

 editor:EditorAdapter | null

){

 if(!editor) return false

 return editor.isBulletList()

}

export function isOrderedList(

 editor:EditorAdapter | null

){

 if(!editor) return false

 return editor.isOrderedList()

}