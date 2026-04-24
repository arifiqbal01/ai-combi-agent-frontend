'use client'

type Props={

 time?:string

}

export function MessageMeta({

 time

}:Props){

 if(!time)
  return null

 return(

  <div className="
   text-[10px]
   opacity-60
   mt-1
   text-right
  ">

   {time}

  </div>

 )

}