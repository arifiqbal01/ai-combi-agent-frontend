// infra/api/config.ts
export const API_CONFIG={

 BASE_URL:

  process.env
   .NEXT_PUBLIC_API_BASE_URL

  ?? "http://localhost:8000",

 PREFIX:"/api/v1"

}

export function buildApiUrl(
 path:string
){

 return(

  API_CONFIG.BASE_URL+

  API_CONFIG.PREFIX+

  path

 )

}

export function buildStreamUrl(
 path:string,
 token?:string
){

 let url=

  API_CONFIG.BASE_URL+

  API_CONFIG.PREFIX+

  path

 if(token){

  url+=`?token=${token}`

 }

 return url

}