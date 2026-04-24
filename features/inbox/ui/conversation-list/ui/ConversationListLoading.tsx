'use client'

export function ConversationListLoading(){

 return(

  <div className="flex flex-col">

   {Array.from({length:8}).map((_,i)=>(

    <div

     key={i}

     className="
      grid
      grid-cols-[auto_1fr]
      gap-3
      px-4
      py-3
      border-b
      border-border-subtle
     "

    >

     <div className="
      h-10 w-10
      rounded-full
      bg-bg-muted
      animate-pulse
     "/>

     <div className="space-y-2">

      <div className="flex">

       <div className="
        h-3
        w-24
        rounded
        bg-bg-muted
        animate-pulse
       "/>

       <div className="
        ml-auto
        h-3
        w-10
        rounded
        bg-bg-muted
        animate-pulse
       "/>

      </div>

      <div className="
       h-3
       w-full
       rounded
       bg-bg-muted
       animate-pulse
      "/>

     </div>

    </div>

   ))}

  </div>

 )

}