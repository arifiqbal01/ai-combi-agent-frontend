export function formatConversationTime(
 iso:string
){

 const date =
  new Date(iso)

 const now =
  new Date()

 const yesterday =
  new Date()

 yesterday.setDate(
  now.getDate()-1
 )

 if(
  date.toDateString() ===
  now.toDateString()
 ){

  return date.toLocaleTimeString(
   [],
   {
    hour:'2-digit',
    minute:'2-digit'
   }
  )

 }

 if(
  date.toDateString() ===
  yesterday.toDateString()
 ){

  return 'Yesterday'

 }

 return date.toLocaleDateString(
  [],
  {
   month:'short',
   day:'numeric'
  }
 )

}