'use client'

type Props={
 state?:string
}

export function MessageStatus({
 state
}:Props){

 if(!state)
  return null

 if(state==='sending')
  return(
   <div className="text-[11px] text-gray-500 mt-1">
    Sending…
   </div>
  )

 if(state==='failed')
  return(
   <div className="text-[11px] text-red-600 mt-1">
    Failed to send
   </div>
  )

 if(state==='delivered')
  return(
   <div className="text-[11px] text-gray-500 mt-1">
    Delivered
   </div>
  )

 if(state==='read')
  return(
   <div className="text-[11px] text-blue-600 mt-1">
    Read
   </div>
  )

 return null

}