'use client'

export function ComposerFiles({

 children,
 onFiles

}){

 function drop(e:any){

  e.preventDefault()

  const files=
   Array.from(
    e.dataTransfer.files
   )

  onFiles(files)

 }

 return(

  <div

   onDragOver={(e)=>
    e.preventDefault()
   }

   onDrop={drop}

  >

   {children}

  </div>

 )
}