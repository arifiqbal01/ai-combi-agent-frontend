'use client'

import clsx from 'clsx'

type Props={
 time?:string
 status?:string
 direction:'in'|'out'
}

export function MessageFooter({
 time,
 status,
 direction
}:Props){

 if(!time && !status)
  return null

 return(

  <div

   className={clsx(

    'flex',

    'items-center',

    'gap-2',

    'mt-1',

    'text-[11px]',

    'text-gray-500',

    direction==='out'
     ? 'justify-end'
     : 'justify-start'

   )}

  >

   {time}

   {direction==='out' && status && (

    <span className="text-gray-400">

     {status}

    </span>

   )}

  </div>

 )
}