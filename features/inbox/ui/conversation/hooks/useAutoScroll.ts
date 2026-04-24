'use client'

import {
 useEffect,
 useRef,
 useState
} from 'react'

export function useAutoScroll(
 dependency:any
){

 const ref=
 useRef<HTMLDivElement>(null)

 const [atBottom,setAtBottom]=
 useState(true)

 function checkScroll(){

  const el=ref.current

  if(!el) return

  const bottom=

   el.scrollHeight -
   el.scrollTop -
   el.clientHeight < 80

  setAtBottom(bottom)

 }

 function scrollToBottom(){

  const el=ref.current

  if(!el) return

  el.scrollTop=
   el.scrollHeight

 }

 useEffect(()=>{

  const el=ref.current

  if(!el) return

  el.addEventListener(
   'scroll',
   checkScroll
  )

  return ()=>{

   el.removeEventListener(
    'scroll',
    checkScroll
   )

  }

 },[])

 useEffect(()=>{

  const el=ref.current

  if(!el) return

  if(!atBottom)
   return

  requestAnimationFrame(()=>{

   el.scrollTop=
    el.scrollHeight

  })

 },[dependency])

 return{

  ref,
  atBottom,
  scrollToBottom

 }

}