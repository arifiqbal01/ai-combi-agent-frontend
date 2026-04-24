// app/(app)/inbox/inbox-context.tsx
'use client'

import {

 createContext,
 useContext,
 useState,
 useCallback,
 useMemo,
 type ReactNode

} from 'react'

type InboxContextValue={

 selectedConversationId:string | null

 selectConversation:(id:string)=>void

 clearSelection:()=>void

 hasSelection:boolean

}

const InboxContext=

createContext<InboxContextValue | null>(null)

InboxContext.displayName='InboxContext'

export function InboxProvider({

 children

}:{

 children:ReactNode

}){

 const [

  selectedConversationId,

  setSelectedConversationId

 ]=useState<string | null>(null)

/* select */

 const selectConversation=

 useCallback((id:string)=>{

  setSelectedConversationId(prev=>{

   if(prev===id)
    return prev

   return id

  })

 },[])

/* clear */

 const clearSelection=

 useCallback(()=>{

  setSelectedConversationId(null)

 },[])

/* memo */

 const value=

 useMemo(()=>({

  selectedConversationId,

  selectConversation,

  clearSelection,

  hasSelection:
   selectedConversationId!==null

 }),[

  selectedConversationId,

  selectConversation,

  clearSelection

 ])

 return(

  <InboxContext.Provider value={value}>

   {children}

  </InboxContext.Provider>

 )

}

export function useInboxContext(){

 const ctx=

  useContext(InboxContext)

 if(!ctx){

  throw new Error(

   'useInboxContext must be used inside InboxProvider'

  )

 }

 return ctx

}