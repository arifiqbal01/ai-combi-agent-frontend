/* domain/message/message.utils.ts */

import { Message } from './message.types'

/* =========================
 Time formatting
========================= */

export function formatDisplayTime(
 iso:string
){

 const date=
  new Date(iso)

 return date.toLocaleTimeString(
  [],
  {
   hour:'2-digit',
   minute:'2-digit'
  }
 )

}