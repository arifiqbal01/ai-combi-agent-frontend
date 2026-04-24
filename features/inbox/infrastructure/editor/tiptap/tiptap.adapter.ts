import { Editor }
from '@tiptap/react'

import {
 EditorAdapter
} from '../editor.interface'

export class TipTapAdapter
implements EditorAdapter{

 private updateCallback?:()=>void

 private selectionHandler=()=>{
  this.updateCallback?.()
 }

 private transactionHandler=()=>{
  this.updateCallback?.()
 }

 constructor(
  private editor:Editor
 ){

  editor.on(
   'selectionUpdate',
   this.selectionHandler
  )

  editor.on(
   'transaction',
   this.transactionHandler
  )

 }

 /* CONTENT */

 getHTML(){
  return this.editor.getHTML()
 }

 getText(){
  return this.editor.getText()
 }

 setHTML(html:string){

  this.editor.commands.setContent(html)

 }

 clear(){

  this.editor.commands.clearContent()

 }

 focus(){

  this.editor.commands.focus()

 }

 /* INSERT */

 insertText(text:string){

  this.editor
   .chain()
   .focus()
   .insertContent(text)
   .run()

 }

 insertEmoji(emoji:string){

  this.insertText(emoji)

 }

 /* FORMATTING */

 bold(){

  this.editor.chain()
   .focus()
   .toggleBold()
   .run()

 }

 italic(){

  this.editor.chain()
   .focus()
   .toggleItalic()
   .run()

 }

 underline(){

  this.editor.chain()
   .focus()
   .toggleUnderline()
   .run()

 }

 code(){

  this.editor.chain()
   .focus()
   .toggleCode()
   .run()

 }

 /* LIST */

 bulletList(){

  this.editor.chain()
   .focus()
   .toggleBulletList()
   .run()

 }

 orderedList(){

  this.editor.chain()
   .focus()
   .toggleOrderedList()
   .run()

 }

 /* LINKS */

 setLink(url:string){

  this.editor.chain()
   .focus()
   .extendMarkRange('link')
   .setLink({href:url})
   .run()

 }

 removeLink(){

  this.editor.chain()
   .focus()
   .unsetLink()
   .run()

 }

 isLinkActive(){

  return this.editor.isActive('link')

 }

 getLink(){

  const attrs=
   this.editor.getAttributes('link')

  return attrs?.href || null

 }

 /* ACTIVE */

 isBold(){
  return this.editor.isActive('bold')
 }

 isItalic(){
  return this.editor.isActive('italic')
 }

 isUnderline(){
  return this.editor.isActive('underline')
 }

 isCode(){
  return this.editor.isActive('code')
 }

 isBulletList(){
  return this.editor.isActive('bulletList')
 }

 isOrderedList(){
  return this.editor.isActive('orderedList')
 }

 /* STATE */

 isEmpty(){

  return !this.editor
   .getText()
   .trim()

 }

 /* EVENTS */

 onUpdate(callback:()=>void){

  this.updateCallback=callback

 }

 destroy(){

  if(
   this.editor &&
   !this.editor.isDestroyed
  ){

   this.editor.off(
    'selectionUpdate',
    this.selectionHandler
   )

   this.editor.off(
    'transaction',
    this.transactionHandler
   )

   this.editor.destroy()

  }

 }
}