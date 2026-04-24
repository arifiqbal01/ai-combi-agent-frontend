import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'

let extensionBuildCount=0

export function createTipTapExtensions(){

 extensionBuildCount++

 console.log(
  'TipTap extensions built:',
  extensionBuildCount
 )

 return [

  StarterKit.configure({

   codeBlock:false,

   bulletList:{
    keepMarks:true
   },

   orderedList:{
    keepMarks:true
   },

   /* CRITICAL FIX */
   link:false,
   underline:false

  }),

  /* add manually once */
  Underline,

  Link.configure({

   openOnClick:false,

   autolink:true,

   HTMLAttributes:{
    class:'text-blue-600 underline cursor-pointer'
   }

  }),

  Placeholder.configure({

   placeholder:'Write a message…'

  })

 ]
}