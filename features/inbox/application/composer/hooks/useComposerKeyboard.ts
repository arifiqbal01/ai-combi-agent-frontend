import { useCallback } from 'react'

export function useComposerKeyboard(

 composer:any,
 onSend?:()=>void

){

 return useCallback(

  (event:KeyboardEvent)=>{

   if(event.repeat)
    return

   const mod=

    event.ctrlKey ||

    event.metaKey

   if(

    mod &&
    event.key==='Enter'

   ){

    event.preventDefault()

    if(
     composer.canSend() &&
     onSend
    ){

     onSend()

    }

   }

   if(event.key==='Escape'){

    composer.actions.toggleEmoji()

   }

   if(

    mod &&
    event.shiftKey &&
    event.key==='E'

   ){

    event.preventDefault()

    composer.actions.toggleExpand()

   }

  },

  [composer,onSend]

 )
}