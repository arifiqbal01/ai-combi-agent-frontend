'use client'

import {
 MessageAuthor
} from '@/features/inbox/domain/message/message.author'

import {
 MessageVariant
} from './MessageVariant'

import { Badge } from '@/ui'

type Props={
 author:MessageAuthor
 variant:MessageVariant
 hidden?:boolean
}

export function MessageHeader({
 author,
 variant,
 hidden
}:Props){

 if(hidden) return null

 if(variant==='system')
  return null

 return(

  <div className="

   flex
   items-center
   gap-2

   text-[12px]

   text-gray-600

   font-medium

   mb-1

  ">

   {author.name}

   {variant==='ai' && (

    <Badge
     variant="default"
     className="text-[10px]"
    >

     AI

    </Badge>

   )}

  </div>

 )
}