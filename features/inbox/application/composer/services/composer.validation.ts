export function canComposerSend(

 text:string,

 attachments:number

){

 if(text.trim().length>0)
  return true

 if(attachments>0)
  return true

 return false

}