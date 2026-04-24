'use client'

import {
 useState
} from 'react'

import clsx from 'clsx'

type Props={

 header:React.ReactNode

 timeline:React.ReactNode

 aiSection?:React.ReactNode

 composer:React.ReactNode

}

export function ConversationLayout({

 header,
 timeline,
 aiSection,
 composer

}:Props){

 const [scrolled,setScrolled]=
 useState(false)

 return(

  <div className="
   flex
   flex-col
   h-full
   min-h-0
  ">

   {/* HEADER */}

   <div className="
    flex-shrink-0
    border-b
    border-border-subtle
   ">

    {header}

   </div>

   {/* TIMELINE */}

   <div className="
    flex-1
    min-h-0
    overflow-hidden
    transition-all
    duration-200
   ">

    {timeline}

   </div>

    {/* AI SECTION */}
    {aiSection && (
      <div className="flex-shrink-0 py-1">
          {aiSection}
        </div>
    )}

   {/* COMPOSER */}

   <div className={clsx(

    "border-t",
    "border-border-subtle",

    "bg-bg-surface",

    "transition-all",
    "duration-200",

    "flex-shrink-0",

    scrolled &&
    "shadow-[0_-6px_16px_rgba(0,0,0,0.08)]"

   )}>

    {composer}

   </div>

  </div>

 )
}