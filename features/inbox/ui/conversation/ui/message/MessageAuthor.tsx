'use client'

import {
 MessageAuthor as Author,
 MessageVariant
} from '@/features/inbox/domain/message'

import { Badge } from '@/shared/ui'

type Props={
 author:Author
 variant:MessageVariant
}

export function MessageAuthor({
 author,
 variant
}:Props){

 if(variant==='system')
  return null

 return(

  <div className="
   flex
   items-center
   gap-2

   text-[11px]

   text-text-secondary

   font-medium

   mb-0.5
  ">

   <span>
    {author.name}
   </span>

   {variant==='ai' && (

    <Badge
     variant="default"
     className="text-[10px] px-1.5 py-0"
    >
     AI
    </Badge>

   )}

  </div>

 )

}