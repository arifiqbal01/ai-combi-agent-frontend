import {

 TimelineItem,
 TimelineGroup

} from './timeline.types'

export function mapTimeline(

 items:TimelineItem[]

):TimelineGroup[]{

 const groups:TimelineGroup[]=[]

 let currentGroup:TimelineGroup | null=null

 let groupIndex=0

 for(const item of items){

  if(item.type==='time'){

   currentGroup={

    id:`group-${groupIndex++}`,

    label:item.label,

    messages:[]

   }

   groups.push(currentGroup)

   continue

  }

  if(item.type==='unread'){

   groups.push({

    id:'unread',

    label:item.label,

    messages:[]

   })

   continue

  }

  if(

   item.type==='message' &&

   currentGroup

  ){

   currentGroup.messages.push({

    message:item.message,

    grouped:item.grouped

   })

  }

 }

 return groups

}