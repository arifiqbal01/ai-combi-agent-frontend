'use client'

import {
 TimelineGroup
} from '../ui/TimelineGroup'

import {
 useAutoScroll
} from '../hooks/useAutoScroll'

import {
 useMemo
} from 'react'

type Props={

 timeline:any[]

 onScrollStateChange?:
 (scrolled:boolean)=>void

}

export function ConversationTimeline({

 timeline,
 onScrollStateChange

}:Props){

 const messageCount=
 useMemo(()=>{

  return timeline.reduce(

   (acc,g)=>acc+g.messages.length,

   0

  )

 },[timeline])

 const {

  ref,
  atBottom,
  scrollToBottom

 }=useAutoScroll(messageCount)

 function handleScroll(){

  const el=ref.current

  if(!el) return

  const scrolled=

   el.scrollTop <
   el.scrollHeight -
   el.clientHeight - 20

  onScrollStateChange?.(
   scrolled
  )

 }

 return(

  <div className="
   relative
   h-full
   min-h-0
  ">

   <div

    ref={ref}

    onScroll={handleScroll}

    className="
     h-full
     overflow-y-auto
     px-4
     py-3
     space-y-4
    "

   >

    {timeline.map(group=>(

     <TimelineGroup

      key={group.id}

      group={group}

     />

    ))}

    <div className="h-2"/>

   </div>

   {!atBottom && (

    <button

     onClick={scrollToBottom}

     className="
      absolute
      bottom-5
      right-6
      h-9
      px-3
      rounded-lg
      bg-blue-500
      text-white
      text-xs
      shadow-lg
      flex
      items-center
      gap-2
      hover:bg-blue-600
     "

    >

     ↓ Latest

    </button>

   )}

  </div>

 )
}