// features/inbox/application/composer/hooks/useComposer.ts

import { useState,useEffect }
from 'react'

import {
 createComposerState
}
from '../state/composer.state'

import {
 insertEmoji
}
from '../actions/composer.editor'

import {
 toggleEmoji,
 toggleExpand
}
from '../actions/composer.ui'

import {
 ComposerState
}
from '../composer.types'

import {
 Attachment
}
from '@/features/inbox/domain/attachment/attachment.types'

import {
 useUploadAttachment
}
from '@/features/inbox/application/attachment/uploadAttachment.usecase'

export function useComposer(

 policy:any,

 context:any

){

 const [state,setState]=
 useState<ComposerState>(
  createComposerState(
   policy,
   context
  )
 )

 const uploader =
  useUploadAttachment(policy)

 /* FORCE REACTIVITY */

 useEffect(()=>{

  if(!state.editor) return

  const update=()=>{

   setState(prev=>({
    ...prev
   }))

  }

  state.editor.onUpdate(update)

 },[state.editor])

 function setEditor(editor:any){

  setState(prev=>({

   ...prev,

   editor

  }))

 }

 /* FIXED — upload first then attach */

 async function attach(

  files:File[]

 ){

  const uploaded =
   await uploader.uploadFiles(

    files,

    state.attachments.length

   )

  if(!uploaded.length)
   return

  setState(prev=>({

   ...prev,

   attachments:[

    ...prev.attachments,

    ...uploaded

   ]

  }))

 }

 function removeAttachment(

  id:string

 ){

  setState(prev=>({

   ...prev,

   attachments:

    prev.attachments.filter(

     a=>a.id!==id

    )

  }))

 }

 function clear(){

  state.editor?.clear()

  setState(prev=>({

   ...prev,

   attachments:[],
   emojiOpen:false

  }))

 }

 function handleInsertEmoji(

  emoji:string

 ){

  insertEmoji(

   state.editor,

   emoji

  )

  handleToggleEmoji()

 }

 function handleToggleEmoji(){

  setState(prev=>

   toggleEmoji(prev)

  )

 }

 function handleToggleExpand(){

  setState(prev=>

   toggleExpand(prev)

  )

 }

 function canSend(){

  if(!state.editor)
   return false

  if(uploader.uploading)
   return false

  const text=
   state.editor.getText()

  const html=
   state.editor.getHTML()

  if(text.trim().length>0)
   return true

  if(
   html &&
   html !== '<p></p>'
  )
   return true

  if(

   state.attachments.some(

    a=>a.storageKey

   )

  )
   return true

  return false

 }

 return{

  state,

  uploading:
   uploader.uploading,

  actions:{

   setEditor,

   attach,

   removeAttachment,

   insertEmoji:
    handleInsertEmoji,

   toggleEmoji:
    handleToggleEmoji,

   toggleExpand:
    handleToggleExpand,

   clear

  },

  canSend

 }

}