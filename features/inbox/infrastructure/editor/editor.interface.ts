export interface EditorAdapter {

 /* CONTENT */

 getHTML():string
 getText():string

 setHTML(html:string):void

 clear():void

 focus():void


 /* INSERTION */

 insertText(text:string):void

 insertEmoji(emoji:string):void


 /* FORMATTING */

 bold():void
 italic():void
 underline():void
 code():void


 /* LISTS */

 bulletList():void
 orderedList():void


 /* LINKS */

 setLink(url:string):void

 removeLink():void

 isLinkActive():boolean

 getLink():string | null


 /* ACTIVE STATES */

 isBold():boolean

 isItalic():boolean

 isUnderline():boolean

 isCode():boolean

 isBulletList():boolean

 isOrderedList():boolean


 /* STATE */

 isEmpty():boolean

 destroy():void


 /* EVENTS (CRITICAL FIX) */

 onUpdate(callback:()=>void):void

}