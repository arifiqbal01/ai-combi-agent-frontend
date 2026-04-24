'use client'

import { useEffect } from 'react'

import {
 Dialog,
 DialogContent,
 DialogHeader,
 DialogTitle,
 DialogClose,
} from '@/ui'

import { SimpleKnowledgeForm } from '../SimpleKnowledgeForm'

type Props = {
 open: boolean
 onOpenChange: (v: boolean) => void
 onSubmit: (data: { title?: string; content: string }) => Promise<void>
 isLoading?: boolean
}

export function KnowledgePresetDialogView({
 open,
 onOpenChange,
 onSubmit,
 isLoading,
}: Props) {

 return (
  <Dialog
   open={open}
   onOpenChange={onOpenChange}
  >

   {/* ❌ REMOVED TRIGGER — THIS WAS CAUSING THE BUTTON */}

   <DialogContent
     className="
       relative
       w-full max-w-lg
       rounded-lg
       border
       bg-white
       p-5
       shadow-lg
     "
   >

     {/* CLOSE */}
     <DialogClose asChild>
       <button className="absolute right-4 top-4 text-sm opacity-70 hover:opacity-100">
         ✕
       </button>
     </DialogClose>

     {/* HEADER */}
     <DialogHeader className="mb-3">
       <DialogTitle>Add Knowledge</DialogTitle>
     </DialogHeader>

     {/* FORM */}
     <SimpleKnowledgeForm
       onSubmit={onSubmit}
       loading={isLoading}
     />

   </DialogContent>
  </Dialog>
 )
}