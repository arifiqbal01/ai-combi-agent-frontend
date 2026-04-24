import { Message }
from '../message/message.types'

import { TimelineItem }
from './timeline.types'

import {

 canGroupMessages,
 isSameDay

} from './timeline.grouping.rules'

export function buildTimeline(

 messages:Message[],

 lastReadMessageId?:string

):TimelineItem[]{

 const items:TimelineItem[]=[]

 let lastMessage:Message | null=null

 let lastDay:string | null=null

 let unreadInserted=false

 for(const msg of messages){

  const date=
   new Date(msg.meta.createdAt)

  const dayKey=
   date.toDateString()

  if(dayKey!==lastDay){

   items.push({

    type:'time',

    id:`day-${dayKey}`,

    label:formatDay(date)

   })

   lastDay=dayKey

   lastMessage=null

  }

  if(

   lastReadMessageId &&

   !unreadInserted &&

   msg.id===lastReadMessageId

  ){

   items.push({

    type:'unread',

    id:'unread',

    label:'Unread messages'

   })

   unreadInserted=true

  }

  const grouped=
   canGroupMessages(
    msg,
    lastMessage
   )

  items.push({

   type:'message',

   id:msg.id,

   message:msg,

   grouped

  })

  lastMessage=msg

 }

 return items

}

function formatDay(
 date:Date
){

 const today=new Date()

 const yesterday=new Date()

 yesterday.setDate(
  today.getDate()-1
 )

 if(
  date.toDateString()===
  today.toDateString()
 )
  return 'Today'

 if(
  date.toDateString()===
  yesterday.toDateString()
 )
  return 'Yesterday'

 return date.toLocaleDateString()

}