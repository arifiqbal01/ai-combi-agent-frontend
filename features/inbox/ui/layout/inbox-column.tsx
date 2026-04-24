'use client'

import type { ReactNode } from 'react'
import clsx from 'clsx'

type Props={

 children:ReactNode

 padding?:string

 className?:string

 scroll?:boolean

}

export function InboxColumn({

 children,

 padding='p-4',

 className,

 scroll=false

}:Props){

 return(

  <div
   className={clsx(

    'relative',

    'flex',

    'h-full',

    'min-h-0',   /* ADD */

    'min-w-0',

    'flex-col',

    'overflow-hidden',

    'rounded-2xl',

    'border border-border-subtle',

    'bg-bg-surface',

    'shadow-sm',

    className

   )}
  >

   <div
    className={clsx(

     'flex-1',

     'min-h-0',   /* ADD */

     scroll
      ? 'overflow-y-auto'
      : 'overflow-hidden',

     'scroll-smooth',

     padding

    )}
   >

    {children}

   </div>

  </div>

 )

}