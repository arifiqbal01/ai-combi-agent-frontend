'use client'

import {
 useState,
 useCallback
} from 'react'

export function useMessageSelection(){

 const [

  selectedId,
  setSelected

 ]=useState<string | null>(null)

 const select=

 useCallback((id:string)=>{

  setSelected(id)

 },[])

 const clear=

 useCallback(()=>{

  setSelected(null)

 },[])

 return{

  selectedMessageId:selectedId,

  selectMessage:select,

  clearSelection:clear

 }

}